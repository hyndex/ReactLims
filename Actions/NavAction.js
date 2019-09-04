export const UPDATE_NAV='nav:updateNav'

export default function UpdateNav(newNav){
    return {
        type:UPDATE_NAV,
        payload:{
            Nav:newNav
        }
    }
}