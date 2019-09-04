import React from 'react'
import ReactDom from 'react-dom'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import { Provider } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'
import SampleForm from '../Components/SampleForm'



const table_header = ["Sample id", "client", "name"]
const table_body = (data) => {
    console.log(data)
    const id = data.id
    const name = data.name
    const client = data.client.name
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{client}</td>
        </tr>
    )
}
export default class Sample extends React.Component {
    make_table(data) {
        var table = []
        for (var key in data) {
            table.push(table_body(data[key]))
        }
        return table
    }
    render() {
        const body = 'Welcome to Sample'
        return (
            <Provider store={store}>
                <SampleForm />
                <App body={<TableBody header={table_header} body={this.make_table(this.props.data)} />} />
            </Provider>
        )
    }
}

Sample.getInitialProps = async function () {
    const res = await fetch('http://127.0.0.1:8000/lab/Sample/', {
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
