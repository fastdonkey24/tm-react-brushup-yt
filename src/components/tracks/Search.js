import React, {Component } from 'react'
import {Consumer} from '../../context';
import AppKeys from '../../config/keys';


class Search extends Component {
   state = {
      trackTitle : ""
   }

   onSongInputChange = (event) =>{
      this.setState({
         trackTitle : event.target.trackTitle
      })
   }

   findTrack(dispatch, event){
      event.preventDefault()
      let endpointURL = `${AppKeys.CORS_ENABLER}/${AppKeys.BASE_URL}/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${AppKeys.MUSIXMATCH_KEY}`

      fetch(endpointURL)
      .then(response => response.json())
      .then(result => {
         dispatch = {
            type : "SEARCH_TRACKS",
            payload : result.message.body.track_list
         }
      })
   }

   render(){
      return (
         <Consumer>
            {value => {
               const {dispatch} = value;
               return (
                  <div className='card card-body mb-4 p-4'>
                     <h4 className='display-4 text-center'>
                        <i className='fas fa-music'></i> Search for a Song
                     </h4>
                     <p className='lead text-center'>Get Lyrics of the Song </p>
                     <form onSubmit={this.findTrack.bind(this, dispatch)}>
                        <div className='form-group'>
                           <input type='text' placeholder='Song title' className='form-control lg' name="trackTitle" value={this.state.trackTitle} onChange={this.onSongInputChange} />
                        </div>
                        <button className='btn btn-lg btn-primary btn-block btn-lg' type='submit'>Get Track Lyrics</button>
                     </form>
                  </div>
               )
            }}
         </Consumer>
      )
   }
}
export default Search