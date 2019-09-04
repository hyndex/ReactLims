import React from 'react'
import ReactDom from 'react-dom'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import {Provider} from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'

const table_header=["id","section","name","description"]

const table_body=(data)=>{
    console.log(data)
    const id=data.id
    const section=data.section.name
    const name=data.name
    const description=data.description
    return(
        <tr>
            <th scope="row">{id}</th>
            <td>{section}</td>
            <td>{name}</td>
            <td>{description}</td>
        </tr>
    )
}
export default class Test extends React.Component{
    make_table(data){
        var table=[]
        for(var key in data){
            table.push(table_body(data[key]))
        }
        return table
    }
    render(){
        const body='Welcome to Test'
         return(
            <Provider store={store}>
                <App body={<TableBody header={table_header} body={this.make_table(this.props.data)}/>}/>  
            </Provider> 
        )
    }
}

Test.getInitialProps=async function(){
    const res=await fetch('http://127.0.0.1:8000/lab/Test/', {
        method: 'GET',
        headers: {
          "Content-type":"application/x-www-form-urlencoded",
          'Accept': 'application/json',
          'Authorization' : 'Token 3eda3bbfca53f9d28f51fa591a5ed6ff81e5a78a'
        }
      })
    const data=await res.json()
    return {
        data
    }
}