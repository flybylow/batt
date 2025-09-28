import { Leaf, Recycle, Globe, TrendingDown } from 'lucide-react';
import { SupplyChainParticipant } from '../types/battery';

interface SustainabilityMetricsProps {
  participants: SupplyChainParticipant[];
}

export function SustainabilityMetrics({ participants }: SustainabilityMetricsProps) {
  // Extract carbon footprint data
  const carbonFootprint = participants.find(p => p.carbonFootprint)?.carbonFootprint;
  const recycledContent = participants.find(p => p.materials?.some(m => m.includes('recycledContent')))?.materials?.find(m => m.includes('recycledContent'));
  
  const metrics = [
    {
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      title: "Carbon Footprint",
      value: carbonFootprint || "N/A",
      description: "Per kWh of battery capacity"
    },
    {
      icon: <Recycle className="h-6 w-6 text-blue-600" />,
      title: "Recycled Content",
      value: recycledContent?.split(':')[1]?.trim() || "N/A",
      description: "Percentage of recycled materials"
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-600" />,
      title: "Supply Chain",
      value: `${participants.length} Partners`,
      description: "Number of supply chain participants"
    },
    {
      icon: <TrendingDown className="h-6 w-6 text-orange-600" />,
      title: "Traceability",
      value: "100%",
      description: "End-to-end visibility"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Sustainability Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              {metric.icon}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">{metric.title}</h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
