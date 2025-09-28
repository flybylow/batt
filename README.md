# Battery Supply Chain Dashboard

A modern React dashboard for tracking battery supply chain data with sustainability metrics.

## Features

- **Battery Information Card**: Display battery model, production data, and verification status
- **Supply Chain Timeline**: Visual journey from raw materials to final assembly
- **Sustainability Metrics**: Carbon footprint, recycled content, and traceability data
- **Responsive Design**: Built with Tailwind CSS for modern, mobile-friendly UI

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Charts**: Recharts (ready for future enhancements)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/flybylow/batt.git
cd batt
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/
│   ├── BatteryCard.tsx          # Battery information display
│   ├── Dashboard.tsx            # Main dashboard layout
│   ├── SupplyChainTimeline.tsx  # Supply chain visualization
│   └── SustainabilityMetrics.tsx # Environmental metrics
├── data/
│   └── mockData.ts              # Sample battery data
├── types/
│   └── battery.ts               # TypeScript interfaces
└── App.tsx                      # Main application component
```

## Sample Data

The dashboard displays BMW iX3 Battery Pack data including:
- Production details from BMW Leipzig, Germany
- Supply chain participants (CATL, Ganfeng Lithium, BMW Group)
- Carbon footprint: 49 kgCO2eq/kWh
- Recycled content: 6%
- Full traceability with IOTA blockchain verification

## Development

- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`

## License

MIT License