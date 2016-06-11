import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

var styles = {
  block: {
    maxWidth: 256,
  },
  radioButton: {
    display: "inline-block",
    marginBottom: 16,
  },
};

var Settings = React.createClass({
    getInitialState: function () {
        return { value: "4_beats" };
    },
    handleChange: function (event, value) {
        this.setState({ value: value });
    },
    render: function () {
        return (
            <div>Settings
                <RadioButtonGroup name="beatSpeed" valueSelected={this.state.value} onChange={this.handleChange}>
                    <RadioButton value="2_beats" label="2" style={styles.radioButton} />
                    <RadioButton value="4_beats" label="4" style={styles.radioButton} />
                    <RadioButton value="8_beats" label="8" style={styles.radioButton} />
                </RadioButtonGroup>
            </div>
        );
    }
});

module.exports = Settings;