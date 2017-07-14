ActionCable.startDebugging()
window.App = {}
window.App.cable = ActionCable.createConsumer("ws://localhost:3000/cable")  // this url might be different 
// pass uid= <current logged in user id>
window.App.clockChannel = window.App.cable.subscriptions.create({channel: "NotificationsChannel", uid: 1}, {
  // ActionCable callbacks
  connected: function() {
    writeLog("connected", this.identifier)
  },
  disconnected: function() {
    writeLog("disconnected", this.identifier)
  },
  rejected: function() {
    writeLog("rejected")
  },
  received: function(data) {
    writeLog("received: ", data)
  }
});

function writeLog(message, data) {
  node = document.createElement("p")
  node.innerHTML = "<p>" +
    message + (data !== undefined ? ": " + deserialize(data) : "")
    "</p>"
  document.getElementById("log").appendChild(node)
}

function deserialize(data) {
  return JSON.stringify(data)
}

