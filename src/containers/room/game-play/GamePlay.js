import React, {Component, Fragment} from "react";
import {Badge, Col, Row, Table} from "reactstrap";
import AuthenService from "../../../services/AuthenService";

class GamePlay extends Component {

    _renderUserRow(users) {
        const userInfo = AuthenService.get();

        return users.map(
            (u, i) => (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{u.name}</td>
                    {
                        userInfo.is_leader ? (
                            <Fragment>
                                <td><img width={40} src={u.card.image} alt="card image"/></td>
                                <td>{u.card.name}</td>
                            </Fragment>
                        ) : null
                    }
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
                {
                    userCard ? (
                        <div>
                            <h4>Thẻ của bạn</h4>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <img src={userCard.card.image}/>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <h5>{userCard.card.name}</h5>
                                    <p>{userCard.card.description}</p>
                                </Col>
                            </Row>
                        </div>
                    ) : null
                }

                <Table hover striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        {
                            userInfo.is_leader ? (
                                <Fragment>
                                    <th>Ảnh</th>
                                    <th>Thẻ</th>
                                </Fragment>
                            ) : null
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {this._renderUserRow(userWithCards)}
                    </tbody>
                </Table>

            </div>
        )
    }
}

export default GamePlay;
