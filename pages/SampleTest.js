import React from 'react'
import App from '../Components/App'
import store from '../Reducers/Reducer'
import { Provider } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import TableBody from '../Components/Table'
import Show from '../Components/Show'
import Cookies from 'universal-cookie';
import Post from '../Components/Post'



const table_header = ['Id', "Test", 'Test Status']
export default class SampleTest extends React.Component {
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
            Token: Token,
            put_data: {
                id: '',
                test_status: '',
                fields_data: {}
            },
            post_data: {
                sample_id: '',
                test_id: '',
            }
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePostChange = this.handlePostChange.bind(this)
        this.Update = this.Update.bind(this)
        this.Delete = this.Delete.bind(this)
    }

    Update = () => {
        const data = {
            id: this.state.put_data.id,
            test_status: this.state.put_data.test_status,
            ResultFields_sample_test: this.state.put_data.fields_data,
        }
        fetch("http://127.0.0.1:8000/lab/SampleTest/" + id, {
            method: 'PUT',
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
    Create = () => {
        const data = {
            sample_id: this.state.post_data.sample_id,
            test_id: this.state.post_data.test_id,
            ResultFields_sample_test: [],
        }
        console.log(JSON.stringify(data))
        fetch("http://127.0.0.1:8000/lab/SampleTest/", {
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
    Delete(e) {
        fetch("http://127.0.0.1:8000/lab/SampleTest/" + e.target.id, {
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
    table_body = (data) => {
        console.log(data)
        const id = data.id
        const test = data.test.name
        const test_status = data.test_status
        return (
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
                'Authorization': 'Token ' + this.state.Token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                test: data.test.name,
                test_status: data.test_status,
                result: data.ResultFields_sample_test,
                put_data: {
                    id: data.id,
                    test_status: data.test_status,
                    fields_data: data.ResultFields_sample_test
                }
            }))
            .then(() => console.log('##########', this.state))
            .then(() => $('#readupdatelist').modal('show'))
    }

    generate_show_fields = () => {
        var table = []
        table.push(<tr><th scope="row">ID</th><td>{this.state.id}</td></tr>)
        table.push(<tr><th scope="row">name</th><td>{this.state.test}</td></tr>)
        table.push(<tr><th scope="row">description</th><td>{this.state.test_status}</td></tr>)
        for (var key in this.state.result) {
            table.push(<tr><th scope="row">{this.state.result[key].field.name}</th><td>{this.state.result[key].value}</td></tr>)
        }
        return table
    }
    //need to make handle change completely
    handleChange(event) {
        if (event.target.name == 'test_status') {

            const { put_data } = { ...this.state };
            const currentState = put_data;
            const { name, value } = event.target;
            currentState[name] = value;
            this.setState({ put_data: currentState })
        }
        else {
            const { put_data } = { ...this.state };
            const currentState = put_data;
            currentState.fields_data[event.target.id][event.target.name] = event.target.value;
            this.setState({ put_data: currentState })
        }
        console.log('PUT DATA=> ', this.state.put_data)
    }
    handlePostChange(e) {
        console.log('e.targets.name=>', e.target.name)
        console.log('e.targets.value=>', e.target.value)
        const { post_data } = { ...this.state };
        const currentState = post_data;
        const { name, value } = e.target;
        currentState[name] = value;

        this.setState({ post_data: currentState })

        console.log('POST STATE=>', this.state.post_data)
    }

    edit_fields = () => {
        var table = []
        table.push(
            <button type="submit" onClick={this.Delete} key={this.state.id} id={this.state.id} className="btn btn-danger my-5">Delete</button>
        )
        table.push(
            <div className="form-group">
                <label className='font-weight-bold' for="name">test_status</label>
                <input type="text" onChange={this.handleChange} className="form-control" name="test_status" key='test_status' aria-describedby="test_status" value={this.state.put_data.test_status} />
            </div>
        )
        for (var key in this.state.put_data.fields_data) {
            //this.state.put_data.fields_data[key].field.name
            table.push(
                //id desabled
                <div class="alert alert-primary mt-5" role="alert">
                    {this.state.put_data.fields_data[key].field.name}</div>
            )
            table.push(
                //id desabled
                <div className="form-group">
                    <label className='font-weight-bold' for="ID">id</label>
                    <input type="text" onChange={this.handleChange} className="form-control" name="id" id={key} key={key} aria-describedby="value" value={this.state.put_data.fields_data[key].id} readOnly />
                </div>
            )
            table.push(
                //value
                <div className="form-group">
                    <label className='font-weight-bold' for="value">value</label>
                    <input type="text" onChange={this.handleChange} className="form-control" name="value" id={key} key={key} aria-describedby="value" placeholder={this.state.put_data.fields_data[key].value} />
                </div>
            )
            table.push(
                //reason
                <div className="form-group">
                    <label className='font-weight-bold' for="reason">reason</label>
                    <input type="text" onChange={this.handleChange} className="form-control" name="reason" id={key} key={key} aria-describedby="reason" placeholder={this.state.put_data.fields_data[key].reason} />
                </div>
            )
            table.push(
                //note
                <div className="form-group">
                    <label className='font-weight-bold' for="note">note</label>
                    <input type="text" onChange={this.handleChange} className="form-control" id="note" id={key} key={key} aria-describedby="note" value={this.state.put_data.fields_data[key].note} />
                </div>
            )
        }
        table.push(<button type="submit" onClick={this.Update} className="btn btn-primary">Update</button>)
        return table
    }
    post_form = () => {
        return (
            <div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="Section">Sample id</label>
                        <input type="text" id='sample' onChange={this.handlePostChange} id="sample_id" name="sample_id" className="form-control" placeholder="sample" />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="Description">Test Id</label>
                        <input type="text" className="form-control" onChange={this.handlePostChange} id="test_id" name="test_id" placeholder="test" />
                    </div>
                </div>
                <button type="submit" onClick={this.Create} className="btn btn-primary">Create</button>
            </div>
        )
    }
    async componentDidMount() {
        await fetch('http://127.0.0.1:8000/lab/SampleTest/', {
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
        const body = 'Welcome to SampleTest'
        return (
            <Provider store={store}>
                <Show table={this.generate_show_fields()} editfrom={this.edit_fields()} />
                <Post postform={this.post_form()} />
                <App body={<TableBody handleClick={this.handleClick} header={table_header} body={this.make_table()} />} />
            </Provider>
        )
    }
}
