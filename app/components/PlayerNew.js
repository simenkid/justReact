import React from 'react';
import AvPlay from 'material-ui/svg-icons/av/play-arrow';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvStop from 'material-ui/svg-icons/av/stop';
import AvLoop from 'material-ui/svg-icons/av/loop';

import { blue500, grey300, tealA400} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};

var Player = React.createClass({
    getDefaultProps: function () {
        return {
            status: 'stop',
            isLoop: false
        };
    },
    onClicked: function (type) {
        if (typeof this.props.onClicked === 'function')
            this.props.onClicked(type);
    },
    render: function () {
        var colors = {
            play: grey300,
            pause: grey300,
            stop: blue500,
            loop: this.props.isLoop ? tealA400 : grey300
        };

        switch (this.props.status) {
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
            {this.props.children}
          </div>
        );
    }
});

module.exports = Player ;
