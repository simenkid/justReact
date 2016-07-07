import React from 'react';
import Divider from 'material-ui/Divider';
import SpeedSelector from './SpeedSelector';
import NoteInput from './NoteInput';
import Player from './Player';

import { cyanA700 } from 'material-ui/styles/colors';

/*******************************************************/
/* Walkman Player                                      */
/*******************************************************/
var Walkman = require('walkman');
var wm = new Walkman({ row: 5, col: 8, speed: 1 });
var drumName = 'http://simenkid.github.io/walkman/sound/fourier_drum-mp3.js';

wm.useInstrument(drumName).then(function () {
    // instrObjs = [ { instrName: 'xxx', note: 'C1', double: false }, ... ];
    wm.defineEffect('basedrum', [ { instrName: drumName, note: 'A0', double: false } ]);
    wm.defineEffect('snare', [ { instrName: drumName, note: 'A1', double: false } ]);
    wm.defineEffect('crash', [ { instrName: drumName, note: 'A2', double: false } ]);
    wm.defineEffect('hihat', [ { instrName: drumName, note: 'A3', double: false } ]);
    wm.defineEffect('open-hihat', [ { instrName: drumName, note: 'A4', double: false } ]);
    wm.defineEffect('drum-and-hihat', [ { instrName: drumName, note: 'A0', double: false }, { instrName: drumName, note: 'A3', double: false } ]);
    wm.defineEffect('drum-and-crash', [ { instrName: drumName, note: 'A0', double: false }, { instrName: drumName, note: 'A2', double: false } ]);
    wm.defineEffect('drum-and-snare', [ { instrName: drumName, note: 'A0', double: false }, { instrName: drumName, note: 'A1', double: false } ]);
    wm.defineEffect('crash-twice', [ { instrName: drumName, note: 'A2', double: true } ]);

    wm.defineEffectMap([
        [ 'basedrum' , 'drum-and-hihat', 'drum-and-crash', 'crash-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'crash-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'crash-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'crash-twice', null ],
        [ 'snare', 'drum-and-snare', 'drum-and-crash', 'crash-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'crash-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'crash-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'crash-twice', null ],
    ]);
});

/*******************************************************/

const style = {
  height: 600,
  width: 600,
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
};

var looper;

var Panel = React.createClass({
    getInitialState: function () {
      return {
        playerStatus: 'stop',
        notesText: null,
        speed: 2,
        loop: false
      }
    },
    onSpeedChanged: function (speed) {
      this.setState({
        speed: speed
      });
    },
    onPlayerClicked: function (whichKey) {
      var notes;

      if (whichKey !== 'loop' && (this.state.playerStatus === whichKey))
        return;


      if (whichKey === 'play') {
        this.setState({
          playerStatus: 'play'
        });

        notes = this.state.notesText.split('').map(function (c) {
            return parseInt(c);
        });
        wm.speed = this.state.speed;
        wm.play(notes);

        var totalTime = (notes.length + 1)* (1000/this.state.speed);

        if (this.state.loop) {
          looper = setInterval(function () {
              wm.play(notes);
          }.bind(this), totalTime - 500);
        } else {
          setTimeout(function () {
              this  .onPlayerClicked('stop');
          }.bind(this), totalTime);
        }

      } else if (whichKey === 'stop') {
        if (looper) {
          clearInterval(looper);
          looper = null;
        }
        this.setState({
          playerStatus: 'stop'
        });
        wm.stop();
      } else if (whichKey === 'pause') {
        this.setState({
          playerStatus: 'pause'
        });
        wm.pause();
      } else if (whichKey === 'loop') {
        var loopState = !this.state.loop;

        if (!loopState && looper)
            clearInterval(looper);

        this.setState({
          loop: loopState
        });
      }
      console.log(whichKey);

    },
    onNoteChanged: function (text) {
      text = text.length ? text.replace(/[,\s\n\r\t\0]/g, '') : '';
      this.setState({
        notesText: text
      });
    },
    render: function () {
        return (
          <div style={this.props.style}>
            <div style={{marginBottom: "20px"}}>
              <h2 style={{ color: cyanA700, textAlign: "center" }}>Stay Tuned!</h2>
              <Divider />
            </div>

            <SpeedSelector style={{marginBottom: "20px"}} onChanged={this.onSpeedChanged} />
            <Divider />
            <Player style={{marginLeft: "20px", marginRight: "20px", marginTop: "20px"}} isLoop={this.state.loop} onClicked={this.onPlayerClicked} />
            <div style={{marginRight: "20px"}}>
              <NoteInput fullWidth={true} style={{marginLeft: "20px", marginTop: "0px"}} onChanged={this.onNoteChanged} />
            </div>
          </div>
        );
    }
});


module.exports = Panel;