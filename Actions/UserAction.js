export const UPDATE_USER='ChangeToken'

export default function UpdateUser(newUser){
    return {
        type:UPDATE_USER,
        payload:{
            Token:newUser
        }
    }
}

