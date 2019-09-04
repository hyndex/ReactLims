import {UPDATE_NAV} from '../Actions/NavAction'

export default function NavReducer(state='',{type,payload})
    {
        if(type === UPDATE_NAV){
            return payload.Nav//.newState
        }
        return state
}