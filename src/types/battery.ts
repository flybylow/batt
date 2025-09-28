export interface BatteryData {
  batteryId: string;
  manufacturerDID: string;
  productionData: {
    plant: string;
    date: string;
    model: string;
    chemistry: string;
  };
  supplyChain: SupplyChainParticipant[];
  verificationMethod: string;
}

export interface SupplyChainParticipant {
  participant: string;
  role: string;
  location: string;
  carbonFootprint?: string;
  materials?: string[];
  assemblyDate?: string;
}
