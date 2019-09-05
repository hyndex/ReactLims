import React from 'react'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import { Provider } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'
import Show from '../Components/Show'
import Cookies from 'universal-cookie';


const table_header = ["id", "section", "name", "description"]


export default class Test extends React.Component {
    constructor() {
        super()
        const cookies = new Cookies();
        const Token = cookies.get('Token')
        this.state = {
            id: '',
            name: '',
            description: '',
            section: '',
            fields: [],
            fields_data: {},
            Token:Token
        }
        this.handleClick = this.handleClick.bind(this)
        // this.componentDidMount = this.componentDidMount.bind(this)
        
    }
    table_body = (data) => {
        const id = data.id
        const section = data.section.name
        const name = data.name
        const description = data.description
        return (
            <tr id={id} onClick={() => this.handleClick(id)}>
                <th scope="row">{id}</th>
                <td>{section}</td>
                <td>{name}</td>
                <td>{description}</td>
            </tr>
        )
    }

    generate_show_fields = () => {
        var table = []
        table.push(<tr><th scope="row">ID</th><td>{this.state.id}</td></tr>)
        table.push(<tr><th scope="row">name</th><td>{this.state.name}</td></tr>)
        table.push(<tr><th scope="row">description</th><td>{this.state.description}</td></tr>)
        table.push(<tr><th scope="row">section</th><td>{this.state.section}</td></tr>)
        for (var key in this.state.fields) {
            table.push(<tr><th scope="row">Field</th><td>{this.state.fields[key].name}</td></tr>)
            table.push(<tr><th scope="row">formula</th><td>{this.state.fields[key].formula}</td></tr>)
            table.push(<tr><th scope="row">measure</th><td>{this.state.fields[key].measure}</td></tr>)
            table.push(<tr><th scope="row">uplimit</th><td>{this.state.fields[key].uplimit}</td></tr>)
            table.push(<tr><th scope="row">downlimit</th><td>{this.state.fields[key].downlimit}</td></tr>)
        }
        return table
    }

    handleClick(id) {
        fetch("http://127.0.0.1:8000/lab/Test/" + id, {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json',
                'Authorization': 'Token '+this.state.Token
            }
        })
            .then(response => response.json())
            // .then(data => console.log('single data',data))
            .then(data => this.setState({
                id: data.id,
                test: data.name,
                test_status: data.test_status,
                description: data.description,
                section: data.section.name,
                fields: data.field_test
            }))
            .then(() => $('#readupdatelist').modal('show'))
    }
    async componentDidMount() {
        await fetch('http://127.0.0.1:8000/lab/Test/', {
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
    render() {

        return (
            <Provider store={store}>
                <Show table={this.generate_show_fields()} />
                <App body={<TableBody handleClick={this.handleClick} header={table_header} body={this.make_table()} />} />
            </Provider>
        )
    }
}

