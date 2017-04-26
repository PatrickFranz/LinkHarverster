const testText = 'Lorem ipsum dolor <a href="mailto:sit@amet.com">site</a> consectetur <span>adipiscing elit</span>, sed do <strong>eiusmod tempor incididunt</strong> ut <a href="http://exampleurl1.com">labore et</a> dolore <a href="mailto:magna@aliqua.com">Ut</a>. <em>enim ad minim</em> veniam, <a href="#anchor">quis nostrud</a> exercitation ullamco laboris nisi ut <a href="https://exampleurl2.com">aliquip</a> ex ea commodo consequat.</p>';

const fileBtn = document.getElementById('btnFile');
const textBtn= document.getElementById('btnText');
const textarea = document.getElementById('taInput');
const resultBox = document.getElementById('result-box');
const fileInput = document.getElementById('fileupload');

textBtn.addEventListener('click', function(e){
  let linkObj = harvestLinks(taInput.value);
  if(linkObj){
    resultBox.innerHTML = jsonToHtml(linkObj);
  }
});

fileBtn.addEventListener('click', function(e){
  let file = fileInput.files[0],
      linkObj;
  
  if(file){
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(e){
      linkObj = harvestLinks(e.target.result);
      resultBox.innerHTML = jsonToHtml(linkObj);
    };
  }
});


function jsonToHtml(jso){
  let html = "<p>Harvested Links ...</p><br>";
  let counter = 1;
  if((len=jso.links.length) > 0){
    for(var i=0; i < len; i++){
      html += `<p>${counter}. <span class='property'>Title: </span>${jso.links[i].linkText} <span class='property'>URL: </span> ${jso.links[i].url}</p>`
      counter++;
    }
  }
  if((len=jso.emails.length) > 0){
    for(var i=0; i < len; i++){
      html += `<p>${counter}. <span class='property'>Email: </span> ${jso.emails[i]}</p>`
      counter++;
    }
  }
  return html;
}

function harvestLinks(input){
  const linkPattern = /<a href="(.*?)a>/g;
  const httpPattern = /https?/;
  let jsonObj = {
    links: [],
    emails: []
  };

  while(match=linkPattern.exec(input)){
    let matchArray  = match[1].split(/[:"><]/g);
    if(matchArray[0] === "mailto"){ 
      let address = matchArray[1];
      jsonObj.emails.push(address);
     }
    if(httpPattern.test(matchArray[0])){
      let linkObj = {
        "linkText": matchArray[3], 
        "url": matchArray[0] + ":" + matchArray[1]
      };
      jsonObj.links.push(linkObj);
    }
  }
  return jsonObj;
}

// console.log(harvestLinks(testText));