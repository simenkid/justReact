import React from 'react';
import TextField from 'material-ui/TextField';

var NoteInput = React.createClass({
    render: function () {
        return (
            <div>Insert notes here: <br />
                <TextField hintText="01012103" /><br />
            </div>
        );
    }
});

module.exports = NoteInput;
