import React from 'react'

export default class TableBody extends React.Component{
    render(){
        return(
            <table class="table table-hover">
                <thead>
                    <tr>
                    {this.props.header.map((item, i)=>{return(<th scope="col">{item}</th>)})}
                    
                    </tr>
                </thead>
                <tbody>
                    {this.props.body}
                </tbody>
            </table>
        )
    }
}