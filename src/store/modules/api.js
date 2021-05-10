import axios from 'axios';
import { Server } from "miragejs";



//action types
const LOAD = 'api/LOAD';
const LOAD_SUCCESS = 'api/LOAD_SUCCESS';
const LOAD_FAIL = 'api/LOAD_FAIL';

const intialState = {
    data: {},
    error: {}
}

export default function reducer(state = intialState, action = {}) {
    switch(action.type){
        case LOAD:
            return {
                ...state
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case LOAD_FAIL:
            return {
                ...state,
                data: {},
                error: action.payload
            };
        default:
            return state;
    }
}

export function apiCall(payload) {
    console.log(payload, 'called')
    return (dispatch) => {
        dispatch({
            type: LOAD
        });
        axios.post('/api/formSubmit', payload)
            .then((response) => dispatch({
                type: LOAD_SUCCESS,
                payload: response.data
            }))
            .catch((error)=>{
                dispatch({
                    type: LOAD_FAIL,
                    payload: {
                        "status": "error", 
                        "message": "Invalid Subscription request."
                    }
                })
            })
    }
} 


