// var React = require('react'),
//     ReactDOM = require('react-dom');
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// // var getMuiTheme = require('material-ui/styles/getMuiTheme');
// var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');
// var MyAwesomeReactComponent = require('./MyAwesomeReactComponent');

// var component = require('./component');
// var HelloReact = require('./components/HelloText.js');

import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './components/MyAwesomeReactComponent';
import SpeedSelector from './components/SpeedSelector';
import NoteInput from './components/NoteInput';
import AppBarExampleIcon from './components/AppBarExampleIcon';
import SvgIconExampleIcons from './components/SvgIconExampleIcons';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

var element = document.createElement('div');
element.id = "container";

// document.body.appendChild(component());
document.body.appendChild(element);



// ReactDOM.render(<HelloReact />, document.getElementById('container'));

// var App = React.createClass({
//     render: function () {
//         return (
//             <div>Yo </div>
//         );
//     }
// });

// var App = React.createClass({
//     render: function () {
//         return (
//             <MuiThemeProvider muiTheme={getMuiTheme()}>
//                 <MyAwesomeReactComponent />
//             </MuiThemeProvider>
//         );
//     }
// });

var App = function () {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            <AppBarExampleIcon />
            <hr />
            <br />
            <SpeedSelector />
            <br />
            <NoteInput />
            <br />
            <SvgIconExampleIcons />
        </div>
        </MuiThemeProvider>
    );
};

ReactDOM.render(
  <App />,
  document.getElementById('container')
);