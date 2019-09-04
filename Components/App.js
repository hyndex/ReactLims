import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Header from './Header'

class App extends React.Component{
    render(){
        return(
                <div>
                    <Header/>
                    <body>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <Navbar/>
                                </div>
                            </div>
                            <div className="row my-3">
                                <Sidebar/>
                                <div className=" row card card-body mx-4">
                                <div id='Body'>
                                <button type="button" class="btn btn-primary my-2" data-toggle="modal" data-target="#exampleModal">
                                Create
                                </button>
                                    {this.props.body}
                                </div>
                                <div onClick={this.OnUpdateUser}>update user
                                {this.props.user}
                                </div>
                                </div>
                            </div>
                        </div>
                            
                        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
                        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
                    </body>
                </div>
        )
    }
}
export default App
