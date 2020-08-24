
import {SET_PRODUCT} from '../actions/products';
const initialState ={
    availableProducts:[],
    userProducts:[]
}

export default (state=initialState,action)=>{
    switch(action.type){
        case SET_PRODUCT:return {
            ...state,availableProducts:action.payload,
            userProducts:action.payload
        }
    }
    return state;
};