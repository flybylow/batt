import { Battery, MapPin, Calendar, Package, Shield } from 'lucide-react';
import { BatteryData } from '../types/battery';

interface BatteryCardProps {
  data: BatteryData;
}

export function BatteryCard({ data }: BatteryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <Battery className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{data.productionData.model}</h2>
          <p className="text-sm text-gray-500">Battery ID: {data.batteryId.slice(0, 20)}...</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{data.productionData.plant}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{data.productionData.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{data.productionData.chemistry}</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">Verified</span>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <p className="text-xs text-gray-500">
          Verification: {data.verificationMethod}
        </p>
      </div>
    </div>
  );
}
