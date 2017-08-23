const oauthTarget = 'https://oauth.reddit.com/api/'
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
    this.client = auth
  }

  reply(reply){
    let self = this
    return new Promise((resolve, reject) =>{
      try{
        request
        .post(oauthTarget + 'comment')
        .set('Authorization', 'bearer ' + self.client.authDetails.currentBearer)
        .set('User-Agent', self.client.authDetails.currentUseragent)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          api_type: 'json',
          text: reply,
          thing_id: self.type + '_' + self.id
        })
        .end((err, res) =>{
          if(err) reject(err);
          resolve(res.body)
        })
      }catch(err){
        reject(err)
      }
    })
  }
}

module.exports = inbox