import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('http://localhost:3000/bfhl', parsedInput);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input or server error');
      setResponse(null);
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    const filteredData = {};

    if (selectedFilters.includes('numbers')) filteredData.numbers = numbers;
    if (selectedFilters.includes('alphabets')) filteredData.alphabets = alphabets;
    if (selectedFilters.includes('highest_alphabet')) filteredData.highest_alphabet = highest_alphabet;

    return (
      <div>
        {Object.entries(filteredData).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value.join(', ')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Your Roll Number</h1>
      <div>
        <textarea
          placeholder='Enter JSON input (e.g., {"data": ["M", "1", "334", "4", "B"]})'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '300px', height: '100px' }}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {response && (
        <div>
          <h3>Multi Filter</h3>
          <div>
            <label>
              <input
                type="checkbox"
                value="numbers"
                onChange={handleFilterChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="alphabets"
                onChange={handleFilterChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="highest_alphabet"
                onChange={handleFilterChange}
              />
              Highest Alphabet
            </label>
          </div>

          <h3>Filtered Response</h3>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;