import {UPDATE_PERMISSION} from '../Actions/PermissionAction'


// export default function PermisssionReducer(state='',{type,payload})
//     {
//         if(type === UPDATE_PERMISSION){
//             return payload
//         }
//         return state
// }

export default function UserReducer(state='',{type,payload})
    {
        if(type === UPDATE_PERMISSION){
            return {
                type:UPDATE_PERMISSION,
                payload:{
                    payload
                }
            }//payload.Nav//.newState
        }
        return state
}