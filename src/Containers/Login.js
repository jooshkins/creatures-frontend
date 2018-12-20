import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Card, CardBody, CardHeader, CardFooter, Button } from 'reactstrap';
import { Auth } from "aws-amplify";
import LoaderButton from "./Components/LoaderButton"
import SmallHeader from "./Components/SmallHeader"

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <div>
                <SmallHeader />
                <Row className="mb-3">
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        {/* <a href="/signup"></a> */}
                        <Button href="/signup">Don't have an account?</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 4, offset: 4 }}>
                        <Form onSubmit={this.handleSubmit} className="Login">
                        <Card className="shadow-lg border border-danger" color="dark">
                            <CardHeader tag="h3">Login</CardHeader>
                            <CardBody>
                                <FormGroup id="email">
                                    <Label for="email">Email</Label>
                                    <Input
                                        autoFocus
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="enter email"
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <FormGroup id="password">
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="8 characters, 1 capital, 1 number"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                            <LoaderButton
                                block
                                disabled={!this.validateForm()}
                                type="submit"
                                isLoading={this.state.isLoading}
                                text="Login"
                                loadingText="Logging in…"
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
}