import React from 'react';
import TextField from 'material-ui/TextField';

var NoteInput = React.createClass({
    getInitialState: function () {
        return { value: '' }
    },
    onChanged: function (evt) {
        var inputStr = evt.target.value;
        var pattern = /[0-4,\s\n\r\t]$/;
        var newState = { value: null };

        if (pattern.test(inputStr)) {  // returns a boolean
            newState.value = inputStr.slice(0, inputStr.length);
            this.setState(newState);

            if (this.props.onChanged)
                this.props.onChanged(newState.value);
        }
    },
    render: function () {
        return (
            <TextField {...this.props}
              hintText="01012103"
              floatingLabelText="Insert notes here:"
              multiLine={true}
              rows={2}
              onChange={this.onChanged}
              value={this.state.value}
            />
        );
    }
});

module.exports = NoteInput;

