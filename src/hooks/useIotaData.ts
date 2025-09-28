// src/hooks/useIotaData.ts
import { useState, useEffect } from 'react';
import { IotaService, BatteryPassportData } from '../services/iotaService';

const iotaService = new IotaService('devnet');

export function useIotaData(batteryId: string) {
  const [data, setData] = useState<BatteryPassportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First verify IOTA connection
        const isConnected = await iotaService.verifyConnection();
        if (!isConnected) {
          throw new Error('Unable to connect to IOTA network');
        }

        const result = await iotaService.getBatteryPassport(batteryId);
        if (!result) {
          throw new Error('No battery data found');
        }
        
        setData(result);
      } catch (err) {
        const errorMessage = (err as Error).message || 'Failed to fetch battery data';
        setError(errorMessage);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBatteryData();
  }, [batteryId]);

  return { data, loading, error };
}