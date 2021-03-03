import React, { useState } from 'react';

const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }

    const resetInputField = () => {
        setSearchValue("");
    }

    const searchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    return (
        <form className="search">
            <input 
                value={searchValue}
                onChange={handleSearchInputChanges}
                type='text'
            />
            <input
                onClick={searchFunction}
                type='submit'
                value='SEARCH' 
            />
        </form>
    );
}

export default Search;