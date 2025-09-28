import { BatteryData } from '../types/battery';

export const mockBatteryData: BatteryData = {
  "batteryId": "did:iota:rms1qp8h4f2x5qa...",
  "manufacturerDID": "did:iota:manufacturers:bmw",
  "productionData": {
    "plant": "BMW Leipzig, Germany",
    "date": "2025-03-15",
    "model": "BMW iX3 Battery Pack",
    "chemistry": "NCM811 (LiNi0.8Co0.1Mn0.1O2)"
  },
  "supplyChain": [
    {
      "participant": "CATL",
      "role": "Cell Manufacturer", 
      "location": "Ningde, China",
      "carbonFootprint": "49 kgCO2eq/kWh"
    },
    {
      "participant": "Ganfeng Lithium",
      "role": "Lithium Supplier",
      "location": "Jiangxi, China", 
      "materials": ["Li2CO3: 15kg", "recycledContent: 6%"]
    },
    {
      "participant": "BMW Group",
      "role": "Pack Assembler",
      "location": "Leipzig, Germany",
      "assemblyDate": "2025-03-15"
    }
  ],
  "verificationMethod": "iotaEVM:0x1234...smartContract"
};
