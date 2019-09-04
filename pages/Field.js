import React from 'react'
import ReactDom from 'react-dom'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import {Provider} from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'

const table_header=['id','test_id','name','formula','measure','uplimit','downlimit']
const table_body=(id,row1,row2,row3)=>{
    return(
        <tr>
            <th scope="row">{id}</th>
            <td>{row1}</td>
            <td>{row2}</td>
            <td>{row3}</td>
        </tr>
    )
}
export default class Section extends React.Component{
    render(){
        const body='Welcome to Field'
         return(
            <Provider store={store}>
                <App body={<TableBody header={table_header} body={table_body(1,'qq','qq','qqq')}/>}/>  
            </Provider>
        )
    }
}