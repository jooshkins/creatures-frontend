import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Nav, NavLink, Button, Modal, ModalBody, } from 'reactstrap';
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import Routes from './Routes'
import Footer from './Containers/Components/Footer'
import Emoji from './Containers/Components/Emoji'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt, faBars, faInfoCircle, faQrcode, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faSyncAlt, faBars, faInfoCircle, faQrcode, faCaretRight)

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
    document.title = "Creatures"
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
                      <Emoji label="question mark" emoji="❓" minWidth="54px"/> About
                    </h1>
                  </NavLink>
                  {this.state.isAuthenticated
                    ? <Fragment>
                      <NavLink href="/scan">
                      <h1>
                        <Emoji label="scooter" emoji="🛴" /> Ride
                      </h1>
                      </NavLink>
                      <NavLink onClick={this.handleLogout} href="#">
                      <h1>
                        <Emoji label="bye" emoji="👋🏼" /> Logout
                      </h1>
                      </NavLink>
                    </Fragment>
                    : <Fragment>
                      <NavLink href="/login">
                      <h1>
                        <Emoji label="key" emoji="🔑"/> Login
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