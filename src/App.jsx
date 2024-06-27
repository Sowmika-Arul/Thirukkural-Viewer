import { useState, useEffect } from 'react';
import './App.css';
import thiruvalluvarImage from './thiruvalluvar.jpg'; // Import Thiruvalluvar's image

const App = () => {
  const [kuralNumber, setKuralNumber] = useState('');
  const [kural, setKural] = useState(null);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

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

  const handleBookmark = () => {
    if (kural && !bookmarks.some(b => b.number === kural.number)) {
      const updatedBookmarks = [...bookmarks, kural];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }
  };

  const handleRemoveBookmark = (kuralNumber) => {
    const updatedBookmarks = bookmarks.filter(b => b.number !== kuralNumber);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="thiruvalluvar-image-container">
          <img src={thiruvalluvarImage} alt="Thiruvalluvar" className="thiruvalluvar-image" />
        </div>
        <div className="thiruvalluvar-info">
          <h2><center>திருக்குறள்</center></h2>
          <p>திருக்குறள் ஒரு தலைசிறந்த படைப்பாகவும் தமிழ் இலக்கியத்தின் மிக முக்கியமான நூல்களில் ஒன்றாகவும் கருதப்படுகிறது. </p>
          <p> இந்த படைப்பு தமிழ் கவிஞர் மற்றும் தத்துவஞானியான திருவள்ளுவர் எழுதியது. </p>
          <p>திருக்குறள் / நீதி நூல் சங்கம் மருவிய காலத்தில் (கிபி. 2ம் - கிபி. 6ம் நூற்றாண்டு) இயற்றப்பட்ட ஒரு நூல்.</p>
          <ul>
            <li>பால் (Parts): 3</li>
            <li>இயல்கள் (Sections): 7</li>
            <li>அதிகாரங்கள் (Chapters): 133</li>
            <li>குறள் (Kurals): 1330</li>
          </ul>
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
              <button className="bookmark-button" onClick={handleBookmark}>Bookmark</button>
            </div>
          )}
          {bookmarks.length > 0 && (
            <div className="bookmarks-container">
              <h2>Bookmarked Kurals</h2>
              {bookmarks.map((bookmark) => (
                <div key={bookmark.number} className="bookmark">
                  <p><strong>குறள் எண்:</strong> {bookmark.number}</p>
                  <p><strong>வரிசை 1:</strong> {bookmark.line1}</p>
                  <p><strong>வரிசை 2:</strong> {bookmark.line2}</p>
                  <button className="remove-bookmark-button" onClick={() => handleRemoveBookmark(bookmark.number)}>Remove Bookmark</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
