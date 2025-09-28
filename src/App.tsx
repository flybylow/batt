function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'blue', fontSize: '24px' }}>Battery Dashboard</h1>
      <p>This is a test to see if the app is working.</p>
      <div style={{ marginTop: '20px' }}>
        <p><strong>Battery ID:</strong> did:iota:rms1qp8h4f2x5qa...</p>
        <p><strong>Manufacturer:</strong> BMW</p>
        <p><strong>Model:</strong> BMW iX3 Battery Pack</p>
        <p><strong>Plant:</strong> BMW Leipzig, Germany</p>
        <p><strong>Date:</strong> 2025-03-15</p>
        <p><strong>Chemistry:</strong> NCM811 (LiNi0.8Co0.1Mn0.1O2)</p>
      </div>
    </div>
  );
}

export default App
