import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import GamePlay from "./game-play/GamePlay";
import Waiting from "./waiting/Waiting";
import * as roomApi from "../../api/room-api";
import * as SocketService from "../../services/SocketService";

class RoomRoute extends Component {

    state = {
        isPlaying: false,
        userWithCards: []
    };

    async _handleStart() {
        const {room_id} = this.props.match.params;

        try {
            await roomApi.readyRoom({room: room_id});
            const playRoom = await roomApi.playRoom({room: room_id});
            const userWithCards = playRoom.users;

            console.log('userWithCards', userWithCards);

            this.setState({isPlaying: true, userWithCards});
        } catch (err) {
            alert(err.message);
        }
    }

    componentDidMount() {
        const {room_id} = this.props.match.params;

        SocketService.listenStartGame({
            room_id,
            cb: (listUsers) => {
                console.log('listUsers', listUsers);
                this.setState({
                    // userWithCards: listUsers,
                    isPlaying: true
                });
            }
        })
    }

    componentWillUnmount() {
        SocketService.removeListenStartGame();
    }

    render() {
        const {isPlaying, userWithCards} = this.state;
        const {room_id} = this.props.match.params;

        return (
            <Container className='page'>
                <Row className='d-flex justify-content-center'>
                    <Col sm={6}>
                        <Col>
                            <h3>Phòng {room_id}</h3>
                        </Col>

                        <Col>
                            {
                                isPlaying ? (
                                    <GamePlay
                                        userWithCards={userWithCards}
                                    />
                                ) : (
                                    <Waiting
                                        onStart={this._handleStart.bind(this)}
                                        room_id={room_id}
                                    />
                                )
                            }
                        </Col>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default RoomRoute;
