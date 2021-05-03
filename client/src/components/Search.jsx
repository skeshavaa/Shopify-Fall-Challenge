import React, { useEffect, useState } from 'react'
import '../styles/Search.css'
import axios from 'axios'
import Masonry from 'react-masonry-css'


function Search() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        axios.get('/api/getImages').then((res) => {
            setData(res.data.results)
        })

        return () => {
            setLoading(false)

        }
    }, [])

    const Images = () => {
        if (loading) {
            return (
                <h1>Loading</h1>
            )
        }

        const imageArr = []
        data.forEach((image) => {
            imageArr.push(<img className="image-item" src={image.url} />)
            
        })

        console.log(imageArr)

        return (
            <div>
                <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {imageArr}
                </Masonry>
            </div>
        )

    }

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
            <Images />

        </div>
    )
}

export default Search
