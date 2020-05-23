import React, { Component } from "react";
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import Tabs from './Tabs';

import "./index.css";

class Operations extends Component {
    constructor(props) {
        super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            showOps: false
        };
        this.showHideCard = this.showHideCard.bind(this);
    }

    showHideCard() {
        this.setState({ showOps: !this.state.showOps});
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        <Container>
                            <Row>
                                <Col></Col>
                                <Col><Button variant="warning" onClick={this.showHideCard}><b>Operations</b></Button></Col>
                                <Col></Col>
                            </Row>
                        </Container>
                    </Card.Header>
                    
                    { this.state.showOps? <Card.Body><Tabs maxSet={this.props.maxSet} minSet={this.props.minSet}></Tabs></Card.Body>: null}
                    
                </Card>
            </div>
        );
    }
}
export default Operations;