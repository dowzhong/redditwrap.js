let friendsList = require('./structure/friendsList.js')
let inbox = require("./structure/inbox.js")
let postData = require('./structure/postData.js')
let postSuccess = require('./structure/postSuccess.js')
let userData = require('./structure/userData.js')
let commentData = require('./structure/commentData.js')

function formatComments(data, reddit){
  let formatted = []
  let unformatted = data.data.children
  if(unformatted.length == 1){
    formatted.push(new commentData(unformatted[0], reddit))
    return formatted
  }else{
    for(let i = 0; i < unformatted.length; i++){
      formatted.push(new commentData(unformatted[i], reddit))
    }
    return formatted
  }
}

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

function formatInbox(data, self){
  let unformatted = data.data.children
  let formatted = []
  if(unformatted.length == 1){
    formatted.push(new inbox(unformatted[0], self))
    return formatted
  }else{
    for(let i = 0; i < unformatted.length; i++){
      formatted.push(new inbox(unformatted[i], self))
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

function formatUsers(data, reddit){
  let unformatted = data
  if(Array.isArray(unformatted)){
    let formatted = []
    for(let i = 0; i < unformatted.length; i++){
      formatted.push(new userData(unformatted[i], reddit))
    }
    return formatted
  }else{
    let formatted = new userData(data, reddit)
    return formatted
  }
}

function formatSuccessPost(data, self){
  if(data.json.data === undefined){
    return data
  }
  let formatted = new postSuccess(data, self)
  return formatted
}



exports.formatComments = formatComments
exports.formatFriends = formatFriends
exports.formatInbox = formatInbox
exports.formatPosts = formatPosts
exports.formatUsers = formatUsers
exports.formatSuccessPost = formatSuccessPost