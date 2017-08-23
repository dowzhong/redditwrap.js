let ignore = []

function grabMessages(auth, reddit){
  reddit.getInbox()
    .then(data =>{
      for(let i = 0; i < data.length; i++){
        ignore.push(data[i].id)
      }
      setTimeout(pollMessages, 5000, auth, reddit)
    })
}

function pollMessages(auth, reddit){
  reddit.getInbox()
    .then(data =>{
      for(let i = 0; i < data.length; i++){
        if(ignore.includes(data[i].id) == false){
          emitData(reddit, data[i])
          ignore.push(data[i].id)
        }
      }
    })
  setTimeout(pollMessages, 5000, auth, reddit)
}

function emitData(reddit, data){
  reddit.emit("message", data)
}
exports.grabMessages = grabMessages