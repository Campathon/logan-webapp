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
    CardSubtitle, CardText, Row, Popover, PopoverHeader, PopoverBody
} from "reactstrap";
import * as roomApi from "../../../api/room-api";
import * as cardApi from "../../../api/card-api";
import AuthenService from "../../../services/AuthenService";
import * as SocketService from "../../../services/SocketService";

class Waiting extends Component {

    state = {
        users: [],
        cards: [],
        selectedCards: [],
        canSelectCard: false
    };

    async componentDidMount() {
        const {room_id} = this.props;

        try {
            const users = await roomApi.getUsers({room: room_id});
            const cards = await cardApi.getCards();
            const selectedCards = cards.map(
                c => ({id: c._id, total: 0})
            );

            this.setState({users, cards, selectedCards});

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

    _handleCardTotalChange(card_id, event) {
        const value = event.target.value;
        const {selectedCards} = this.state;

        this.setState({
            selectedCards: selectedCards.map(
                (c, i) => ((c.id === card_id) ? {...c, total: parseInt(value || 0)} : c)
            )
        });

    }

    _renderUserRow(users) {
        return users.map(
            (u, i) => (
                <tr key={u.name}>
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
                <Col sm={6} key={c.name}>
                    <Card className='logan-card'>
                        <CardImg top width="100%" src={c.image} alt="card"/>
                        <CardBody>
                            <CardTitle>
                                {c.name}
                                {/*<Popover placement="bottom" isOpen={this.state} target="Popover1" toggle={this.toggle}>*/}
                                    {/*<PopoverHeader>Popover Title</PopoverHeader>*/}
                                    {/*<PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>*/}
                                {/*</Popover>*/}
                            </CardTitle>
                            <Form inline>
                                <FormGroup>
                                    <Input
                                        type='number'
                                        placeholder='Số lượng'
                                        onChange={(event) => this._handleCardTotalChange(c._id, event)}
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
        const {users, cards, canSelectCard, selectedCards} = this.state;

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
                                        onClick={() => this.props.onStart(selectedCards)}
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
