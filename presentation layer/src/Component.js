import React, { Component } from "react";
import { Table, Container, Row, Col } from 'react-bootstrap';
import Toolbar from "./Toolbar";
import "./index.css";
import Operations from "./Operations";

class DataTable extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      facts: [],
      queryUrl: 'http://localhost:3001/query?',
      option1: '',
      value1: '',
      option2: '',
      value2: '',
      option3: '',
      value3: '',
      option4: '',
      value4: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.addOption = this.addOption.bind(this);
    this.updateQueryOptionValue = this.updateQueryOptionValue.bind(this);
    this.maxSet = this.maxSet.bind(this);
    this.minSet = this.minSet.bind(this);
  }

  maxSet(e) {
    console.log(e.target.value);
    let endpoint = '/query/max/' + e.target.value + '?';
    let url = this.state.queryUrl.replace('/query?', endpoint);
    this.setState({ queryUrl: url });
    console.log(this.state.queryUrl)
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        let max = [];
        max.push(data);
        this.setState({
          facts: max
        });
      })
      .catch(console.log)
  }

  getAvg(e) {

  }

  minSet(e) {
    console.log(e.target.value);
    let endpoint = '/query/min/' + e.target.value + '?';
    let url = this.state.queryUrl.replace('/query?', endpoint);
    this.setState({ queryUrl: url });
    console.log(this.state.queryUrl)
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        let max = [];
        max.push(data);
        this.setState({
          facts: max
          // queryUrl: 'http://localhost:3001/query?'
        });
      })
      .catch(console.log)
  }

  addOption(e, optionIndex) {
    console.log(e, optionIndex)
    if (optionIndex === 1)
      this.setState({ option1: e });
    else if (optionIndex === 2)
      this.setState({ option2: e });
    else if (optionIndex === 3)
      this.setState({ option3: e });
    else if (optionIndex === 4)
      this.setState({ option4: e });
  }

  updateQueryOptionValue(e, order) {
    console.log(e.target.value, order)
    if (order === 1)
      this.setState({ value1: e.target.value });
    if (order === 2)
      this.setState({ value2: e.target.value });
    if (order === 3)
      this.setState({ value3: e.target.value });
    if (order === 4)
      this.setState({ value4: e.target.value });
  }

  handleClick() {
    let url = this.state.queryUrl;
    console.log(url)
    if (this.state.option1 !== '' && this.state.value1 !== '')
      url = url + this.state.option1 + '=' + this.state.value1 + '&';
    if (this.state.option2 !== '' && this.state.value2 !== '')
      url = url + this.state.option2 + '=' + this.state.value2 + '&';
    if (this.state.option3 !== '' && this.state.value3 !== '')
      url = url + this.state.option3 + '=' + this.state.value3 + '&';
    if (this.state.option4 !== '' && this.state.value4 !== '')
      url = url + this.state.option4 + '=' + this.state.value4 + '&';
    url = url.slice(0, -1);
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        this.setState({ facts: data })
      })
      .catch(console.log)
  }

  componentDidMount() {
    fetch('http://localhost:3001/query')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          facts: data,
          doneLoading: true
        })
      })
      .catch(console.log)
  }

  renderTableData() {
    if (this.state.facts && this.state.facts.length > 0) {
      return this.state.facts.map((facts, index) => {
        const { country, city, factory, maker, ceo, model, fuel_type, year, month, mileage, engine_power, price } = facts; //destructuring
        return (
          <tr key={index}>
            <td>{country}</td>
            <td>{city}</td>
            <td>{factory}</td>
            <td>{maker}</td>
            <td>{ceo}</td>
            <td>{model}</td>
            <td>{fuel_type}</td>
            <td>{year}</td>
            <td>{month}</td>
            <td>{mileage}</td>
            <td>{engine_power}</td>
            <td>{price}</td>
          </tr>
        );
      });
    }
  }

  renderTableHeader() {
    if (this.state.facts.length > 0) {
      let header = Object.keys(this.state.facts[0]);
      return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>;
      });
    }
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col></Col>
            <Col><h1>Car Data Warehouse</h1></Col>
            <Col></Col>
          </Row>
        </Container>
        <Toolbar handleClick={this.handleClick} addOption={this.addOption} updateQueryOptionValue={this.updateQueryOptionValue} />
        <Container fluid>
          <Row>
            <Col></Col>
            <Col><Operations maxSet={this.maxSet} minSet={this.minSet}></Operations></Col>
            <Col></Col>
          </Row>
        </Container>
        <Table striped bordered hover variant="dark" id="facts">
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default DataTable;
