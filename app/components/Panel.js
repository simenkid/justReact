import React from 'react';
import Divider from 'material-ui/Divider';
import SpeedSelector from './SpeedSelector';
import NoteInput from './NoteInput';
import Player from './Player';

const style = {
  height: 600,
  width: 600,
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
};

var Panel = React.createClass({
    getInitialState: function () {
      return {
        notesText: null
      }
    },
    onChanged: function (text) {
      this.setState({
        notesText: text
      });
    },
    render: function () {
        return (
          <div style={this.props.style}>
            <SpeedSelector style={{marginBottom: "20px"}} />
            <Divider />
            <Player style={{marginLeft: "20px", marginRight: "20px", marginTop: "20px"}} notes={this.state.notesText} />
            <div style={{marginRight: "20px"}}>
              <NoteInput fullWidth={true} style={{marginLeft: "20px", marginTop: "0px"}} onChanged={this.onChanged} />
            </div>
          </div>
        );
    }
});


module.exports = Panel;