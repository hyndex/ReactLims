import React from 'react'
import React from 'react'
import ReactDom from 'react-dom'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import {Provider} from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'


const table_header=['Id',"Test",'Test Status']
const table_body=(data)=>{
    console.log(data)
    const id=data.id
    const test=data.test.name
    const test_status=data.test_status
    return(
        <tr>
            <th scope="row">{id}</th>
            <td>{test}</td>
            <td>{test_status}</td>
        </tr>
    )
}
export default class SampleTest extends React.Component{
    make_table(data){
        var table=[]
        for(var key in data){
            table.push(table_body(data[key]))
        }
        return table
    }
    render(){
        const body='Welcome to SampleTest'
         return(
            <Provider store={store}>
                <App body={<TableBody header={table_header} body={this.make_table(this.props.data)}/>}/>
            </Provider> 
        )
    }
}
SampleTest.getInitialProps=async function(){
    const res=await fetch('http://127.0.0.1:8000/lab/SampleTest/', {
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