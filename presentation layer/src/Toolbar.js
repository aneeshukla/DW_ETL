import React, { Component } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import "./index.css";

class Toolbar extends Component {
    constructor(props) {
        super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            dimensions: ['country', 'city', 'factory', 'maker', 'ceo', 'model', 'fuel_type', 'year', 'month'],
            facts: ['price', 'mileage', 'engine_power'],
            option1: undefined,
            option2: undefined,
            option3: undefined,
            option4: undefined
        };
    }

    renderDimensionOptions(order) {
        return this.state.dimensions.map((dimensions, index) => {
            return <Dropdown.Item eventKey={dimensions} onSelect={(e)=>this.props.addOption(e, order)}>{dimensions}</Dropdown.Item>;
        });
    }

    renderBox(order) {
        return (<ButtonGroup>
            <DropdownButton as={ButtonGroup} title="Dimension" id="bg-nested-dropdown" variant="info" focusFirstItemOnShow="true">
                {this.renderDimensionOptions(order)}
            </DropdownButton>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    type="text"
                    placeholder="Input group example"
                    aria-label="Input group example"
                    aria-describedby="btnGroupAddon"
                    onChange={(e)=>this.props.updateQueryOptionValue(e, order)}
                />
            </InputGroup>
        </ButtonGroup>);
    }

    renderGO() {
        return (<Button variant="success" onClick={this.props.handleClick} style={{ marginLeft: '1%'}}>GO</Button>);
    }

    render() {
        return (
            <div>
                {this.renderBox(1)}{this.renderBox(2)}{this.renderBox(3)}{this.renderBox(4)}{this.renderGO()}
            </div>
        );
    }
}
export default Toolbar;
