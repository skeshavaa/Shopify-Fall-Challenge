import React from 'react'

function ProfileImage({ upload }) {

    console.log(upload)

    return (
        <div className="profileImgContainer">
            <img className="profileImg" src={upload.url}/>
            <h1 className="imgTitle">{upload.name}</h1>
            <a className={upload.public ? "public" : "private"}>{upload.public ? "Public" : "Private"}</a>
        </div>
    )
}

export default ProfileImage
