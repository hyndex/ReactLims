export const UPDATE_PERMISSION='ChangePermission'

export default function UpdatePermission(newPermission)
{
    return{
        type:UPDATE_PERMISSION,
        payload:newPermission
    }
}
    


