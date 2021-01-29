class Renderer {
  constructor() {
    let svg = {
      svgElementNS: "http://www.w3.org/2000/svg"
      , xlinkhref: "http://www.w3.org/1999/xlink"
    };
    let defaults = {
      tag: "div"
      , is: "div"
      , dataset: {}
    };
  }
  render(obj){

  }
  errorCheck(obj){
    if (typeof obj !== "Object") (
      console.error("rendering item is not an object");
      return 0;
    ) else if (!obj.hasOwnProperty('tag')){//mb use contains?
      console.warn("obj has no valid Tag property. defaults were used");
      obj.tag = "div";
    }
  }
  checkClone(tag){
    try {
      t = document.querySelector(tag).cloneNode();
      if (!a) { a = d;}
      if (t.id && !a.hasOwnProperty('id') || a.id.length === 0) { delete a.id;}
      if (document.getElementById(a.id)) {a.id += "_doubled";}
      // console.log("cloned "+ JSON.stringify(a));
    } catch (e) {
      t = document.createElement(tag);
      // console.log("created");
    }
  }
  renderSVG(obj){

  }
  renderHTML(obj){}
}

render(tag, parent, opts){
    let t, p = parent, attrs = opts;

    if(tag === 'svg' || parent.tagName === "svg"){
      t = document.createElementNS("http://www.w3.org/2000/svg", tag);
      if(attrs.hasOwnProperty("xlink:href")){
         t.setAttributeNS(null,'xmlns:xlink', 'xmlns:xlink="http://www.w3.org/1999/xlink');
      }
      for(let attr in attrs){
        let attribute = attr,
            value = attrs[attr];
        if(attribute === "children"){
          for(let i=0; i<value.length;i++){
            let item = value[i];
            if(item.hasOwnProperty('tag')){
              let child = item.tag;
              delete item.tag;
              Telegram.render(child, t, item)
            }
          }
        } else if(attribute === "xlink"){
          attribute = "xlink:href";
          t.setAttributeNS('xmlns:xlink="http://www.w3.org/1999/xlink', attribute.replace(/[A-Z][0-9]/g, function(m, p, o, s) { return "-" + m.toLowerCase(); }), value);
        } else {
          t.setAttributeNS(null, attribute.replace(/[A-Z][0-9]/g, function(m, p, o, s) { return "-" + m.toLowerCase(); }), value);
        }
      }

    } else if (!Config.htmlNodesList.hasOwnProperty(tag)){
      t = document.createElement(tag);
      Object.assign(Config.htmlNodesList,{[tag]:t});
      // console.log("created");
    } else {
      t = Config.htmlNodesList[tag].cloneNode(false);
      // TODO: check reset attr values and remove unused atts for colned elem
      // console.log("cloned");
    }

  //   TODO: throw errors revision is nessesary

    for (let attr in attrs){
      if(attrs.hasOwnProperty(attr)){
        let attribute = attr,
            value = attrs[attr];
        if(attribute === "children"){
          // console.log(JSON.stringify(value));
          for(let j=0; j<value.length;j++){
            let item = value[j];
            if(item.hasOwnProperty('tag')){
              let child = item.tag;
              // console.log(child);
              delete item.tag;
              Telegram.render(child, t, item)
            }
          }
        } else if(attribute === "text") {
          t.innerText += value;
        } else{
          t.setAttribute(attribute, value);
        }
      }
    }
    // console.log(t+" "+p+" "+JSON.stringify(attrs));
    // let mod = {};
    // mod[key] = Config.module;
    // console.log(JSON.stringify(mod));
    // let mod = { JSON.stringify(Config.module)};
    Object.assign(Config.modulesNodeList, { [Config.module]:t});
    // console.log(Config.module);
    parent.appendChild(t);
  }
