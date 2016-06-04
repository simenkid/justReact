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
            <SpeedSelector />
        </MuiThemeProvider>
    );
};

ReactDOM.render(
  <App />,
  document.getElementById('container')
);