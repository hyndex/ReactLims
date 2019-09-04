export const UPDATE_PERMISSION='permission:updatePermission'

export default function UpdatePermission(newPermission)
{
    return{
        type:UPDATE_PERMISSION,
        payload:newPermission
    }
}
    


