import { BatteryCard } from './BatteryCard';
import { SupplyChainTimeline } from './SupplyChainTimeline';
import { SustainabilityMetrics } from './SustainabilityMetrics';
import { BatteryData } from '../types/battery';

interface DashboardProps {
  data: BatteryData;
}

export function Dashboard({ data }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Battery Supply Chain Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Track the complete lifecycle and sustainability metrics of your battery pack
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Battery Info */}
          <div className="lg:col-span-1">
            <BatteryCard data={data} />
          </div>

          {/* Right Column - Supply Chain & Metrics */}
          <div className="lg:col-span-2 space-y-8">
            <SupplyChainTimeline participants={data.supplyChain} />
            <SustainabilityMetrics participants={data.supplyChain} />
          </div>
        </div>
      </div>
    </div>
  );
}
