const testText = 'Lorem ipsum dolor <a href="mailto:sit@amet.com">site</a> consectetur <span>adipiscing elit</span>, sed do <strong>eiusmod tempor incididunt</strong> ut <a href="http://exampleurl1.com">labore et</a> dolore <a href="mailto:magna@aliqua.com">Ut</a>. <em>enim ad minim</em> veniam, <a href="#anchor">quis nostrud</a> exercitation ullamco laboris nisi ut <a href="https://exampleurl2.com">aliquip</a> ex ea commodo consequat.</p>';





function harvestLinks(input){
  const linkPattern = /<a href="(.*?)a>/g;
  const httpPattern = /https?/;
  let jsonObj = {
    links: [],
    emails: []
  };

  while(match=linkPattern.exec(input)){
    let matchArray  = match[1].split(/[:><]/g);
    if(matchArray[0] === "mailto"){ 
      let address = matchArray[1];
      jsonObj.emails.push(address);
     }
    if(httpPattern.test(matchArray[0])){
      let linkObj = {
        "linkText": matchArray[2], 
        "url": matchArray[0] + ":" + matchArray[1]
      };
      jsonObj.links.push(linkObj);
    }
  }
  return jsonObj;
}

// console.log(harvestLinks(testText));