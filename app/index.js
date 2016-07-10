import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Panel from './components/Panel';
import { blue100 } from 'material-ui/styles/colors';


injectTapEventPlugin();

var element = document.createElement('div');
element.id = "container";

// document.body.appendChild(component());
document.body.appendChild(element);

var panelStyle = {
    margin: "auto",
    width: "80%",
    borderStyle: "dotted",
    borderColor: blue100,
    borderWidth: "2px",
    padding: "1rem 2rem",
    borderRadius: "10px" 
};

var App = function () {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={{margin: "auto", width: "80%"}}>
            <Panel style={panelStyle} />
        </div>
        </MuiThemeProvider>
    );
};

ReactDOM.render(
  <App />,
  document.getElementById('container')
);