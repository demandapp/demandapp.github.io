import "core-js/stable";
import "regenerator-runtime/runtime";

import './components/root.js';
import '@pwabuilder/pwainstall';

let isDown = false;

window.addEventListener('scroll', () => {

  if (window.scrollY > 132 && !isDown) {
    isDown = true;
    document.body.style.background = '#192E61';
  } else if (window.scrollY <= 132 && isDown) {
    isDown = false;
    document.body.style.background = '#203A7D linear-gradient(45deg, #192E61, #192E61)';
  }
});