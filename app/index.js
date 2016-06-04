var React = require('react'),
    ReactDOM = require('react-dom');

var component = require('./component');
var HelloReact = require('./components/HelloText.js');


var element = document.createElement('div');
element.id = "container";

document.body.appendChild(component());
document.body.appendChild(element);

ReactDOM.render(<HelloReact />, document.getElementById('container'));
