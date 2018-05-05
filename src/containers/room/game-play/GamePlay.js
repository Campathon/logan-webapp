import React, {Component} from "react";
import {Badge, Col, Table} from "reactstrap";
import AuthenService from "../../../services/AuthenService";

class GamePlay extends Component {

    _renderUserRow(users) {
        return users.map(
            (u, i) => (
                <tr>
                    <th>{i + 1}</th>
                    <td>{u.name}</td>
                </tr>
            )
        );
    }

    render() {
        const {userWithCards} = this.props;
        const userInfo = AuthenService.get();
        const userCard = userWithCards.find(
            u => u.name === userInfo.name
        );

        return (
            <div className=''>
                <Table hover striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this._renderUserRow(userWithCards)}
                    </tbody>
                </Table>

                {
                    userCard ? (
                        <div>
                            <h4>Thẻ của bạn</h4>
                            <img src={'../image/soi.png'}/>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}

export default GamePlay;
