import React, {Component, Fragment} from "react";
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Table,
    Badge,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle, CardText, Row
} from "reactstrap";
import * as roomApi from "../../../api/room-api";
import * as cardApi from "../../../api/card-api";
import AuthenService from "../../../services/AuthenService";
import * as SocketService from "../../../services/SocketService";

class Waiting extends Component {

    state = {
        users: [],
        cards: [],
        canSelectCard: false
    };

    async componentDidMount() {
        const {room_id} = this.props;

        try {
            const users = await roomApi.getUsers({room: room_id});
            const cards = await cardApi.getCards();
            this.setState({users, cards});

            SocketService.listenNewUserJoin(
                {
                    room_id,
                    cb: (newUser) => {
                        console.log('newUser', newUser);
                        this._handleAddWatingUser(newUser);
                    }
                }
            )
        } catch (err) {
            alert(err.message);
        }
    }

    componentWillUnmount() {
        SocketService.removeListenNewUserJoin();
    }

    _handleAddWatingUser(newUser) {
        const {users} = this.state;
        this.setState({users: users.concat([newUser])});
    }

    _activeSelectCard() {
        this.setState({canSelectCard: true});
    }

    _renderUserRow(users) {
        return users.map(
            (u, i) => (
                <tr>
                    <th>{i + 1}</th>
                    <td>{u.name}</td>
                    <td><Badge color="success">Sẵn sàng</Badge></td>
                </tr>
            )
        );
    }

    _renderCards(cards) {
        return cards.map(
            (c, i) => (
                <Col sm={6}>
                    <Card className='logan-card'>
                        <CardImg top width="100%" src={c.image} alt="card"/>
                        <CardBody>
                            <CardTitle>{c.name}</CardTitle>
                            <Form inline>
                                <FormGroup>
                                    <Input
                                        type='number'
                                        placeholder='Số lượng'
                                    />
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            )
        );
    }

    render() {
        const {users, cards, canSelectCard} = this.state;

        const userInfo = AuthenService.get();

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
                    {this._renderUserRow(users)}
                    </tbody>
                </Table>

                {
                    userInfo.is_leader ?
                        (
                            canSelectCard ? (
                                <Fragment>
                                    <Row>{this._renderCards(cards)}</Row>
                                    <Button
                                        color='primary'
                                        onClick={() => this.props.onStart()}
                                    >Bắt đầu trò chơi</Button>
                                </Fragment>
                            ) : <Button
                                color='success'
                                onClick={this._activeSelectCard.bind(this)}
                            >Chọn Thẻ</Button>
                        ) : null
                }
            </div>
        )
    }
}

export default Waiting;
