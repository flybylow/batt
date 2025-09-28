// src/services/iotaService.ts
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
  private evmProvider: ethers.JsonRpcProvider;
  private network: 'testnet' | 'mainnet';
  
  constructor(network: 'testnet' | 'mainnet' = 'testnet') {
    this.network = network;
    this.initializeClients(network);
  }

  private async initializeClients(network: 'testnet' | 'mainnet') {
    try {
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
   * Retrieve battery passport data from IOTA network
   */
  async getBatteryPassport(batteryId: string): Promise<BatteryPassportData | null> {
    try {
      // Extract transaction ID from battery ID if it's in IOTA format
      const transactionId = this.extractTransactionId(batteryId);
      
      if (!transactionId) {
        console.error('Invalid battery ID format');
        return null;
      }

      // Query IOTA network for the transaction (mock implementation)
      const transaction = await this.getTransactionFromIOTA(transactionId);
      
      if (!transaction) {
        console.error('Transaction not found on IOTA network');
        return null;
      }

      // Parse the transaction payload
      const passportData = this.parseTransactionPayload(transaction);
      
      // Verify the data integrity
      const isVerified = await this.verifyPassport(batteryId);
      
      return {
        ...passportData,
        batteryId,
        verificationStatus: isVerified ? 'verified' : 'failed'
      };
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
    try {
      // Serialize the data to JSON
      const serializedData = JSON.stringify(data);
      
      // Mock implementation - in reality this would:
      // 1. Create a message with the data
      // 2. Submit the message to the IOTA network
      // 3. Return the message ID
      
      const mockMessageId = `iota:msg:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Data stored on IOTA network:', mockMessageId);
      return mockMessageId;
    } catch (error) {
      console.error('Error storing data on IOTA:', error);
      throw error;
    }
  }

  private async verifyDataIntegrity(batteryId: string): Promise<boolean> {
    try {
      const transactionId = this.extractTransactionId(batteryId);
      
      if (!transactionId) {
        return false;
      }

      // Get the transaction from IOTA network
      const transaction = await this.getTransactionFromIOTA(transactionId);
      
      if (!transaction) {
        return false;
      }

      // Verify the message signature (mock implementation)
      const isValid = await this.verifyMessageSignature(transaction);
      
      return isValid;
    } catch (error) {
      console.error('Error verifying data integrity:', error);
      return false;
    }
  }

  private extractTransactionId(batteryId: string): string | null {
    // Extract transaction ID from battery ID format
    // Expected format: did:iota:rms1qp8h4f2x5qa... or iota:tx:...
    if (batteryId.startsWith('iota:tx:')) {
      return batteryId.replace('iota:tx:', '');
    }
    
    if (batteryId.startsWith('did:iota:')) {
      // Extract the transaction ID from the DID
      const parts = batteryId.split(':');
      if (parts.length >= 3) {
        return parts[2]; // The transaction ID part
      }
    }
    
    return null;
  }

  private parseTransactionPayload(transaction: any): Omit<BatteryPassportData, 'batteryId' | 'verificationStatus'> {
    try {
      // Parse the transaction payload to extract battery data
      const payload = JSON.parse(transaction.payload);
      
      // Extract EPCIS event data
      const epcisEvent = payload.epcisBody?.eventList?.[0];
      const eventData = epcisEvent?.userExtensions || {};
      
      return {
        manufacturer: eventData.manufacturer || 'Unknown',
        model: eventData.model || 'Unknown',
        plant: epcisEvent?.bizLocation?.id || 'Unknown',
        date: epcisEvent?.eventTime || new Date().toISOString(),
        chemistry: eventData.chemistry || 'Unknown',
        carbonFootprint: eventData.carbonFootprint || 0,
        supplyChain: this.parseSupplyChainEvents(payload)
      };
    } catch (error) {
      console.error('Error parsing transaction payload:', error);
      // Return default data if parsing fails
      return {
        manufacturer: 'BMW',
        model: 'BMW iX3 Battery Pack',
        plant: 'BMW Leipzig, Germany',
        date: '2025-03-15',
        chemistry: 'NCM811 (LiNi0.8Co0.1Mn0.1O2)',
        carbonFootprint: 49,
        supplyChain: []
      };
    }
  }

  private parseSupplyChainEvents(payload: any): SupplyChainEvent[] {
    try {
      const events = payload.epcisBody?.eventList || [];
      
      return events.map((event: any) => ({
        participant: event.userExtensions?.participant || 'Unknown',
        role: event.userExtensions?.role || 'Unknown',
        location: event.bizLocation?.id || 'Unknown',
        timestamp: event.eventTime || new Date().toISOString(),
        data: event.userExtensions || {},
        signature: event.signature
      }));
    } catch (error) {
      console.error('Error parsing supply chain events:', error);
      return [];
    }
  }

  private async getTransactionFromIOTA(transactionId: string): Promise<any> {
    // Mock implementation - in reality this would query the IOTA network
    // For now, return mock transaction data
    return {
      id: transactionId,
      payload: JSON.stringify({
        epcisBody: {
          eventList: [{
            type: 'ObjectEvent',
            eventTime: '2025-03-15T10:00:00Z',
            eventTimeZoneOffset: '+00:00',
            epcList: ['did:iota:rms1qp8h4f2x5qa...'],
            action: 'CREATE',
            bizStep: 'https://ref.gs1.org/voc/Bizstep-manufacturing',
            disposition: 'https://ref.gs1.org/voc/Disp-in_progress',
            readPoint: { id: 'BMW Leipzig, Germany' },
            bizLocation: { id: 'BMW Leipzig, Germany' },
            userExtensions: {
              manufacturer: 'BMW',
              model: 'BMW iX3 Battery Pack',
              chemistry: 'NCM811 (LiNi0.8Co0.1Mn0.1O2)',
              carbonFootprint: 49
            }
          }]
        }
      })
    };
  }

  private async verifyMessageSignature(transaction: any): Promise<boolean> {
    // Mock implementation - in reality this would verify the cryptographic signature
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true; // Mock verification success
  }
}
