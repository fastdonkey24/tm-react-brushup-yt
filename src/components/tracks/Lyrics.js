import React from 'react'
import AppKeys from '../../config/keys';
import Spinner from '../layouts/Spinner';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';


class Lyrics extends React.Component {
   state = {
      track : {},
      lyrics : ""
   }

   componentDidMount(){
      let lyricEndpointURL = `${AppKeys.CORS_ENABLER}/${AppKeys.BASE_URL}/${AppKeys.LYRIC_URL}=${this.props.match.params.id
      }&apikey=${AppKeys.MUSIXMATCH_KEY}` 

      fetch(lyricEndpointURL)
      .then( response => response.json() )
      .then( result => {
        this.setState({ lyrics : result.message.body.lyrics })
      })

      let trackEndpointURL = `${AppKeys.CORS_ENABLER}/${AppKeys.BASE_URL}/${AppKeys.TRACK_URL}=${this.props.match.params.id
      }&apikey=${AppKeys.MUSIXMATCH_KEY}` 

      fetch(trackEndpointURL)
      .then( response => response.json() )
      .then( result => {

        this.setState({ track: result.message.body.track  })
      })

   }
   render(){
      const { track, lyrics } = this.state;

      if (
         track === undefined ||
         lyrics === undefined ||
         Object.keys(track).length === 0 ||
         Object.keys(lyrics).length === 0
      ) {
      return <Spinner />;
      } else {
         return (
            <React.Fragment>
              <Link to="/" className="btn btn-dark btn-sm mb-4">
                Go Back
              </Link>
              <div className="card">
                <h5 className="card-header">
                  {track.track_name} by{' '}
                  <span className="text-secondary">{track.artist_name}</span>
                </h5>
                <div className="card-body">
                  <p className="card-text">{lyrics.lyrics_body}</p>
                </div>
              </div>
    
              <ul className="list-group mt-3">
                <li className="list-group-item">
                  <strong>Album ID</strong>: {track.album_id}
                </li>
                <li className="list-group-item">
                  <strong>Song Genre</strong>:{' '}
                 { track.primary_genres.music_genre_list.length === 0 ? 'NO GENRE AVAILABLE' : track.primary_genres.music_genre_list[0].music_genre.music_genre_name }
                </li>
                <li className="list-group-item">
                  <strong>Explicit Words</strong>:{' '}
                  {track.explicit === 0 ? 'No' : 'Yes'}
                </li>
                <li className="list-group-item">
                  <strong>Release Date</strong>:{' '}
                  <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
                </li>
              </ul>
            </React.Fragment>
         )
      }
   
   }
}  
export default Lyrics