import React from 'react'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import {Provider} from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'

const table_header=["id","section","name","description"]


export default class Test extends React.Component{
    table_body=(data)=>{
        console.log(data)
        const id=data.id
        const section=data.section.name
        const name=data.name
        const description=data.description
        return(
            <tr id={id} onClick={this.handleClick(id)}>
                <th scope="row">{id}</th>
                <td>{section}</td>
                <td>{name}</td>
                <td>{description}</td>
            </tr>
        )
    }

    handleClick(id){
        fetch("http://127.0.0.1:8000/lab/Test/"+id, {
        method: 'GET',
        headers: {
          "Content-type":"application/x-www-form-urlencoded",
          'Accept': 'application/json',
          'Authorization' : 'Token 3eda3bbfca53f9d28f51fa591a5ed6ff81e5a78a'
        }
      })
      .then(response => response.json())
      .then(data => console.log(data))
    }
    
    make_table(data){
        var table=[]
        for(var key in data){
            table.push(this.table_body(data[key]))
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

