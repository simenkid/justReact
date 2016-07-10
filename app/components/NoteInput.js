import React from 'react';
import TextField from 'material-ui/TextField';

var NoteInput = React.createClass({
    getInitialState: function () {
        return {
          value: ''
        }
    },
    onChanged: function (evt) {
        var inputStr = evt.target.value,
          pattern = /[0-4,\s\n\r\t\0]$/,
          newState = {
            value: this.state.value
          };

        if (pattern.test(inputStr)) {  // returns a boolean
            newState.value = inputStr.slice(0, inputStr.length);
            this.setState(newState);
        } else {
            if (inputStr.length === 0) {
                newState.value = '';
                this.setState(newState);
            }
        }

        if (typeof this.props.onChanged === 'function')
            this.props.onChanged(newState.value);
    },
    render: function () {
        return (
            <TextField {...this.props}
              hintText="0101,2103"
              floatingLabelText="Insert notes here:"
              multiLine={true}
              rows={2}
              disabled={this.props.disabled}
              onChange={this.onChanged}
              value={this.state.value}
            />
        );
    }
});

module.exports = NoteInput;

