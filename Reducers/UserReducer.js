import {UPDATE_USER} from '../Actions/UserAction'

export default function UserReducer(state='',{type,payload})
    {
        if(type == UPDATE_USER){
            return payload.Token
        }
        return state
}
