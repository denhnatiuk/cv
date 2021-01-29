// import { defaultConfig } from '../default.config.json';
// import * as defaultConfig from '../default.config.json';
import {name, version} from '../package.json';
import { App } from './core/app.class.js';

import dotenv from "dotenv";
import * as Firebase from './firebase.js';

let elem = name || 'app-div';
// let elem = 'app-div';
const methods =  {};

methods[Symbol('logic')] = function(){console.log('logic')};
// console.log(elem);


if(window.hasOwnProperty('customElements')){
  window.customElements.define(elem, App, {extends:"div"});
  window.customElements.whenDefined(elem).then(()=>{
    window[elem] = new App();
    return window[elem].init;
    // console.log(window[elem]);
  });
} else {
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  loadScript('./node_modules/@webcomponents/custom-elements/custom-elements.min.js');

  WebComponents.waitFor(() => {
      // At this point we are guaranteed that all required polyfills have
      // loaded, and can use web components APIs.
      // Next, load element definitions that call `customElements.define`.
      // Note: returning a promise causes the custom elements
      // polyfill to wait until all definitions are loaded and then upgrade
      // the document in one batch, for better performance.
    return loadScript('index.js');
  });
}
