// Greeter.js
import React, {Component} from 'react';
var config = require('./config.json');

// es5
// module.exports = function () {
//   var greet = document.createElement('div');
//   // greet.textContent = 'Hi there and greetings!';
//   greet.textContent = config.greetText;
//   return greet;
// }
// es6 react

import styles from './Greeter.css'; // css module

class Greeter extends Comment {
  render() {
    return (
      <div className={styles.root}>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter;
