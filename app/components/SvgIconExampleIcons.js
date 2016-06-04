import React from 'react';
import AvPlay from 'material-ui/svg-icons/av/play-arrow';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvStop from 'material-ui/svg-icons/av/stop';
import AvLoop from 'material-ui/svg-icons/av/loop';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

var SPlayer = require('soundfont-player');
var isClicked = false;

var ctx = new AudioContext();
var soundfont = new Soundfont(ctx);
    
var playSound = function () {

    var notesFieldValue = "F4 A4 A4 A4 F4 B4 B4 B4 F4 A4 A4 A4 F4 B4 B4 B4 F4 A4 A4 A4 F4 B4 B4 B4 "
    + "F4 A4 A4 A4 F4 B4 B4 B4 F4 A4 A4 A4 F4 A4 A4 A4 F4 B4 B4 B4 F4 A4 A4 A4";
    var drum = soundfont.instrument('glockenspiel');
    var piano = soundfont.instrument('banjo');

    setTimeout(function () {
        isClicked = false;
    }, notesFieldValue.split(" ").length * 250);

    (function() {
        var time = ctx.currentTime + 0.2;
        notesFieldValue.split(" ").forEach(function(note, idx) {
            if (idx%4) {
                piano.play(note, time, 0.4);
            } else {
                drum.play(note, time, 0.4);
            }

            time += 0.25;
        });
    })();
};

var play = function () {
    if (!isClicked) {
        isClicked = true;
        playSound();
    }
};

const iconStyles = {
  marginRight: 24,
};

var SvgIconExampleIcons = React.createClass({
    render: function () {
        return (
          <div>
            <AvPlay style={iconStyles} color={blue500} onClick={play.bind(this)}/>
            <AvPause style={iconStyles} color={blue500} />
            <AvStop style={iconStyles} color={blue500} />
            <AvLoop style={iconStyles} color={blue500} />
          </div>
        );
    }
});

module.exports = SvgIconExampleIcons ;
