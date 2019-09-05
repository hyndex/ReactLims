import React from 'react'
import ReactDom from 'react-dom'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import {Provider} from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'
import ClientForm from '../Components/ClientForm'
import Show from '../Components/Show'
import Cookies from 'universal-cookie';


const table_header=["id","Name","Phone","Address"]

export default class Client extends React.Component{
    constructor() {
        super()
        const cookies = new Cookies();
        const Token = cookies.get('Token')
        this.state = {
            id: '',
            name: '',
            phone: '',
            address: '',
            fields_data: {},
            Token:Token
        }
        this.handleClick = this.handleClick.bind(this)
    }
    table_body=(data)=>{
        console.log(data)
        const id=data.id
        const name=data.name
        const phone=data.phone
        const address=data.address
        return(
            <tr id={id} onClick={() => this.handleClick(id)}>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{phone}</td>
                <td>{address}</td>
            </tr>
        )
    }
    generate_show_fields = () => {
        var table = []
        table.push(<tr><th scope="row">ID</th><td>{this.state.id}</td></tr>)
        table.push(<tr><th scope="row">name</th><td>{this.state.name}</td></tr>)
        table.push(<tr><th scope="row">Phone</th><td>{this.state.phone}</td></tr>)
        table.push(<tr><th scope="row">Address</th><td>{this.state.address}</td></tr>)
        return table
    }
    handleClick(id) {
        fetch("http://127.0.0.1:8000/lab/Client/" + id, {
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
                name: data.name,
                phone: data.phone,
                address: data.address
            }))
            .then(() => console.log('##########', this.state))
            .then(() => $('#readupdatelist').modal('show'))
            console.log(this.state)
    }

    async componentDidMount() {
        await fetch('http://127.0.0.1:8000/lab/Client/', {
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
        const body='Welcome to Client'
         return(
            <Provider store={store}>
                <ClientForm/>
                <Show table={this.generate_show_fields()}/>
                <App body={<TableBody handleClick={this.handleClick} header={table_header} body={this.make_table()} />} />
            </Provider> 
        )
    }
}
