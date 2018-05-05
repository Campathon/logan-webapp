import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import GamePlay from "./game-play/GamePlay";
import Waiting from "./waiting/Waiting";

class RoomRoute extends Component {

    state = {
        isPlaying: false
    };

    _handleStart() {
        this.setState({isPlaying: true});
    }

    render () {
        const {isPlaying} = this.state;
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
                                    <GamePlay />
                                ): (
                                    <Waiting
                                        onStart={this._handleStart.bind(this)}
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
