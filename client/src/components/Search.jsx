import React from 'react'
import '../styles/Search.css'

function Search() {
    return (
        <div className="searchContainer">
            <div className="inputContainer input1Container">
                <input className="searchInput searchByText" type="text" placeholder="Search by name, or tags seperate by commas" />
            </div>
            <h1 className="or">Or</h1>
            <div className="inputContainer input2Container">
                <label class="searchInput searchByImage">
                    <input type="file" />
                    Search by Image
                </label>
            </div>
        </div>
    )
}

export default Search
