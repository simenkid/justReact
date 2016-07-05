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
    render: function () {
        return (
          <div style={this.props.style}>
            <SpeedSelector style={{marginBottom: "20px"}} />
            <Divider />
              <Player style={{marginLeft: "20px", marginTop: "20px"}}/>
              <NoteInput style={{marginLeft: "20px", marginTop: "0px"}}/>
          </div>
        );
    }
});


module.exports = Panel;