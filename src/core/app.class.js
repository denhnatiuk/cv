// import defaultConfig from "./default.config.json";
// import Observer from "observer.class.babel";
import {name, version} from '../../package.json';
// import * as styles from './style.js';


export class App extends HTMLDivElement{
    constructor(props){
      super(props);
    }
    set init(val){
      this.value  = val;
    }
    get init(){
      // console.log("init");
      // document.addEventListener('change', (e)=>{this.onchangeCallback(event)});
      return this.render();

    }
    render(){
      let mode = "debug";
      let base = {
        tag:"div"
        , is: `${name}`
        , dataset: {
          version: `${version}`
          , mode: `${mode}`
        }
      };
      let doc = document.documentElement.innerHTML;
      const div = document.createElement('div', {'is':name});
      div.setAttribute('is', name);
      div.setAttribute('version', version);
      let style = document.createElement('style');
      // style.innerHTML += styles;
      div.appendChild(style);
      div.innerHTML +=`
        Hello World! \n
        This is ${name} application
        `;
      div.setAttribute('contenteditable', 'true');
      const observer = new MutationObserver((mutationRecords) => {
        // console.log(mutationRecords[0].target.data);
        // doc = mutationRecords[0].target.data
        // result.textContent = p.textContent
      })
      observer.observe(div, {
        characterData: true,
        subtree: true,
      })
      div.oninput = (e) => {
        console.log('changed');
      }
      // div.innerText += `<!DOCTYPE html>
      // <html lang="en">
      //   ${doc}
      // </html>`;
      document.body.appendChild(div);
    }
    onchangeCallback(event){
      // if(event.target === pre){
        // event.preventDefault();
        console.log('calback fired');
      // }
    }
}
