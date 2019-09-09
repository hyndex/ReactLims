import React from 'react'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import { Provider } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'
// import SampleForm from '../Components/SampleForm'
import Show from '../Components/Show'
import Post from '../Components/Post'
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
            Token: Token,
            put_data: {
                name: '',
                client: ''
            },
            post_data: {
                name: '',
                client: ''
            }
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePostChange = this.handlePostChange.bind(this)
        this.Update = this.Update.bind(this)
        this.Delete = this.Delete.bind(this)
    }
    Update = (e) => {
        // e.preventDefault()
        const data = {
            id: this.state.id,
            name: this.state.put_data.name,
            client_id: this.state.put_data.client,
        }
        console.log(JSON.stringify(data))
        fetch("http://127.0.0.1:8000/lab/Sample/" + this.state.id+'/', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
                'Authorization': 'Token ' + this.state.Token
            }
        })
            .then(response => response.status)
            .then(async (data) => await (data == 200) ? alert('Successful') : alert('You can not update a sample'))
    }
    Create = () => {
        const data = {
            name: this.state.post_data.name,
            client_id: this.state.post_data.client,
        }
        console.log(JSON.stringify(data))
        fetch("http://127.0.0.1:8000/lab/Sample/" , {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
                'Authorization': 'Token ' + this.state.Token
            }
        })
            .then(response => response.status)
            .then(async (data) => await (data == 200) ? alert('Successful') : alert('Not Successful'))
    }
    handleChange(e) {
        const { put_data } = { ...this.state };
        const currentState = put_data;
        const { name, value } = e.target;
        currentState[name] = value;

        this.setState({ put_data: currentState })

        console.log('PUT STATE=>', this.state.put_data)
    }
    handlePostChange(e) {
        console.log('e.targets.name=>',e.target.name)
        console.log('e.targets.value=>',e.target.value)
        const { post_data } = { ...this.state };
        const currentState = post_data;
        const { name, value } = e.target;
        currentState[name] = value;

        this.setState({ post_data: currentState })

        console.log('POST STATE=>', this.state.post_data)
    }
    edit_form = () => {
        return (
            <div>
                <button type="submit" onClick={this.Delete} key={this.state.id} id={this.state.id} className="btn btn-danger my-5">Delete</button>
                <div className="form-group">
                    <label className='font-weight-bold' for="name">name</label>
                    <input type="name" onChange={this.handleChange} className="form-control" id="name" name="name" key='name' aria-describedby="name" value={this.state.put_data.name} />
                </div>
                <div className="form-group">
                    <label className='font-weight-bold' for="client">client id</label>
                    <input type="client" onChange={this.handleChange} className="form-control" id="client" name="client" key='client' aria-describedby="client" value={this.state.put_data.client} />
                </div>
                <button type="submit" onClick={this.Update} className="btn btn-primary">Update</button>
            </div>
        )
    }
    post_form = () => {
        return (
            <div>
                <div className="form-group col-md-6">
                    <label for="SampleName">Sample Name</label>
                    <input type="text" id='samplename' onChange={this.handlePostChange}  id="name" name="name" className="form-control" id="text" placeholder="Sample Name" />
                </div>
                <div className="form-group col-md-6">
                    <label for="ClientID">Client ID</label>
                    <input type="text" className="form-control" onChange={this.handlePostChange} id="client" name="client" placeholder="Client ID" />
                </div>
                <button type="submit" onClick={this.Create} className="btn btn-primary">Create</button>
            </div>
        )
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
                'Authorization': 'Token ' + this.state.Token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                client: data.client.name,
                name: data.name,
                sampletest: data.SampleTest_sample,
                put_data: {
                    name: data.name,
                    client: data.client.id
                }
            }))
            .then(() => console.log('##########', this.state))
            .then(() => $('#readupdatelist').modal('show'))
    }
    Delete(e) {
        fetch("http://127.0.0.1:8000/lab/Sample/" + e.target.id, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
                'Authorization': 'Token ' + this.state.Token
            }
        })
            .then(response => response.status)
            .then(async (data) => await (data == 204) ? alert('Successful') : alert('Not Successful'))
    }
    async componentDidMount() {
        await fetch('http://127.0.0.1:8000/lab/Sample/', {
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
    generate_show_fields = () => {
        var table = []
        table.push(<tr><th scope="row">ID</th><td>{this.state.id}</td></tr>)
        table.push(<tr><th scope="row">client</th><td>{this.state.client}</td></tr>)
        table.push(<tr><th scope="row">name</th><td>{this.state.name}</td></tr>)
        for (var key in this.state.sampletest) {
            table.push(<tr><th scope="row">{this.state.sampletest[key].test.name}</th><td>{this.state.sampletest[key].id}</td><td>{this.state.sampletest[key].test_status}</td></tr>)
        }
        return table
    }


    render() {
        return (
            <Provider store={store}>
                <Show table={this.generate_show_fields()} editfrom={this.edit_form()} />
                <Post postform={this.post_form()} />
                <App body={<TableBody handleClick={this.handleClick} header={table_header} body={this.make_table()} />} />
            </Provider>
        )
    }
}
