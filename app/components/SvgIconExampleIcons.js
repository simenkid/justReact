import React from 'react';
import AvPlay from 'material-ui/svg-icons/av/play-arrow';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvStop from 'material-ui/svg-icons/av/stop';
import AvLoop from 'material-ui/svg-icons/av/loop';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

var Walkman = require('walkman');
var SPlayer = require('soundfont-player');
var isClicked = false;

var wm = new Walkman({ row: 5, col: 8 });

wm.useInstrument('tubular_bells').then(function () {
    return wm.useInstrument('synth_drum');
}).then(function () {
    // instrObjs = [ { instrName: 'xxx', note: 'C1', double: false }, ... ];
    wm.defineEffect('basedrum', [ { instrName: 'synth_drum', note: 'G3', double: false } ]);
    wm.defineEffect('hihat', [ { instrName: 'tubular_bells', note: 'G6', double: false } ]);
    wm.defineEffect('snare', [ { instrName: 'synth_drum', note: 'D1', double: false } ]);
    wm.defineEffect('open-hihat', [ { instrName: 'tubular_bells', note: 'Bb1', double: false } ]);
    wm.defineEffect('drum-and-hihat', [ { instrName: 'synth_drum', note: 'G6', double: false }, { instrName: 'tubular_bells', note: 'G6', double: false } ]);
    wm.defineEffect('drum-and-crash', [ { instrName: 'synth_drum', note: 'G6', double: false }, { instrName: 'synth_drum', note: 'C#2', double: false } ]);
    wm.defineEffect('drum-and-snare', [ { instrName: 'synth_drum', note: 'G6', double: false }, { instrName: 'synth_drum', note: 'D1', double: false } ]);
    wm.defineEffect('clap-twice', [ { instrName: 'synth_drum', note: 'Eb1', double: true } ]);

    wm.defineEffectMap([
        [ 'basedrum' , 'drum-and-hihat', 'drum-and-crash', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
        [ 'snare', 'drum-and-snare', 'drum-and-crash', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
    ]);

    // wm.defineEffectMap([
    //     [ 'clap-twice', 'clap-twice', 'clap-twice', 'clap-twice', null ],
    //     [ 'clap-twice', 'clap-twice', 'clap-twice', 'clap-twice', null ],
    //     [ 'clap-twice', 'clap-twice', 'clap-twice', 'clap-twice', null ],
    //     [ 'clap-twice', 'clap-twice', 'clap-twice', 'clap-twice', null ],
    //     [ 'clap-twice', 'clap-twice', 'clap-twice', 'clap-twice', null ],
    //     [ 'clap-twice', 'clap-twice', 'clap-twice', 'clap-twice', null ],
    //     [ 'clap-twice', 'clap-twice', 'clap-twice', 'clap-twice', null ],
    //     [ 'clap-twice', 'clap-twice', 'clap-twice', 'clap-twice', null ],
    // ]);
});


    
var playSound = function () {
    var symbols = [ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0,
                    1, 3, 2, 1, 1, 3, 2, 1, 1, 3, 2, 1, 1, 3, 2, 1, 1, 3, 2, 1 ];
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
