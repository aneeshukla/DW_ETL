import React, { Component } from "react";
import { Tabs, Tab, TabContent, Col, Form, Row, Card, Table } from 'react-bootstrap';
import "./index.css";

class OpTabs extends Component {
    constructor(props) {
        super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            tableData: {
                engine_power: 0,
                mileage: 0,
                price: 0
            }
        }
    }

    getSum() {
        fetch('http://localhost:3001/query/sum')
          .then(res => res.json())
          .then((data) => {
            this.setState({ tableData: data })
          })
          .catch(console.log)
      }

    render() {
        return (
            <Card>
                <Card.Header>
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="sum" title="Sum" onClick={this.getSum()}>
                            <TabContent>
                                <Card.Body>
                                    <Row>
                                        <Table striped bordered hover variant="dark" id="facts">
                                            <thead>
                                                <tr>
                                                    <th>Engine Power</th>    
                                                    <th>Mileage</th>    
                                                    <th>Price</th>    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>{this.state.tableData.engine_power}</th>
                                                    <th>{this.state.tableData.mileage}</th>
                                                    <th>{this.state.tableData.price}</th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Row>
                                </Card.Body>
                            </TabContent>
                        </Tab>
                        <Tab eventKey="avg" title="Average">
                            <TabContent>
                                <Card.Body>
                                    <Row>

                                    </Row>
                                </Card.Body>
                            </TabContent>
                        </Tab>
                        <Tab eventKey="max" title="Max">
                            <TabContent>
                                <Card.Body>
                                    <Row>
                                        <Form.Control as="select" custom onChange={(e) => this.props.maxSet(e)}>
                                            <option>price</option>
                                            <option>engine_power</option>
                                            <option>mileage</option>
                                        </Form.Control>
                                    </Row>
                                </Card.Body>
                            </TabContent>
                        </Tab>
                        <Tab eventKey="min" title="Min">
                            <TabContent>
                                <Card.Body>
                                    <Row>
                                        <Form.Control as="select" custom onChange={(e) => this.props.minSet(e)}>
                                            <option>price</option>
                                            <option>engine_power</option>
                                            <option>mileage</option>
                                        </Form.Control>
                                    </Row>
                                </Card.Body>
                            </TabContent>
                        </Tab>
                        <Tab eventKey="range" title="Range">
                            <TabContent>
                                <Card.Body>
                                    <Row>
                                        <Form>
                                            <Form.Row>
                                                <Form.Label column lg={2}>
                                                    <b>From: </b>
                                                </Form.Label>
                                                <Col>
                                                    <Form.Control placeholder="From..." />
                                                </Col>
                                                <Form.Label column lg={2}>
                                                    <b>To: </b>
                                                </Form.Label>
                                                <Col>
                                                    <Form.Control placeholder="To..." />
                                                </Col>
                                            </Form.Row>
                                        </Form>
                                    </Row>
                                </Card.Body>

                            </TabContent>
                        </Tab>
                    </Tabs>
                </Card.Header>
            </Card >
        );
    }
}
export default OpTabs;