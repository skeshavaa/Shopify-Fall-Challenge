import React, { useEffect, useState } from 'react'
import '../styles/Search.css'
import axios from 'axios'
import Masonry from 'react-masonry-css'
import { uploadFile } from 'react-s3'
const vision = require('@google-cloud/vision')

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
            const records = []
            const queryTags = queryText.split(",")
            data.forEach((image) => {
                for (var i = 0; i < queryTags.length; i++){

                    if (queryTags[i] == ""){
                        continue;
                    }

                    if (image.name.toLowerCase().includes(queryTags[i].toLowerCase())){
                        if (!imageArr.includes(<img className="image-item" src={image.url} />)){
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
        const config = {
            bucketName: "keshavaashopifyfallchallenge",
            region: "ca-central-1",
            accessKeyId: "AKIAQLCIPQ3CUIIZL4U4",
            secretAccessKey: "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"
        }

        uploadFile(queryImage, config).then((data) => {
            console.log(data)
            axios({
                method: "post",
                url: "http://localhost:5000/api/getLabels",
                data: {
                    url: data.location
                }
            }).then((res) => {
                console.log(res.data.labels.join())
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
