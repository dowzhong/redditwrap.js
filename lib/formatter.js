let friendsList = require('./structure/friendsList.js')
let postData = require('./structure/postData.js')

function formatFriends(data, reddit){
  let formatted = []
  let unformatted = data.data.children
  if(unformatted.length == 1){
    return formatted.push(new friendsList(unformatted))
  }else{
    for(let i = 0; i < unformatted.length; i++){
      formatted.push(new friendsList(unformatted[i]))
    }
    return formatted
  }
}


function formatPosts(data, self){
  let formatted = []
  let unformatted = data.data.children
  if(unformatted.length == 1){
    formatted.push(new postData(unformatted[0], self))
    return formatted
  }else{
    for(let i = 0; i < unformatted.length; i++){
      formatted.push(new postData(unformatted[i], self))
    }
    return formatted
  }
}



exports.formatFriends = formatFriends
exports.formatPosts = formatPosts
