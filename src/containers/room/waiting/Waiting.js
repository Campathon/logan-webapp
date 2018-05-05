import React, {Component} from "react";
import {Col, Form, FormGroup, Input, Label, Button, Table, Badge} from "reactstrap";

class Waiting extends Component {

    render () {
        return (
            <div className=''>
                <Table hover striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>1</th>
                        <td>Mark</td>
                        <td><Badge color="success">Sẵn sàng</Badge></td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <td>Jacob</td>
                        <td><Badge color="success">Sẵn sàng</Badge></td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td>Larry</td>
                        <td><Badge color="success">Sẵn sàng</Badge></td>
                    </tr>
                    </tbody>
                </Table>

                <Button
                    color='primary'
                    onClick={() => this.props.onStart()}
                >Bắt đầu trò chơi</Button>
            </div>
        )
    }
}

export default Waiting;
