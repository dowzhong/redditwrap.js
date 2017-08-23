let ignore = []

function grabPosts(auth, reddit){
  reddit.getPosts("all", 'new')
    .then(posts =>{
      for(let i = 0; i < posts.length; i++){
        ignore.push(posts[i].id)
      }
      setTimeout(pollPosts, 5000, auth, reddit)
    })
}

function pollPosts(auth, reddit){
  reddit.getPosts("all", 'new')
    .then(data =>{
      for(let i = 0; i < data.length; i++){
        if(ignore.includes(data[i].id) == false){
          emitData(reddit, data[i])
          ignore.push(data[i].id)
        }
      }
    })
  setTimeout(pollPosts, 5000, auth, reddit)
}

function emitData(reddit, data){
  reddit.emit("submission", data)
}

exports.grabPosts = grabPosts