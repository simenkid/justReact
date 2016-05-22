import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './myAwesomeReactComponent';

var App = React.createClass({
    render: function () {
     return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <MyAwesomeReactComponent />
            </MuiThemeProvider>
        )
    }
});


ReactDOM.render(
  <App />,
  document.getElementById('app')
);
