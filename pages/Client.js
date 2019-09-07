import React from 'react'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import { Provider } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'
import ClientForm from '../Components/ClientForm'
import Show from '../Components/Show'
import Cookies from 'universal-cookie';


const table_header = ["id", "Name", "Phone", "Address"]

export default class Client extends React.Component {
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
            Token: Token,
            put_data: {
                id: '',
                name: '',
                phone: '',
                address: '',
            }
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.Update = this.Update.bind(this)
    }
    Update=()=>{
        const data={
            // id:this.state.put_data.id,
            name:this.state.put_data.name,
            phone:this.state.put_data.phone,
            address:this.state.put_data.address,
        }
        fetch("http://127.0.0.1:8000/lab/Client/" + this.state.id+'/', {
            method: 'PUT',
            body:JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
                'Authorization': 'Token ' + this.state.Token
            }
        })
        .then(response => response.status)
        .then(async (data) => await (data==200)?alert('Successful'):alert('Not Successful'))
        // console.log(JSON.stringify(data))

    }
    edit_form = () => {
        return (
            <div>
                <div className="form-group">
                    <label for="name">name</label>
                    <input type="name" onChange={this.handleChange} className="form-control" name="name" key='name' aria-describedby="name" value={this.state.put_data.name} />
                </div>
                <div className="form-group">
                    <label for="phone">phone</label>
                    <input type="phone" onChange={this.handleChange} className="form-control" name="phone" key='phone' aria-describedby="phone" value={this.state.put_data.phone} />
                </div>
                <div className="form-group">
                    <label for="address">address</label>
                    <input type="address" onChange={this.handleChange} className="form-control" name="address" key='address' aria-describedby="address" value={this.state.put_data.address} />
                </div>
                <button type="button" onClick={this.Update} className="btn btn-primary">Update</button>
            </div>
        )
    }
    table_body = (data) => {
        console.log(data)
        const id = data.id
        const name = data.name
        const phone = data.phone
        const address = data.address
        return (
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
                'Authorization': 'Token '+this.state.Token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                name: data.name,
                phone: data.phone,
                address: data.address,
                put_data: {
                    id: data.id,
                    name: data.name,
                    phone: data.phone,
                    address: data.address
                }
            }))
            .then(() => $('#readupdatelist').modal('show'))
    }
    handleChange(e) {
        const { put_data } = { ...this.state };
        const currentState = put_data;
        const { name, value } = e.target;
        currentState[name] = value;
      
        this.setState({ put_data: currentState })
        
        console.log('PUT STATE=>', this.state.put_data)
    }
    async componentDidMount() {
        await fetch('http://127.0.0.1:8000/lab/Client/', {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json',
                'Authorization': 'Token ' + this.state.Token
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
                <ClientForm />
                <Show table={this.generate_show_fields()} editfrom={this.edit_form()} />
                <App body={<TableBody handleClick={this.handleClick} header={table_header} body={this.make_table()} />} />
            </Provider>
        )
    }
}
