import React from 'react';
import AvPlay from 'material-ui/svg-icons/av/play-arrow';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvStop from 'material-ui/svg-icons/av/stop';
import AvLoop from 'material-ui/svg-icons/av/loop';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

var Walkman = require('walkman');
var SPlayer = require('soundfont-player');
var isClicked = false;

var wm = new Walkman({ row: 5, col: 8, speed: 2 });

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


    
var playSound = function () {
    var symbols = [ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 
                    0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3,
                    3, 2, 1, 0,  3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0,  3, 2, 1, 0,  3, 2, 1, 0  ];
    wm.play(symbols);
};

var play = function () {
    if (!isClicked) {
        isClicked = true;
        playSound();
    }
};

var pause = function () {
    isClicked = false;
    wm.pause();
};

var stop = function () {
    isClicked = false;
    wm.stop();
};

const iconStyles = {
  marginRight: 24,
};

var SvgIconExampleIcons = React.createClass({
    render: function () {
        return (
          <div>
            <AvPlay style={iconStyles} color={blue500} onClick={play.bind(this)}/>
            <AvPause style={iconStyles} color={blue500} onClick={pause.bind(this)} />
            <AvStop style={iconStyles} color={blue500} onClick={stop.bind(this)} />
            <AvLoop style={iconStyles} color={blue500} />
          </div>
        );
    }
});

module.exports = SvgIconExampleIcons ;
