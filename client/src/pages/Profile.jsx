import { Circles } from 'react-loading-icons'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../App'
import '../styles/Profile.css'
import Masonry from 'react-masonry-css'
import ProfileImage from '../components/ProfileImage'

function Profile() {

    const { state, dispatch } = useContext(AuthContext)
    const [ user, setUser ] = useState();
    const [ uploads, setUploads ] = useState([])
    const [loading, setLoading ] = useState(true);

    useEffect(() => {

        console.log(state)
        
        fetch("/api/users/user", {
            headers: {
                token: state.token
            }
        }).then(res => res.json())
        .then((data) => {
            console.log(data)
            setUser(data.user)
            setUploads(data.uploads)
            setLoading(false)
            
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    if (loading){
        return(
            <Circles style={{"margin-top": "45px"}} fill="#FF8541"/>
        )
    }

    const SetImages = () => {
        const imageArr = []

        uploads.forEach((upload) => {
            console.log(upload)
            imageArr.push(<ProfileImage upload={upload} />)
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
        <div className="profileContainer">
            <h1 className="name">{user.name}</h1>
            <h1 className="email">{user.email}</h1>
            <SetImages />
        </div>
    )
}

export default Profile
