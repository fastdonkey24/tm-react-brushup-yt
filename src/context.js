import React from 'react';
import AppKeys from './config/keys';


const Context = React.createContext()

const reducer = (state, action) => {
    switch(action.type){
        case "SEARCH_TRACKS": 
        return {
            ...state,
            track_list : action.payload,
            heading : "Search Results"
        }
        default:
        return state;
    }
}

export class Provider extends React.Component{
    state = {
        track_list : [],
        heading : "Top 10 Tracks",
        dispatch : action => this.setState(state => reducer(state, action))
    }

    componentDidMount(){
        let endpointURL = `${AppKeys.CORS_ENABLER}/${AppKeys.BASE_URL}/${AppKeys.CHARTS_URL}&apikey=${AppKeys.MUSIXMATCH_KEY}` 

        fetch(endpointURL)
        .then( response => response.json() )
        .then( result => {
            this.setState({ track_list : result.message.body.track_list})
        })
    }

    render(){
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>            
        )
    }
}

export const Consumer = Context.Consumer;
