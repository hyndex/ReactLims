import React from 'react'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import { Provider } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'
import SampleForm from '../Components/SampleForm'
import Show from '../Components/Show'
import Cookies from 'universal-cookie';




const table_header = ["Sample id", "client", "name"]

export default class Sample extends React.Component {
    constructor() {
        super()
        const cookies = new Cookies();
        const Token = cookies.get('Token')
        this.state = {
            id: '',
            name: '',
            client: '',
            sampletest: [],
            fields_data: {},
            Token:Token
        }
        this.handleClick = this.handleClick.bind(this)
    }
    table_body = (data) => {
        console.log(data)
        const id = data.id
        const name = data.name
        const client = data.client.name
        return (
            <tr onClick={() => this.handleClick(id)}>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{client}</td>
            </tr>
        )
    }
    handleClick(id) {
        fetch("http://127.0.0.1:8000/lab/Sample/" + id, {
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
                client: data.client.name,
                name: data.name,
                sampletest:data.SampleTest_sample
            }))
            .then(() => console.log('##########', this.state))
            .then(() => $('#readupdatelist').modal('show'))
    }
    async componentDidMount() {
        await fetch('http://127.0.0.1:8000/lab/Sample/', {
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
    generate_show_fields = () => {
        var table = []
        table.push(<tr><th scope="row">ID</th><td>{this.state.id}</td></tr>)
        table.push(<tr><th scope="row">client</th><td>{this.state.client}</td></tr>)
        table.push(<tr><th scope="row">name</th><td>{this.state.name}</td></tr>)
        for(var key in this.state.sampletest){
            table.push(<tr><th scope="row">{this.state.sampletest[key].test.name}</th><td>{this.state.sampletest[key].id}</td><td>{this.state.sampletest[key].test_status}</td></tr>)
        }
        return table
    }

    
    render() {
        const body = 'Welcome to Sample'
        return (
            <Provider store={store}>
                <SampleForm/>
                <Show table={this.generate_show_fields()}/>
                <App body={<TableBody handleClick={this.handleClick} header={table_header} body={this.make_table()} />} />
            </Provider>
        )
    }
}
