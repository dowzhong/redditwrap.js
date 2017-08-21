const oauthTarget = 'https://oauth.reddit.com/api/'
const authenticator = require('./../auth/authenticator.js')
const request = require('superagent')
class postData{
	constructor(unformattedList, auth){
		Object.assign(this, unformattedList.data)
    this.client = auth
	}

	submitComment(content){
    let self = this
		return new Promise((resolve, reject) =>{
      try{
         console.log(self.client.authDetails.currentBearer)
    console.log(self.client.authDetails.currentUseragent) 
        request
        .post(oauthTarget + 'comment')
        .set('Authorization', 'bearer ' + self.client.authDetails.currentBearer)
        .set('User-Agent', self.client.authDetails.currentUseragent)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          api_type: 'json',
          text: content,
          thing_id: 't3_' + self.id
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

module.exports = postData