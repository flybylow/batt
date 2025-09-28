import { useState, useEffect } from 'react';
import { IotaService, BatteryPassportData } from '../services/iotaService';

export const useIotaData = (batteryId: string) => {
  const [data, setData] = useState<BatteryPassportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!batteryId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const iotaService = new IotaService('testnet');
        const passportData = await iotaService.getBatteryPassport(batteryId);
        
        if (passportData) {
          setData(passportData);
        } else {
          setError('Battery passport not found on IOTA network');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data from IOTA');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [batteryId]);

  return { data, loading, error };
};
