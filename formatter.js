
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
  let posts = data.data.children
  let formatted
  if(Array.isArray(posts) == false || posts.length == 1){
    formatted = posts[0].data
    return formatted
  }else{
    formatted = []
    for(let i = 0; i < posts.length; i++){
      formatted.push(posts[i])
    }
    return formatted
  }
}



exports.formatFriends = formatFriends
exports.formatPosts = formatPosts
