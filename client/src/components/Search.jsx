import React, { useEffect, useState } from 'react'
import { Circles } from 'react-loading-icons'
import '../styles/Search.css'
import axios from 'axios'
import Masonry from 'react-masonry-css'
import { uploadFile } from 'react-s3'
const vision = require('@google-cloud/vision')
const dotenv = require('dotenv')

function Search() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [queryText, setQueryText] = useState("")
    //const [queryImage, setQueryImage] = useState();

    useEffect(() => {

        axios.get('/api/getImages').then((res) => {
            setData(res.data.results)
            setLoading(false)
        })
    }, [])

    const Images = () => {
        if (loading) {
            return (
                <div className="center">
                    <Circles style={{"margin-top": "45px"}} fill="#FF8541"/>
                </div>
            )
        }

        const imageArr = []

        if (queryText == ""){
            data.forEach((image) => {
                imageArr.push(<img className="image-item" src={image.url} />)
            })
        }else{
            const records = []
            const queryTags = queryText.split(",")
            data.forEach((image) => {
                for (var i = 0; i < queryTags.length; i++){

                    if (queryTags[i] == ""){
                        continue;
                    }

                    if (image.name.toLowerCase().includes(queryTags[i].toLowerCase())){
                        if (!records.includes(image.url)){
                            imageArr.push(<img className="image-item" src={image.url} />)
                            records.push(image.url)
                            break;
                        }
                        
                    }
                    for (var j = 0; j < image.tags.length; j++){
                        if (image.tags[j].toLowerCase().includes(queryTags[i].toLowerCase())){
                            if (!records.includes(image.url)){
                                imageArr.push(<img className="image-item" src={image.url} />)
                                records.push(image.url)
                                break;
                            }
                            
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

    const handleFileInput = async (e) => {
        e.preventDefault();
        const queryImage = e.target.files[0]

        //console.log(process.env.REACT_APP_SECRET)

        const config = {
            bucketName: "keshavaashopifyfallchallenge",
            region: "ca-central-1",
            accessKeyId: process.env.REACT_APP_ID,
            secretAccessKey: process.env.REACT_APP_SECRET
        }

        uploadFile(queryImage, config).then((data) => {

            fetch("/api/getLabels", {
                method: "POST",
                body: {
                    url: data.location
                },
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => {
                setQueryText(res.data.labels.join())
            })
        }).catch((err) => console.log(err))

        

    }

    return (
        <div className="searchContainer">
            <div className="inputContainer input1Container">
                <input className="searchInput searchByText" type="text" value={queryText} placeholder={"Search by name, or tags seperate by commas"} onChange={(e) => queryTextChange(e)} />
            </div>
            <h1 className="or">Or</h1>
            <div className="inputContainer input2Container">
                <label class="searchInput searchByImage">
                    <input type="file" onChange={e => handleFileInput(e)}/>
                    Search by Image
                </label>
            </div>
            <Images />

        </div>
    )
}

export default Search
