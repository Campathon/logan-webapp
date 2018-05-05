import React, {Component} from 'react';
import {
    Collapse, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import AuthenService from "../../services/AuthenService";

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    _handleLogout() {
        AuthenService.set(null);
    }

    // componentDidMount() {
    //     AuthenService.onChange(this, this.forceUpdate.bind(this));
    // }
    //
    // componentWillUnmount() {
    //     AuthenService.unChange(this);
    // }

    render() {
        const userInfo = AuthenService.get();

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>Logan</NavbarBrand>
                    <Nav navbar className="ml-auto">
                        {
                            userInfo ? (
                                <NavItem>
                                    <NavLink
                                        href="#"
                                        onClick={this._handleLogout.bind(this)}
                                    >Thoát</NavLink>
                                </NavItem>
                            ) : null
                        }
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default Header;
