import React from 'react';
import TextField from 'material-ui/TextField';

var NoteInput = React.createClass({
    render: function () {
        return (
            <TextField
              style={this.props.style}
              hintText="01012103"
              floatingLabelText="Insert notes here:"
              multiLine={true}
              rows={4}
            />
        );
    }
});

module.exports = NoteInput;

