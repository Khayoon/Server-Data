import React from 'react';

const Search = ({ setSearchTerm }) => {
  return (
    <div>
      filter shown with: <input
        onChange={(event) => setSearchTerm(event.target.value)} />
    </div>
  )
};

export default Search;
