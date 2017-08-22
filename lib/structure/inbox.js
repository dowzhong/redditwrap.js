const oauthTarget = 'https://oauth.reddit.com/api/'
const authenticator = require('./../auth/authenticator.js')
const request = require('superagent')

class inbox{
  constructor(unformattedList, auth){
    this.type = unformattedList.kind
    this.subject = unformattedList.data.subject
    this.body = unformattedList.data.body
    this.created = unformattedList.data.created
    this.parentId = unformattedList.data.parent_id
    this.id = unformattedList.data.id
    this.author = unformattedList.data.author
    this.subreddit = unformattedList.data.subreddit
  }
}

module.exports = inbox