import { useState } from 'react';
import './App.css';
import thiruvalluvarImage from './thiruvalluvar.jpg'; // Import Thiruvalluvar's image

const App = () => {
  const [kuralNumber, setKuralNumber] = useState('');
  const [kural, setKural] = useState(null);
  const [error, setError] = useState(null);

  const fetchKural = async () => {
    try {
      const response = await fetch(`https://getthirukkural.appspot.com/api/3.0/kural/${kuralNumber}?appid=wwvguvrcxuiha&format=json`);
      if (!response.ok) {
        throw new Error('Failed to fetch the Thirukkural.');
      }
      const data = await response.json();
      setKural(data);
      setError(null); 
    } catch (error) {
      setError('There was an error fetching the Thirukkural!');
      setKural(null);
    }
  };

  const handleInputChange = (event) => {
    setKuralNumber(event.target.value);
  };

  const handleFetchKural = () => {
    fetchKural();
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="thiruvalluvar-image-container">
          <img src={thiruvalluvarImage} alt="Thiruvalluvar" className="thiruvalluvar-image" />
        </div>
        <div className="thiruvalluvar-info">
          <h2>திருக்குறள்</h2>
          <p>திருக்குறள் அல்லது குறள், தமிழ் இலக்கியத்தின் பரிமாணமான படைப்புகளில் ஒன்றாகும். இந்த படைப்பு தமிழ் கவிஞர் மற்றும் தத்துவஞானியான திருவள்ளுவர் எழுதியது. இது 133 அத்தியாயங்களையும் பத்து குறள்களையும் கொண்டுள்ளது.</p>
        </div>
      </div>
      <div className="right-panel">
        <div className="box">
          <h1>Thirukkural Viewer</h1>
          <div className="input-container">
            <input
              type="number"
              value={kuralNumber}
              onChange={handleInputChange}
              placeholder="Enter Kural Number"
              className="input-field"
            />
            <button className="fetch-button" onClick={handleFetchKural}>Fetch Kural</button>
          </div>
          {error && <p className="error">{error}</p>}
          {kural && (
            <div className="kural-container">
              <p className="kural-text"><strong>குறள் எண்:</strong> {kural.number}</p>
              <p className="kural-text"><strong>வரிசை 1:</strong> {kural.line1}</p>
              <p className="kural-text"><strong>வரிசை 2:</strong> {kural.line2}</p>
              <p className="kural-text"><strong>அதிகாரம்:</strong> {kural.athigaram}</p>
              <p className="kural-text"><strong>பால்:</strong> {kural.paal}</p>
              <p className="kural-text"><strong>இயல்:</strong> {kural.iyal}</p>
              <p className="kural-text"><strong>கலைஞர் மு.கருணாநிதி:</strong> {kural.urai1}</p>
              <p className="kural-text"><strong>பேராசிரியர் சாலமன் பாப்பையா:</strong> {kural.urai3}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

// body {
//     margin: 0;
//     font-family: Arial, sans-serif;
//     background-color: #f7f7f7;
//   }
  
//   .container {
//     display: flex;
//     flex-direction: row;
//     height: 100vh;
//     background-color: #fff;
//     border-radius: 10px;
//     box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
//     overflow: hidden;
//   }
  
//   .left-panel, .right-panel {
//     flex: 1;
//     padding: 20px;
//   }
  
//   .left-panel {
//     background-color: #4caf50;
//     color: #fff;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     text-align: center;
//   }
  
//   .thiruvalluvar-image-container {
//     margin-bottom: 20px;
//   }
  
//   .thiruvalluvar-image {
//     width: 200px;
//     height: auto;
//     border-radius: 50%;
//     border: 4px solid #fff;
//   }
  
//   .thiruvalluvar-info h2 {
//     margin: 20px 0;
//     font-size: 24px;
//   }
  
//   .thiruvalluvar-info p {
//     font-size: 16px;
//     line-height: 1.6;
//   }
  
//   .right-panel {
//     background-color: #fff;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//   }
  
//   .box {
//     width: 100%;
//     max-width: 500px;
//     padding: 20px;
//     background-color: #f7f7f7;
//     border-radius: 10px;
//     box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
//     text-align: center;
//   }
  
//   .box h1 {
//     margin-bottom: 20px;
//     font-size: 28px;
//     color: #333;
//   }
  
//   .input-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     margin-bottom: 20px;
//   }
  
//   .input-field {
//     width: 100%;
//     max-width: 300px;
//     padding: 10px;
//     margin-bottom: 10px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     font-size: 16px;
//   }
  
//   .fetch-button {
//     padding: 10px 20px;
//     background-color: #4caf50;
//     color: #fff;
//     border: none;
//     border-radius: 5px;
//     font-size: 16px;
//     cursor: pointer;
//     transition: background-color 0.3s;
//   }
  
//   .fetch-button:hover {
//     background-color: #45a049;
//   }
  
//   .error {
//     color: #d9534f;
//     margin-top: 10px;
//   }
  
//   .kural-container {
//     text-align: left;
//   }
  
//   .kural-text {
//     margin: 5px 0;
//     font-size: 16px;
//   }
  