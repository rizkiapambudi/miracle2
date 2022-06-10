import React from 'react'

const NotFound = () => {
    return (
        <div id="wrapper">
            <img src={process.env.PUBLIC_URL + "/images/list-image-empty.png"} alt="not found" />
            <div id="info">
                <h3>This page could not be found</h3>
            </div>
        </div >
    )
}

export default NotFound