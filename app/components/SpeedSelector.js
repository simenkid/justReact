import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { cyanA700 } from 'material-ui/styles/colors';

var SpeedSelector = React.createClass({
    getInitialState: function () {
        return { value: 1 };
    },
    handleChange: function (event, index, value) {
        this.setState({value:value});
    },
    render: function () {
        return (
            <div style={this.props.style}> <p style={{color: cyanA700, display: "inline-block", marginRight: "6px"}}>Speed</p>
                <DropDownMenu style={{width: 80, display: "inline-block", textAlign: "center"}} value={this.state.value} onChange={this.handleChange}>
                  <MenuItem value={1} primaryText="1" />
                  <MenuItem value={2} primaryText="2" />
                  <MenuItem value={4} primaryText="4" />
                  <MenuItem value={8} primaryText="8" />
                </DropDownMenu>
                <p style={{color: cyanA700, display: "inline-block", marginLeft: "6px"}}>(beats/second)</p>
            </div>
        );
    }
});

module.exports = SpeedSelector;
