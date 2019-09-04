import React from 'react'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import { Provider } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'
import Show from '../Components/Show'

const table_header = ["id", "section", "name", "description"]


export default class Test extends React.Component {
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            description: '',
            section: '',
            fields: [],
        }
        this.handleClick = this.handleClick.bind(this)
    }
    table_body = (data) => {
        console.log(data)
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
        for(var key in this.state.fields){
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
                'Authorization': 'Token 3eda3bbfca53f9d28f51fa591a5ed6ff81e5a78a'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                test: data.test.name,
                test_status: data.test_status,
                description: data.description,
                section: data.section.name,
                fields:data.field_test
            }))
            .then(() => console.log('##########', this.state))
            .then(() => $('#readupdatelist').modal('show'))
    }

    make_table(data) {
        var table = []
        for (var key in data) {
            table.push(this.table_body(data[key]))
        }
        return table
    }
    render() {
        return (
            <Provider store={store}>
                <Show table={this.generate_show_fields()}/>
                <App body={<TableBody handleClick={this.handleClick} header={table_header} body={this.make_table(this.props.data)} />} />
            </Provider>
        )
    }
}

Test.getInitialProps = async function () {
    const res = await fetch('http://127.0.0.1:8000/lab/Test/', {
        method: 'GET',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            'Accept': 'application/json',
            'Authorization': 'Token 3eda3bbfca53f9d28f51fa591a5ed6ff81e5a78a'
        }
    })
    const data = await res.json()
    return {
        data
    }
}

