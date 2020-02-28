/* eslint-disable object-shorthand */


// You probably already know what this does.
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

var {Cc: classes, Ci: interfaces} = Components;
let ns = 
    Components.classes["@mozilla.org/messenger/msgnotificationservice;1"]
    .getService(Components.interfaces.nsIMsgFolderNotificationService);

let ts=Components.classes["@mozilla.org/messenger/tagservice;1"]
		.getService(Components.interfaces.nsIMsgTagService);

var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
    .getService(Components.interfaces.nsIWindowMediator);



// This is the important part. It implements the functions and events defined in schema.json.
// The variable must have the same name you've been using so far, "ext" in this case.
var myapi = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    return {
      // Again, this key must have the same name.
      myapi: {

          onNewMsg: new ExtensionCommon.EventManager({
              context,
              name: "myapi.onNewMsg",
              register(fire) {
		  var FolderListener={
		      msgAdded: function(aMsgHdr){
			  return fire.async(context.extension.messageManager.convert(aMsgHdr),
					    context.extension.folderManager.convert(aMsgHdr.folder));
		      }
		  };
		  ns.addListener(FolderListener,ns.msgAdded );
		  return function() {
		      ns.removeListener(FolderListener)
		  };
              }
          }).api()
      }
    }
  }
}
