import React from 'react';
import AvPlay from 'material-ui/svg-icons/av/play-arrow';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvStop from 'material-ui/svg-icons/av/stop';
import AvLoop from 'material-ui/svg-icons/av/loop';
import Snackbar from 'material-ui/Snackbar';

import { blue500, grey300, tealA400} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};

var Player = React.createClass({
    getDefaultProps: function () {
        return {
            isLoop: false
        };
    },
    getInitialState: function () {
        return {
            open: false,
            status: 'stop',
            isLoop: this.props.isLoop
        };
    },
    onClicked: function (type) {
        var playerStatus;
        switch (type) {
            case 'play':
                playerStatus = 'play';
                this.setState({
                    status: 'play'
                });
                break;
            case 'pause':
                playerStatus = 'pause';
                this.setState({
                    status: 'pause'
                });
                break;
            case 'stop':
                playerStatus = 'stop';
                this.setState({
                    status: 'stop'
                });
                break;
        }

        if (playerStatus)
            this.setState({ status: playerStatus, open: true });

        if (typeof this.props.onClicked === 'function')
            this.props.onClicked(type);
    },
    handleRequestClose: function () {
        this.setState({
          open: false
        });
    },
    render: function () {
        var colors = {
            play: grey300,
            pause: grey300,
            stop: blue500,
            loop: this.props.isLoop ? tealA400 : grey300
        };

        switch (this.state.status) {
            case 'play':
                colors.play = grey300;
                colors.pause = blue500;
                colors.stop = blue500;
                break;
            case 'pause':
                colors.play = blue500;
                colors.pause = grey300;
                colors.stop = blue500;
                break;
            case 'stop':
                colors.play = blue500;
                colors.pause = grey300;
                colors.stop = grey300;
                break;
        }

        return (
          <div style={this.props.style}>
            <AvPlay style={iconStyles} color={colors.play} onClick={this.onClicked.bind(this, 'play')} />
            <AvPause style={iconStyles} color={colors.pause} onClick={this.onClicked.bind(this, 'pause')} />
            <AvStop style={iconStyles} color={colors.stop} onClick={this.onClicked.bind(this, 'stop')} />
            <AvLoop style={iconStyles} color={colors.loop} onClick={this.onClicked.bind(this, 'loop')} />
            <div style={{display: "inline-block", marginBottom: "-20px"}} >
                <Snackbar
                  style={{position: "relative", display: "inline-block"}}
                  open={this.state.open}
                  message={this.state.status}
                  autoHideDuration={1600}
                  onRequestClose={this.handleRequestClose}
                />
            </div>
          </div>
        );
    }
});

module.exports = Player ;
