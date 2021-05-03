import React, { useEffect, useState } from 'react'
import '../styles/Search.css'
import axios from 'axios'
import Masonry from 'react-masonry-css'


function Search() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [queryText, setQueryText] = useState("")
    const [queryImage, setQueryImage] = useState();

    useEffect(() => {

        axios.get('/api/getImages').then((res) => {
            setData(res.data.results)
            setLoading(false)
        })
    }, [])

    const Images = () => {
        if (loading) {
            return (
                <h1>Loading</h1>
            )
        }

        const imageArr = []

        if (queryText == ""){
            data.forEach((image) => {
                imageArr.push(<img className="image-item" src={image.url} />)
                console.log(image)
            })
        }else{
            const queryTags = queryText.split(",")
            data.forEach((image) => {
                for (var i = 0; i < queryTags.length; i++){
                    if (image.name.toLowerCase().includes(queryTags[i].toLowerCase())){
                        imageArr.push(<img className="image-item" src={image.url} />)
                        break;
                    }
                    for (var j = 0; j < image.tags.length; j++){
                        if (image.tags[j].toLowerCase().includes(queryTags[i].toLowerCase())){
                            imageArr.push(<img className="image-item" src={image.url} />)
                            break;
                        }
                    }
                }
            })
        }


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
    
    const queryTextChange = (e) => {
        e.preventDefault();
        setQueryText(e.target.value)
    }

    return (
        <div className="searchContainer">
            <div className="inputContainer input1Container">
                <input className="searchInput searchByText" type="text" placeholder="Search by name, or tags seperate by commas" onChange={(e) => queryTextChange(e)} />
            </div>
            <Images />

        </div>
    )
}

export default Search
