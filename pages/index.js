import React from 'react'
import ReactDom from 'react-dom'
import App from '../Components/App'
import {withRouter} from 'next/router'
import store from '../Reducers/Reducer'
import {Provider} from 'react-redux'
import TableBody from '../Components/Table'

import fetch from 'isomorphic-unfetch'

const table_body=(data)=>{
    const id=data.id
    const title=data.title
    const userid=data.userId
    return(
        <tr>
            <th scope="row">{id}</th>
            <td>{title}</td>
            <td>{userid}</td>
        </tr>
    )
}
const table_header=['id','title','userid']

class Index extends React.Component{

    make_table(data){
        var table=[]
        console.log(table_body(data[1]))

        for(var key in data){
            table.push(table_body(data[key]))
        }
        return table
    }

    render(){        
        this.make_table(this.props.data)
        // console.log(this.props.data)
        return(
            <Provider store={store}>
                <App body={<TableBody header={table_header} body={this.make_table(this.props.data)}/>}/>  
            </Provider> 
        )
    }
}

Index.getInitialProps=async function(){
    const res=await fetch('http://jsonplaceholder.typicode.com/todos', {
        method: 'GET',
        headers: {
          "Content-type":"application/x-www-form-urlencoded",
          'Accept': 'application/json',
          'Token' : '3eda3bbfca53f9d28f51fa591a5ed6ff81e5a78a'
        }
      })
    const data=await res.json()
    return {
        data
    }
}

export default Index
