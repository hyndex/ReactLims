import {UPDATE_PERMISSION} from '../Actions/PermissionAction'


export default function PermisssionReducer(state='',{type,payload})
    {
        if(type === UPDATE_PERMISSION){
            return payload
        }
        return state
}