const oauthTarget = 'https://oauth.reddit.com/api/'
const noApi = 'https://oauth.reddit.com/'
const request = require('superagent')

class userData{
  constructor(obj, reddit){
    this.username = obj.data.name
    this.id = obj.data.id
    this.isFriend = obj.data.is_friend
    this.joinedAt = obj.data.created
    this.commentKarma = obj.data.comment_karma
    this.linkKarma = obj.data.link_karma
    this.subreddit = obj.data.subreddit
    this.client = reddit
  }

  friend(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
        .put(oauthTarget + 'v1/me/friends/' + self.username)
        .set('Authorization', 'bearer ' + self.client.authDetails.currentBearer)
        .set('User-Agent', self.client.authDetails.currentUseragent)
        .set('Content-Type', 'application/json')
        .send({
          name: self.username
        })
        .end((err, res) =>{
          if(err) reject(err);
          resolve(res.body)
        })
    })
  }

  unfriend(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
        .del(oauthTarget + 'v1/me/friends/' + self.username)
        .set('Authorization', 'bearer ' + self.client.authDetails.currentBearer)
        .set('User-Agent', self.client.authDetails.currentUseragent)
        .set('Content-Type', 'application/json')
        .send({
          name: self.username
        })
        .end((err, res) =>{
          if(err) reject(err);
          resolve(res.body)
        })
    })
  }
}

module.exports = userData