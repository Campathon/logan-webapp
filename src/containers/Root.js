import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import WelcomeRoute from "./welcome/WelcomeRoute";
import RoomRoute from "./room/RoomRoute";
import Header from "../commons/header/Header";
import AuthenService from "../services/AuthenService";
import NotFoundRoute from "../commons/404/NotFoundRoute";

class Root extends Component {

    componentDidMount() {
        AuthenService.onChange(this, this.forceUpdate.bind(this));
    }

    componentWillUnmount() {
        AuthenService.unChange(this);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>

                    <Switch>
                        <Route exact path="/" component={requireUnAuthen(WelcomeRoute)}/>
                        <Route path="/room/:room_id" component={requireAuthen(RoomRoute)}/>
                        <Route exact path='/404' component={NotFoundRoute}/>

                        <Redirect to="/404"/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const requireAuthen = (component) => (props) => {
    const userInfo = AuthenService.get();
    return userInfo ? React.createElement(component, props) : <Redirect to='/'/>
};

const requireUnAuthen = (component) => (props) => {
    const userInfo = AuthenService.get();
    return !userInfo ? React.createElement(component, props) : <Redirect to={`/room/${userInfo.room_id}`}/>
};

export default Root;
