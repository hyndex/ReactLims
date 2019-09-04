import React from 'react'

export default class Show extends React.Component {
    render() {
        return (
            <div className="modal fade readupdatelist" id="readupdatelist" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <table class="table">
                                <tbody>
                                    {this.props.table}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}