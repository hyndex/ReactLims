import React from 'react'

export default class ClientForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      Address: "",
      company: "",
      phone: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }
  postData() {
    fetch('http://127.0.0.1:8000/lab/Client/', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        "Content-type": "application/json;charset=utf-8",
        'Accept': 'application/json',
      }
    }).then(async (res) => {
      try {
        const data = await res.json()
        console.log(data.token)
      } catch (error) {
        console.error(error)
      }
    }).catch(err => {
      console.error(err)
    })
  }
  render() {
    return (
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form action='#'>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="name">Name</label>
                    <input type="text" id='name' name='name' className="form-control" placeholder="text" onChange={this.handleChange} />
                  </div>
                  <div className="form-group col-md-6">
                    <label for="phone">Phone</label>
                    <input type="phone" className="form-control" id="phone" name="phone" placeholder="phone" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label for="inputAddress">Address</label>
                  <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label for="Company">Company</label>
                  <input type="text" className="form-control" id="company" name="company" placeholder="Company" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                    <label className="form-check-label" for="gridCheck">
                      Agree
                        </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}