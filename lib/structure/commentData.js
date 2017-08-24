const oauthTarget = 'https://oauth.reddit.com/api/'
const request = require('superagent')
class commentData{
  constructor(unformattedList, auth){
    Object.assign(this, unformattedList.data)
    this.client = auth
  }

  submitComment(content){
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
          text: content,
          thing_id: 't1_' + self.id
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

  save(){
    let self = this
    return new Promise((resolve, reject) =>{
      try{
        request
          .post(oauthTarget + 'save')
          .set('Authorization', 'bearer ' + self.client.authDetails.currentBearer)
          .set('User-Agent', self.client.authDetails.currentUseragent)
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send({
            id: 't1_' + self.id
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

module.exports = commentData
