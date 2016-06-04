import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

var SpeedSelector = React.createClass({
    getInitialState: function () {
        return { value: 1 };
    },
    handleChange: function (event, index, value) {
        this.setState({value:value});
    },
    render: function () {
        return (
            <div> Speed (beats/second) <br/>
                <SelectField style={{width: 80}} value={this.state.value} onChange={this.handleChange}>
                    <MenuItem value={1} primaryText="1" />
                    <MenuItem value={2} primaryText="2" />
                    <MenuItem value={3} primaryText="4" />
                    <MenuItem value={4} primaryText="8" />
                    <MenuItem value={5} primaryText="16" />
                </SelectField>
            </div>
        );
    }
});

module.exports = SpeedSelector;
