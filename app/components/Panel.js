import React from 'react';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import SpeedSelector from './SpeedSelector';
import NoteInput from './NoteInput';
// import Player from './Player';
import PlayerNew from './PlayerNew';
import LinearProgress from 'material-ui/LinearProgress';

import { cyanA700, lightGreen200, purple400, lightBlue500 } from 'material-ui/styles/colors';

/*************************************************************************************************/
/*** Walkman Player                                                                            ***/
/*************************************************************************************************/
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


function msToTimeString(ms) {
  var t = new Date(ms);

  return t.getMinutes() + ':' + t.getSeconds();
}
/*************************************************************************************************/
/*** Panel Class                                                                               ***/
/*************************************************************************************************/
const style = {
  height: 600,
  width: 600,
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
};

var progColor = lightBlue500;

var Panel = React.createClass({
    getInitialState: function () {
      return {
        speed: 2,
        notesText: '',
        playerStatus: 'stop',
        isLoop: false,
        snackOpen: false,
        snackMessage: '',
        notesLength: 0,
        notesLeft: 0
      }
    },
    consumer: null,
    clearConsumeNotes: function () {
      this.pauseConsumeNotes();
      this.setState({
        notesLeft: 0
      });
    },
    pauseConsumeNotes: function () {
      if (this.consumer) {
        clearInterval(this.consumer);
        this.consumer = null;
      }
    },
    startConsumeNotes: function () {

      if (this.consumer)
        clearInterval(this.consumer);

      this.consumer = setInterval(function () {
          var left = this.state.notesLeft - 1;

          if (left === -1) {
            this.pauseConsumeNotes();

            if (!this.state.isLoop) {
              this.setState({
                notesLeft: 0,
                playerStatus: 'stop',
                snackOpen: true,
                snackMessage: 'Stopped'
              });
            }

          } else if (left === 0 && this.state.playerStatus ==='play' && this.state.isLoop) {
            this.play();
          } else {
            this.setState({
              notesLeft: left
            });
          }
      }.bind(this), 1000/this.state.speed);

    },
    onSpeedChanged: function (speed) {
      this.setState({
        speed: speed
      });
    },
    onNoteChanged: function (text) {
      text = text.length ? text.replace(/[,\s\n\r\t\0]/g, '') : '';
      this.setState({
        notesText: text
      });
    },
    handleRequestClose: function () {
        this.setState({
          snackOpen: false
        });
    },
    onLoopToggled: function () {
        var loopState;
        if (this.state.playerStatus !== 'stop') {
          this.setState({
            snackOpen: true,
            snackMessage: 'Please stop playing first'
          });
        } else {
          loopState = !this.state.isLoop;

          this.setState({
            isLoop: loopState,
            snackOpen: true,
            snackMessage: 'Loop ' + (loopState ? 'on' : 'off')
          });
        }
    },
    onPlayerClicked: function (whichKey) {
      var notes;

      if (whichKey === 'loop') {
        this.onLoopToggled();
        return;
      }

      switch (whichKey) {
        case 'play':

          if (this.state.notesText.length === 0) {
            this.setState({
              playerStatus: 'stop',
              snackOpen: true,
              snackMessage: 'Nothing to play'
            });
          } else {

            if (this.state.playerStatus === 'play') {
              this.setState({
                snackOpen: true,
                snackMessage: 'Music is playing.'
              });
            } else if (this.state.playerStatus === 'pause') {
              this.setState({
                playerStatus: 'play',
                snackOpen: true,
                snackMessage: 'Resume'
              });
              wm.play();
              this.startConsumeNotes();
            } else if (this.state.playerStatus === 'stop') {

              this.setState({
                playerStatus: 'play',
                snackOpen: true,
                snackMessage: 'Start'
              });
              this.play();
            }
          }

          break;

        case 'pause':
          if (this.state.playerStatus === 'play') {
            this.setState({
              playerStatus: 'pause',
              snackOpen: true,
              snackMessage: 'Paused'
            });
            this.pauseConsumeNotes();
            wm.pause();
          }

          break;

        case 'stop':
          this.clearConsumeNotes();
          if (this.state.playerStatus === 'play') {
            wm.stop();

            this.setState({
              playerStatus: 'stop',
              snackOpen: true,
              snackMessage: 'Stopped'
            });
          } else if (this.state.playerStatus === 'pause') {
            wm.play();
            wm.stop();

            this.setState({
              playerStatus: 'stop',
              snackOpen: true,
              snackMessage: 'Stopped'
            });
          }
          break;
      }
    },
    play: function () {
        var notes = this.state.notesText.split('').map(function (c) {
            return parseInt(c);
        });

        this.setState({
          notesLeft: notes.length
        });

        wm.speed = this.state.speed;
        wm.play(notes);
        var totalTime = (notes.length + 1)* (1000/this.state.speed);
        this.startConsumeNotes();
    },
    render: function () {
        return (
          <div style={this.props.style}>
            
            <div style={{marginBottom: "20px"}}>
              <h2 style={{ color: cyanA700, textAlign: "center" }}>Stay Tuned!</h2>
                <Divider />
            </div>

            <SpeedSelector style={{marginBottom: "20px"}} value={this.state.speed} disabled={this.state.playerStatus !== 'stop'} onChanged={this.onSpeedChanged} />
            <Divider />
            <div>
              <PlayerNew style={{display: "inline-block", marginLeft: "20px", marginTop: "26px"}} isLoop={this.state.isLoop} status={this.state.playerStatus} onClicked={this.onPlayerClicked}>
                <LinearProgress mode="determinate" color={progColor} style={{height: "1.5px", display: "inline-block"}} min={0} max={this.state.notesText.length} value={this.state.notesLeft} />
              </PlayerNew>
              <div style={{display: "inline-block", marginBottom: "-20px"}} >
                  <Snackbar
                    style={{position: "relative", marginLeft: "30%"}}
                    open={this.state.snackOpen}
                    message={this.state.snackMessage}
                    autoHideDuration={1600}
                    onRequestClose={this.handleRequestClose}
                  />
              </div>
            </div>

            <div style={{marginRight: "20px"}}>
              <NoteInput fullWidth={true} style={{marginLeft: "20px", marginTop: "0px"}} disabled={this.state.playerStatus !== 'stop'} onChanged={this.onNoteChanged} />
            </div>
          </div>
        );
    }
});

module.exports = Panel;
