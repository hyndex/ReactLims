import React from 'react'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import {Provider} from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'
import Show from '../Components/Show'
import Cookies from 'universal-cookie';



const table_header=['Id',"Test",'Test Status']
export default class SampleTest extends React.Component{
    constructor() {
        super()
        const cookies = new Cookies();
        const Token = cookies.get('Token')
        this.state = {
            id: '',
            test: '',
            test_status: '',
            result: [],
            fields_data: {},
            Token:Token
        }
        this.handleClick = this.handleClick.bind(this)
    }
    table_body=(data)=>{
        console.log(data)
        const id=data.id
        const test=data.test.name
        const test_status=data.test_status
        return(
            <tr id={id} onClick={() => this.handleClick(id)}>
                <th scope="row">{id}</th>
                <td>{test}</td>
                <td>{test_status}</td>
            </tr>
        )
    }
    handleClick(id) {
        fetch("http://127.0.0.1:8000/lab/SampleTest/" + id, {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json',
                'Authorization': 'Token 3eda3bbfca53f9d28f51fa591a5ed6ff81e5a78a'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                test: data.test.name,
                test_status: data.test_status,
                result:data.ResultFields_sample_test
            }))
            .then(() => console.log('##########', this.state))
            .then(() => $('#readupdatelist').modal('show'))
    }

    generate_show_fields = () => {
        var table = []
        table.push(<tr><th scope="row">ID</th><td>{this.state.id}</td></tr>)
        table.push(<tr><th scope="row">name</th><td>{this.state.test}</td></tr>)
        table.push(<tr><th scope="row">description</th><td>{this.state.test_status}</td></tr>)
        for(var key in this.state.result){
            table.push(<tr><th scope="row">{this.state.result[key].field.name}</th><td>{this.state.result[key].value}</td></tr>)
        }
        return table
    }

    async componentDidMount() {
        await fetch('http://127.0.0.1:8000/lab/SampleTest/', {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json',
                'Authorization': 'Token '+this.state.Token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                fields_data: data
            }))
    }
    make_table() {
        var table = []
        
        for (var key in this.state.fields_data) {
            table.push(this.table_body(this.state.fields_data[key]))
        }
        return table
    }
    render(){
        const body='Welcome to SampleTest'
         return(
            <Provider store={store}>
                <Show table={this.generate_show_fields()}/>
                <App body={<TableBody handleClick={this.handleClick} header={table_header} body={this.make_table()} />} />
            </Provider> 
        )
    }
}
