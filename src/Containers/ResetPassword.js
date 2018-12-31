import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import LoaderButton from "./Components/LoaderButton"
import SmallHeader from "./Components/SmallHeader"
import Emoji from './Components/Emoji'

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            email: "",
            password: "",
            codeSent: false,
            confirmed: false,
            confirmPassword: "",
            isConfirming: false,
            isSendingCode: false
        };
    }

    validateCodeForm() {
        return this.state.email.length > 5;
    }
        
    validateResetForm() {
    return (
        this.state.code.length > 0 &&
        this.state.password.length > 7 &&
        this.state.password === this.state.confirmPassword
    );
    }

    handleChange = event => {
    this.setState({
        [event.target.id]: event.target.value
        });
    };

    handleSendCodeClick = async event => {
        event.preventDefault();
    
        this.setState({ isSendingCode: true });
    
        try {
          await Auth.forgotPassword(this.state.email);
          this.setState({ codeSent: true });
        } catch (e) {
          alert(e.message);
          this.setState({ isSendingCode: false });
        }
    };

    handleConfirmClick = async event => {
        event.preventDefault();
    
        this.setState({ isConfirming: true });
    
        try {
          await Auth.forgotPasswordSubmit(
            this.state.email,
            this.state.code,
            this.state.password
          );
          this.setState({ confirmed: true });
        } catch (e) {
          alert(e.message);
          this.setState({ isConfirming: false });
        }
    };

    renderRequestCodeForm() {
        return (
          <Form onSubmit={this.handleSendCodeClick}>
            <FormGroup id="email">
              <Label>Email</Label>
              <Input
                autoFocus
                id="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <LoaderButton
              block
              type="submit"
              loadingText="Sending…"
              text="Send Confirmation"
              isLoading={this.state.isSendingCode}
              disabled={!this.validateCodeForm()}
            />
          </Form>
        );
    }

    renderConfirmationForm() {
        return (
          <Form onSubmit={this.handleConfirmClick}>
            <FormGroup id="code">
              <Label>Confirmation Code</Label>
              <Input
                id="code"
                autoFocus
                type="tel"
                value={this.state.code}
                onChange={this.handleChange}
              />
              <div>
                Please check your email ({this.state.email}) for the confirmation
                code.
              </div>
            </FormGroup>
            <hr />
            <FormGroup id="password">
              <Label>New Password</Label>
              <Input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup id="confirmPassword">
              <Label>Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                onChange={this.handleChange}
                value={this.state.confirmPassword}
              />
            </FormGroup>
            <LoaderButton
              block
              type="submit"
              text="Confirm"
              loadingText="Confirm…"
              isLoading={this.state.isConfirming}
              disabled={!this.validateResetForm()}
            />
          </Form>
        );
      }
      
    renderSuccessMessage() {
    return (
        <div>
        <h4><Emoji emoji="🎉"/> Your password has been reset. <Emoji emoji="🎉"/></h4>
        <p>
            <Link to="/login">
            Click here to login with your new credentials.
            </Link>
        </p>
        </div>
    );}

    render() {
    return (
        <div>
            <SmallHeader />
            <Row id="LoginRow">
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                <Card className="shadow-lg border border-danger" color="dark">
                    <CardHeader tag="h3">Reset Password</CardHeader>
                    <CardBody>
                    {!this.state.codeSent
                      ? this.renderRequestCodeForm()
                      : !this.state.confirmed
                      ? this.renderConfirmationForm()
                      : this.renderSuccessMessage()}
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </div>
    );}
}