import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Card, CardBody, CardHeader, CardFooter, Button} from "reactstrap";
import LoaderButton from "./Components/LoaderButton";
import { Auth } from "aws-amplify";
import SmallHeader from "./Components/SmallHeader"

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            agree: false,
            confirmPassword: "",
            confirmationCode: "",
            newUser: null
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword &&
            this.state.agree === true
        );
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = event => {
        event.target.id === "agree" 
        ? this.setState({agree: !this.state.agree}) 
        : this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password
            });
            this.setState({
                newUser
            });
        } catch (e) {
            alert(e.message);
        }

        this.setState({ isLoading: false });
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            await Auth.signIn(this.state.email, this.state.password);

            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }

    renderConfirmationForm() {
        return (
            <Row>
                <SmallHeader />
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Form onSubmit={this.handleConfirmationSubmit}>
                    <Card>
                        <CardHeader tag="h3">
                            Confirmation Code
                        </CardHeader>
                        <CardBody>
                            <FormGroup id="confirmationCode">
                                <Label  for="confirmationCode">Confirmation Code</Label>
                                <Input
                                    id="confirmationCode"
                                    autoFocus
                                    type="tel"
                                    value={this.state.confirmationCode}
                                    onChange={this.handleChange}
                                />
                                <div>Please check your email for the code.</div>
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <LoaderButton
                                block
                                bsSize="large"
                                disabled={!this.validateConfirmationForm()}
                                type="submit"
                                isLoading={this.state.isLoading}
                                text="Verify"
                                loadingText="Verifying…"
                            />
                        </CardFooter>
                    </Card>
                    </Form>
                </Col>
            </Row>
        );
    }

    renderForm() {
        return (
            <div>
                <SmallHeader />
                <Row className="mb-3">
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Button href="/login">Already have an account?</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 4, offset: 4 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Card className="shadow-lg border border-danger" color="dark">
                                <CardHeader tag="h3">Sign Up</CardHeader>
                                <CardBody>
                                    <FormGroup id="email">
                                    <Label>Email</Label>
                                    <Input
                                        id="email"
                                        autoFocus
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                    </FormGroup>
                                    <FormGroup id="password">
                                        <Label>Password</Label>
                                        <Input
                                            id="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            type="password"
                                        />
                                    </FormGroup>
                                    <FormGroup id="confirmPassword">
                                        <Label>Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={this.handleChange}
                                            type="password"
                                        />
                                    </FormGroup>
                                    <Label check className="mb-3">
                                        <Input type="checkbox" id="agree" onChange={this.handleChange}/>{' '}
                                        I agree to the <a href="/terms">terms of service</a> and <a href="/privacy">privacy policy</a>
                                    </Label>
                                </CardBody>
                                <CardFooter>
                                    <LoaderButton
                                    block
                                    disabled={!this.validateForm()}
                                    type="submit"
                                    isLoading={this.state.isLoading}
                                    text="Signup"
                                    loadingText="Signing up…"
                                    color="success"
                                    />
                                </CardFooter>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }

    render() {
        return (
            <div className="Signup">
                {this.state.newUser === null
                    ? this.renderForm()
                    : this.renderConfirmationForm()}
            </div>
        );
    }
}