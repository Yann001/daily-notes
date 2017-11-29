/* v1
function component() {
  var el = document.createElement('div');
  el.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return el;
}

document.body.appendChild(component());
*/

import _ from 'lodash';
import './css/style.css';
import icon from './img/webpack.png';

import printMe from './print.js';

function component() {
  var el = document.createElement('div');
  var btn = document.createElement('button');

  el.innerHTML = _.join(['Hello', 'webpack'], ' ');

  // el.classList.add('hello');

  // var myIcon = new Image();
  // myIcon.src = icon;
  // el.appendChild(myIcon);

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  el.appendChild(btn);

  return el;
}

document.body.appendChild(component());
