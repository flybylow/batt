import { Factory, MapPin, Leaf, Package } from 'lucide-react';
import { SupplyChainParticipant } from '../types/battery';

interface SupplyChainTimelineProps {
  participants: SupplyChainParticipant[];
}

export function SupplyChainTimeline({ participants }: SupplyChainTimelineProps) {
  const getRoleIcon = (role: string) => {
    if (role.includes('Manufacturer')) return <Factory className="h-5 w-5" />;
    if (role.includes('Supplier')) return <Leaf className="h-5 w-5" />;
    if (role.includes('Assembler')) return <Package className="h-5 w-5" />;
    return <Factory className="h-5 w-5" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Supply Chain Journey</h3>
      
      <div className="space-y-6">
        {participants.map((participant, index) => (
          <div key={index} className="relative">
            {index < participants.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
            )}
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                {getRoleIcon(participant.role)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">{participant.participant}</h4>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {participant.role}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-gray-600">{participant.location}</span>
                </div>
                
                {participant.carbonFootprint && (
                  <div className="text-sm text-green-600 mb-2">
                    Carbon Footprint: {participant.carbonFootprint}
                  </div>
                )}
                
                {participant.materials && (
                  <div className="space-y-1">
                    {participant.materials.map((material, idx) => (
                      <div key={idx} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        {material}
                      </div>
                    ))}
                  </div>
                )}
                
                {participant.assemblyDate && (
                  <div className="text-sm text-gray-600 mt-2">
                    Assembly Date: {participant.assemblyDate}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
