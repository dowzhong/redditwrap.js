const reddit = require('./main.js')


function formatFriends(data){
  let unformattedList = data.data.children
  let friendsArray = new Array(unformattedList.length)
  for(let i = 0; i < unformattedList.length; i++){
    friendsArray[i] = {
      name: '',
      created: ''
    }
    friendsArray[i]['name'] = unformattedList[i].name
    friendsArray[i]['created'] = unformattedList[i].date
  }
  return friendsArray
}

function formatPosts(data){
  let formatted = data.data.children[0].data
  return formatted
}



exports.formatFriends = formatFriends
exports.formatPosts = formatPosts
