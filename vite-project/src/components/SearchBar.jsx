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
        className="p-2 rounded-l-md bg-gray-800 text-white border border-gray-700 focus:outline-none w-1/3"
        placeholder="Search user by name"
      />
      <button onClick={handleSearch} className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
        Search
      </button>
    </div>
  );
}

export default SearchBar;