const request = require('superagent')
const target = 'https://www.reddit.com/api/v1/'
const events = require('events')

class authenticator{
	constructor(obj){
		let self = this   
    this.useragent = (obj.useragent === undefined) ? 'redditwrap.js' : obj.useragent
    this.username = obj.username
    this.password = obj.password
    this.clientID = obj.clientID
    this.clientSecret = obj.clientSecret
    return new Promise((resolve, reject) =>{
      request
        .post(target + 'access_token')
        .auth(self.clientID, self.clientSecret, {type: 'auto'})
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          grant_type: 'password',
          username: self.username,
          password: self.password,
          scope: 'identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'
        })
        .end((err, res) =>{
          if(err) throw err;
          self.auth = res.body.access_token
          self.expiry = res.body.expires_in
          resolve(self)
        })
    })
	}

  get currentBearer(){
    return this.auth
  }

  get currentUseragent(){
    return this.useragent
  }
}


module.exports = authenticator