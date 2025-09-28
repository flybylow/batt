// src/services/iotaService.ts
import { getFullnodeUrl, IotaClient } from '@iota/iota-sdk/client';

export interface BatteryPassportData {
  batteryId: string;
  manufacturer: string;
  model: string;
  plant: string;
  date: string;
  chemistry: string;
  carbonFootprint: number;
  verificationStatus: 'verified' | 'pending' | 'failed';
}

export class IotaService {
  private client: IotaClient;

  constructor(network: 'mainnet' | 'testnet' | 'devnet' = 'devnet') {
    this.client = new IotaClient({ 
      url: getFullnodeUrl(network) 
    });
  }

  /**
   * Get battery passport data from IOTA network
   */
  async getBatteryPassport(batteryId: string): Promise<BatteryPassportData | null> {
    try {
      // For now, return mock data while we establish the connection
      // In a real implementation, you would:
      // 1. Parse the batteryId to extract the IOTA address or object ID
      // 2. Query the IOTA network for the stored data
      // 3. Verify the data integrity and signatures
      
      console.log('Fetching battery data from IOTA network...');
      
      // Test the IOTA connection by getting network info
      const networkInfo = await this.client.getLatestCheckpointSequenceNumber();
      console.log('IOTA network checkpoint:', networkInfo);

      // Mock data with real IOTA network connection confirmed
      const mockData: BatteryPassportData = {
        batteryId,
        manufacturer: "BMW",
        model: "BMW iX3 Battery Pack",
        plant: "BMW Leipzig, Germany", 
        date: "2025-03-15",
        chemistry: "NCM811 (LiNi0.8Co0.1Mn0.1O2)",
        carbonFootprint: 49,
        verificationStatus: 'verified'
      };

      return mockData;
    } catch (error) {
      console.error('Error fetching battery passport from IOTA:', error);
      return null;
    }
  }

  /**
   * Verify the connection to IOTA network
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.client.getLatestCheckpointSequenceNumber();
      return true;
    } catch (error) {
      console.error('IOTA connection failed:', error);
      return false;
    }
  }
}