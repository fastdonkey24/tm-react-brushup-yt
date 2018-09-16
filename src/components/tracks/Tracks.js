import React from 'react';
import { Consumer } from '../../context';
import Spinner from '../layouts/Spinner'
import Song from '../tracks/Song'

class Tracks extends React.Component {
    render(){
        return(
            <Consumer>
                {
                    value => {
                        const { track_list, heading} = value;
                        if (track_list === 'undefined' || track_list.length ===0){
                            return (
                                <Spinner />
                            )
                        } else {
                           return (
										<React.Fragment>
											<h3 className='text-center mb-5 mt-5'>{heading} </h3>
                              	<div className='row'>
                                    
												{track_list.map(item => (
													<Song key={item.track.track_id} song={item.track} />
												))}
                                    
                              	</div>
										</React.Fragment>
									)
                        }
                    }
                }
            </Consumer>
        )
    }
}

export default Tracks