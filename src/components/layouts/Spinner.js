import React from 'react'
import spinner from '../../assets/loaders/spinner.gif'

export default () => {
    return (
        <div>
            <img src={spinner} alt="Pls Wait!" style={{ display : "block", margin : " 40px auto", width : "200px"}} />

        </div>
    )
}