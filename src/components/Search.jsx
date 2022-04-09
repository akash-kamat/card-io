import React from 'react'

function Search({onSearch}) {
   
    return (
        <div className="inputdiv">
            <input id="searchbox" type="search" placeholder="Search" onChange={(e)=>onSearch(e)} />
        </div>
    )
}

export default Search;