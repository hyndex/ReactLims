import React from 'react'
import Link from 'next/link'
import {withRouter} from 'next/router';
import store from '../Reducers/Reducer'
import UpdateNav from '../Actions/NavAction'



export default class Sidebar extends React.Component{
    constructor()
    {
        super()
        var test_options=[
            ['SampleTest','./SampleTest',true],
            ['Sample','./Sample',true],
            ['Client','./Client',true],
            // ['CreateUser','./CreateUser',true],
            ['Section','./Section',true],
            ['Test','./Test',true],
            // ['Field','./Field',true],
            // ['User','./User',true],
            // ['ProfileRole','./ProfileRole',true],
            // ['Role','./Role',true],
            // ['RolePermission','./RolePermission',true]
            
        ]
        
        this.state={
            options:test_options,
            current:store.getState().nav.payload.Nav
        }
    }

    Clicked(arr){
        // console.log('clicked')
        console.log(arr)
        store.dispatch(UpdateNav(arr))
    }
    
    render(){
        var option_table=[]
        for (var arr in this.state.options) {
            const field = this.state.options[arr][0]
            const option_link = this.state.options[arr][1]
            const view = this.state.options[arr][2]
            const index= arr
            var active=''
            if (arr==this.state.current){
                active='table-active'
            }
            
            if(view){
                option_table.push(
                    <Link href={option_link} key={arr}>
                    <tr className={active} key={arr} onClick={()=>this.Clicked(index)}>
                        <td>
                           {field}
                        </td>
                    </tr>
                    </Link>
                )
            }
            

        }
        return(
            <div className="col-2 my-4">
                <table className="table table-hover">
                <tbody>
                    {option_table}
                </tbody>
                </table>
            </div>
        )
    }
}