// src/services/iotaService.ts
import { IotaClient, IotaClientBuilder } from '@iota/iota-sdk';
import { ethers } from 'ethers';

// IOTA Network Configuration
const IOTA_CONFIG = {
  testnet: 'https://api.testnet.iota.cafe:443',
  mainnet: 'https://api.mainnet.iota.cafe:443',
  evmTestnet: 'https://json-rpc.evm.testnet.iotaledger.net',
  evmMainnet: 'https://json-rpc.evm.iotaledger.net'
};

export interface BatteryPassportData {
  batteryId: string;
  manufacturer: string;
  model: string;
  plant: string;
  date: string;
  chemistry: string;
  carbonFootprint: number;
  supplyChain: SupplyChainEvent[];
  verificationStatus: 'verified' | 'pending' | 'failed';
}

export interface SupplyChainEvent {
  participant: string;
  role: string;
  location: string;
  timestamp: string;
  data: Record<string, any>;
  signature?: string;
}

export class IotaService {
  private client: IotaClient;
  private evmProvider: ethers.JsonRpcProvider;
  
  constructor(network: 'testnet' | 'mainnet' = 'testnet') {
    this.initializeClients(network);
  }

  private async initializeClients(network: 'testnet' | 'mainnet') {
    try {
      // Initialize IOTA client for L1 operations
      this.client = await IotaClientBuilder.default()
        .build(IOTA_CONFIG[network]);

      // Initialize EVM provider for smart contract interactions
      const evmEndpoint = network === 'testnet' 
        ? IOTA_CONFIG.evmTestnet 
        : IOTA_CONFIG.evmMainnet;
      
      this.evmProvider = new ethers.JsonRpcProvider(evmEndpoint);
      
      console.log('IOTA service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize IOTA service:', error);
      throw error;
    }
  }

  /**
   * Generate a unique DID for a battery
   */
  generateBatteryDID(manufacturerId: string, serialNumber: string): string {
    const timestamp = Date.now();
    return `did:iota:${manufacturerId.toLowerCase()}:${serialNumber}:${timestamp}`;
  }

  /**
   * Create battery passport on IOTA network
   */
  async createBatteryPassport(passportData: Omit<BatteryPassportData, 'verificationStatus'>): Promise<string> {
    try {
      // Create EPCIS event for battery creation
      const epcisEvent = this.createEPCISEvent({
        action: 'CREATE',
        epc: passportData.batteryId,
        bizStep: 'manufacturing',
        disposition: 'in_progress',
        readPoint: passportData.plant,
        bizLocation: passportData.plant,
        eventTime: passportData.date,
        eventData: {
          manufacturer: passportData.manufacturer,
          model: passportData.model,
          chemistry: passportData.chemistry,
          carbonFootprint: passportData.carbonFootprint
        }
      });

      // Store on IOTA (this would be the actual implementation)
      const transactionId = await this.storeOnIOTA(epcisEvent);
      
      console.log('Battery passport created:', transactionId);
      return transactionId;
    } catch (error) {
      console.error('Error creating battery passport:', error);
      throw error;
    }
  }

  /**
   * Add supply chain event to existing battery passport
   */
  async addSupplyChainEvent(batteryId: string, event: SupplyChainEvent): Promise<string> {
    try {
      const epcisEvent = this.createEPCISEvent({
        action: 'OBSERVE',
        epc: batteryId,
        bizStep: event.role.toLowerCase().replace(' ', '_'),
        disposition: 'in_transit',
        readPoint: event.location,
        bizLocation: event.location,
        eventTime: event.timestamp,
        eventData: event.data
      });

      const transactionId = await this.storeOnIOTA(epcisEvent);
      console.log('Supply chain event added:', transactionId);
      return transactionId;
    } catch (error) {
      console.error('Error adding supply chain event:', error);
      throw error;
    }
  }

  /**
   * Retrieve battery passport data
   */
  async getBatteryPassport(batteryId: string): Promise<BatteryPassportData | null> {
    try {
      // This would query the IOTA network for the battery data
      // For now, return mock data with verification status
      const mockData: BatteryPassportData = {
        batteryId,
        manufacturer: "BMW",
        model: "BMW iX3 Battery Pack",
        plant: "BMW Leipzig, Germany",
        date: "2025-03-15",
        chemistry: "NCM811 (LiNi0.8Co0.1Mn0.1O2)",
        carbonFootprint: 49,
        supplyChain: [
          {
            participant: "CATL",
            role: "Cell Manufacturer",
            location: "Ningde, China",
            timestamp: "2025-03-10T10:00:00Z",
            data: { carbonFootprint: "49 kgCO2eq/kWh" }
          }
        ],
        verificationStatus: 'verified'
      };

      return mockData;
    } catch (error) {
      console.error('Error retrieving battery passport:', error);
      return null;
    }
  }

  /**
   * Verify battery passport data integrity
   */
  async verifyPassport(batteryId: string): Promise<boolean> {
    try {
      // This would verify the cryptographic signatures and data integrity
      // For now, return true for mock implementation
      const isValid = await this.verifyDataIntegrity(batteryId);
      return isValid;
    } catch (error) {
      console.error('Error verifying passport:', error);
      return false;
    }
  }

  /**
   * Generate QR code data for battery identification
   */
  generateQRData(batteryId: string): string {
    // Generate GS1 Digital Link format for EU compliance
    const baseUrl = 'https://battery-passport.humanmachine.eu';
    return `${baseUrl}/passport/${batteryId}`;
  }

  // Private helper methods

  private createEPCISEvent(eventData: any) {
    return {
      '@context': 'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
      type: 'EPCISDocument',
      schemaVersion: '2.0',
      creationDate: new Date().toISOString(),
      epcisBody: {
        eventList: [{
          type: 'ObjectEvent',
          eventTime: eventData.eventTime,
          eventTimeZoneOffset: '+00:00',
          epcList: [eventData.epc],
          action: eventData.action,
          bizStep: `https://ref.gs1.org/voc/Bizstep-${eventData.bizStep}`,
          disposition: `https://ref.gs1.org/voc/Disp-${eventData.disposition}`,
          readPoint: { id: eventData.readPoint },
          bizLocation: { id: eventData.bizLocation },
          userExtensions: eventData.eventData
        }]
      }
    };
  }

  private async storeOnIOTA(data: any): Promise<string> {
    // Mock implementation - in reality this would:
    // 1. Serialize the data
    // 2. Create a transaction on IOTA
    // 3. Return the transaction ID
    
    const mockTransactionId = `iota:tx:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockTransactionId;
  }

  private async verifyDataIntegrity(batteryId: string): Promise<boolean> {
    // Mock implementation - in reality this would:
    // 1. Retrieve data from IOTA network
    // 2. Verify cryptographic signatures
    // 3. Check data consistency
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true; // Mock verification success
  }
}
