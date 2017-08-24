let ignore = []

function grabComments(auth, reddit){
  reddit.getComments('all')
    .then(comments =>{
      for(let i = 0; i < comments.length; i++){
        ignore.push(comments[i].id)
      }
      setTimeout(pollComments, 5000, auth, reddit)
    })
}

function pollComments(auth, reddit){
  reddit.getComments('all')
    .then(comments =>{
      for(let i = 0; i < comments.length; i++){
        emitData(reddit, comments[i])
        ignore.push(comments[i].id)
      }
      setTimeout(pollComments, 5000, auth, reddit)
    })
}

function emitData(reddit, data){
  reddit.emit("comment", data)
}

exports.grabComments = grabComments