function newMsgHandler(msg,folder){
    console.log(msg);
    console.log(folder);
    
    browser.messages.getFull(msg.id).then((part)=>{
	console.log(part);
	for (let [key, value] of Object.entries(part.headers)) {
		console.log(`${key}: ${value}`);
	}
	
    });
    
}

browser.myapi.onNewMsg.addListener(newMsgHandler);
