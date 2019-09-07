import {UPDATE_USER} from '../Actions/UserAction'

// export default function UserReducer(state='',{type,payload})
//     {
//         if(type == UPDATE_USER){
//             return payload.Token
//         }
//         return state
// }

export default function UserReducer(state='',{type,payload})
    {
        if(type === UPDATE_USER){
            return {
                type:UPDATE_USER,
                payload:{
                    Token:payload.Token
                }
            }//payload.Nav//.newState
        }
        return state
}