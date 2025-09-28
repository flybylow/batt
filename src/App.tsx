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
    </div>
  );
}

export default App
