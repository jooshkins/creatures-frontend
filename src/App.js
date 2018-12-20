import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Nav, NavLink, Button, Modal, ModalBody, } from 'reactstrap';
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import Routes from './Routes'
import Footer from './Containers/Components/Footer'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt, faBars, faInfoCircle, faQrcode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faSyncAlt, faBars, faInfoCircle, faQrcode)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  async componentDidMount() {
    document.title = process.env.REACT_APP_TITLE
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Container fluid id="body">
          <Row>
            <Col>
              <Button outline color="danger" className="fixed-top m-2" onClick={this.toggle}>
                <FontAwesomeIcon icon="bars" size="lg"/>
              </Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalBody className="modal-txt-bg">
                <Button color="link" className="close" onClick={this.toggle}>
                  <b><span aria-hidden="true">&times;</span></b>
                </Button>
                <Nav vertical >
                  <NavLink href="/" >
                    <h1>
                    <span role="img" aria-label="About">ℹ</span> About
                    </h1>
                  </NavLink>
                  {this.state.isAuthenticated
                    ? <Fragment>
                      <NavLink href="/scan">
                      <h1>
                        <span role="img" aria-label="scooter">🛴</span> Ride
                      </h1>
                      </NavLink>
                      <NavLink onClick={this.handleLogout} href="#">
                      <h1>
                       <span role="img" aria-label="bye">👋🏼</span> Logout
                      </h1>
                      </NavLink>
                    </Fragment>
                    : <Fragment>
                      <NavLink href="/login">
                      <h1>
                      <span role="img" aria-label="key">🗝</span>  Login
                      </h1>
                      </NavLink>
                    </Fragment>
                  }
              </Nav>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
          <Row>
            <Col>
              <Routes childProps={childProps} />
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default withRouter(App);