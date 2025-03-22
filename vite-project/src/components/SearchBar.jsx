import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setProfiles }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const res = await axios.get(`http://localhost:5000/api/profiles/search?query=${query}`);
    setProfiles(res.data);
  };

  return (
    <div className="my-4 flex justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 rounded-l-md border dark:bg-gray-800 dark:text-white focus:outline-none"
        placeholder="Search profiles or skills..."
      />
      <button onClick={handleSearch} className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">Search</button>
    </div>
  );
}

export default SearchBar;