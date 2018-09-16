import React from 'react'
import {Link} from 'react-router-dom'

const Song = (props) => {
    const {song} = props;

    return (
        <div className='col-md-6'>
            <div className='card mb-4 shadow-sm'>
                {song.artist_name}
                <p className="card-text">
                    <p> <strong> <i className="fas fa-play" /> Track </strong> : {song.track_name} </p>
                    <p> <strong> <i className="fas fa-compact-disc" /> Album </strong> : {song.album_name} </p>
                </p>
                <Link to={`lyrics/songs/${song.track_id}`} className='btn btn-block  btn-dark'>
            
                    View Lyrics
                </Link>
            </div>
        </div>
    )
}

export default Song