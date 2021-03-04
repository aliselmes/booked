import React, { useState } from 'react';

const Search = ({search}) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
        console.log(e.target.value);
    }

    const resetInputField = () => {
        setSearchValue("");
    }

    const searchFunction = (e) => {
        e.preventDefault();
        search(searchValue);
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