function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'blue', fontSize: '24px' }}>Battery Dashboard</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
        <div style={{ position: 'relative' }}>
          <img 
            src="/battery.png" 
            alt="BMW iX3 Battery" 
            style={{ width: '200px', height: 'auto' }}
          />
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '12px',
            textAlign: 'center',
            maxWidth: '150px'
          }}>
            <div style={{ fontWeight: 'bold', color: '#0066cc' }}>BMW iX3 B</div>
            <div>BMW Leipzig, Germany</div>
            <div style={{ fontSize: '10px' }}>NCM811</div>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#333', marginBottom: '15px' }}>Battery Details</h2>
          <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
            <p><strong>Battery ID:</strong> did:iota:rms1qp8h4f2x5qa...</p>
            <p><strong>Manufacturer:</strong> BMW</p>
            <p><strong>Model:</strong> BMW iX3 Battery Pack</p>
            <p><strong>Plant:</strong> BMW Leipzig, Germany</p>
            <p><strong>Date:</strong> 2025-03-15</p>
            <p><strong>Chemistry:</strong> NCM811 (LiNi0.8Co0.1Mn0.1O2)</p>
            <p><strong>Carbon Footprint:</strong> 49 kgCO2eq/kWh</p>
            <p><strong>Verification Status:</strong> 
              <span style={{ color: 'green', fontWeight: 'bold' }}>VERIFIED</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Real Data Section */}
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>Real-Time Data</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ backgroundColor: '#e6f3ff', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: '#0066cc', marginBottom: '10px' }}>Supply Chain Events</h3>
            <div style={{ fontSize: '14px' }}>
              <p><strong>Cell Manufacturing:</strong> CATL, Ningde, China</p>
              <p><strong>Date:</strong> 2025-03-10</p>
              <p><strong>Carbon Footprint:</strong> 49 kgCO2eq/kWh</p>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#fff2e6', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: '#cc6600', marginBottom: '10px' }}>Materials & Recycling</h3>
            <div style={{ fontSize: '14px' }}>
              <p><strong>Lithium Supplier:</strong> Ganfeng Lithium</p>
              <p><strong>Location:</strong> Jiangxi, China</p>
              <p><strong>Recycled Content:</strong> 6%</p>
              <p><strong>Li2CO3:</strong> 15kg</p>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '20px', backgroundColor: '#f0f8f0', padding: '15px', borderRadius: '8px' }}>
          <h3 style={{ color: '#006600', marginBottom: '10px' }}>Assembly & Verification</h3>
          <div style={{ fontSize: '14px' }}>
            <p><strong>Pack Assembler:</strong> BMW Group</p>
            <p><strong>Assembly Location:</strong> Leipzig, Germany</p>
            <p><strong>Assembly Date:</strong> 2025-03-15</p>
            <p><strong>Smart Contract:</strong> iotaEVM:0x1234...smartContract</p>
            <p><strong>Blockchain Verification:</strong> 
              <span style={{ color: 'green', fontWeight: 'bold' }}>✓ VERIFIED</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
