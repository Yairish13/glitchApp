import React from 'react';
// import App from './App.js'
import './SearchInput.css';
import TextField from '@material-ui/core/TextField';

function SearchInput(props) {
  return (
    <div>
      <TextField
        style={{ marginTop: 20 }}
        id="searchInput"
        type="text"
        onChange={(e) => props.setSearchInput(e.target.value)}
        variant="outlined"
        label="Search Ticket"
        autoComplete="off"
      />
    </div>
  );
}

export default SearchInput;
