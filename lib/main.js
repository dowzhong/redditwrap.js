const request = require('superagent')
const formatter = require('./formatter.js')
const authenticater = require('./auth/authenticator.js')
const pollerMsg = require('./events/pollerMsg.js')
let pollerPost = require("./events/pollerPost.js")
let pollerComment = require('./events/pollerComment.js')
const events = require("events")


const target = 'https://www.reddit.com/api/v1/'
let oauthTarget = 'https://oauth.reddit.com/api/'
let noApi = 'https://oauth.reddit.com/'
let auth
class reddit extends events{
  constructor(obj){
    super()
    let self = this
    new authenticater(obj)
      .then(reply =>{
        auth = reply
        pollerMsg.grabMessages(auth, self)
        pollerPost.grabPosts(auth, self)
        pollerComment.grabComments(auth, self)
        self.emit('ready')
      })
  }

  


  get authDetails(){
    return auth
  }

  getSubreddit(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
        .post(oauthTarget + 'search_subreddits')
    })
  }          

  getComments(subreddit){
    let self = this
    return new Promise((resolve, reject) =>{
      request
        .get('https://www.reddit.com/r/' + subreddit + '/comments/.json')
        .end((err, res) =>{
          if(err) reject(err);
          resolve(formatter.formatComments(res.body, self))
        })
    })
  }

  getCurrentUser(){
    let self = this
  	return new Promise((resolve, reject) =>{
		self.checkAuthRefresh()
      .then(() =>{
        request
          .get(oauthTarget + 'v1/me')
          .set('Authorization', 'bearer ' + auth.auth)
          .set('User-Agent', auth.useragent)
          .end((err, res) =>{
            if(err) reject(err);
            resolve(res.body)
          })
      })
  	})
  }

  getFriends(){
    let self = this
  	return new Promise((resolve, reject) =>{
		self.checkAuthRefresh()
      .then(() =>{
        request
          .get(oauthTarget + 'v1/me/friends')
          .set('Authorization', 'bearer ' + auth.auth)
          .set('User-Agent', auth.useragent)
          .end((err, res) =>{
            if(err) reject(err);
            resolve(formatter.formatFriends(res.body, self))
          })
      })
  	})
  }

  getInbox(filter){
    let self = this
    return new Promise((resolve, reject) =>{
      self.checkAuthRefresh()
        .then(() =>{
          request
          .get(noApi + 'message/' + (filter || 'inbox'))
          .set('Authorization', 'bearer ' + auth.auth)
          .set('User-Agent', auth.useragent)
          .end((err, res) =>{
            if(err) reject(err);
            resolve(formatter.formatInbox(res.body, self))
          })
        })
    })
  }

  getPosts(subreddit, sort){
    let self = this
    return new Promise((resolve, auth) =>{
  		request
  			.get('https://www.reddit.com/r/' + subreddit + '/' + sort + '/.json')
  			.end((err, res) =>{
  				if(err) reject(err);
  				resolve(formatter.formatPosts(res.body, self))
  			})
  	})
  }

  getUser(user){
    let self = this
    return new Promise((resolve, reject) =>{
      self.checkAuthRefresh()
        .then(() =>{
          request
            .get(noApi + 'user/' + user + '/about')
            .set('Authorization', 'bearer ' + auth.auth)
            .set('User-Agent', auth.useragent)
            .end((err, res) =>{
              if(err) reject(err);
              resolve(formatter.formatUsers(res.body, self))
            })
        })
    })
  }

  searchPost(id){
    let self = this
  	return new Promise((resolve, reject) =>{
  	request
  		.get('https://www.reddit.com/by_id/t3_' + id + '.json')
  		.end((err, res) =>{
  			if(err) reject(err);
  			let formatted = formatter.formatPosts(res.body, self)
  			resolve(formatted)
  		})
  	})
  }

  searchComment(parent, target){
    let self = this
  	return new Promise((resolve, reject) =>{
  		self.searchPost('t3_' + parent)
  			.then(data =>{
  				request
  					.get('https://www.reddit.com/r/' + data.data.children.map(u => u.data.subreddit) + '/comments/' + parent + '/_to/' + target +'/.json')
  					.end((err, res) =>{
  						if(err) reject(err);
  						resolve(res.body)
  					})
  			})
  			.catch(err => reject(err))
  	})
  }

  submitLinkPost(subreddit, link, title, resubmit){
    let self = this
  	return new Promise((resolve, reject) =>{
		  self.checkAuthRefresh()
        .then(() =>{
          request
            .post(oauthTarget + 'submit')
            .set('Authorization', 'bearer ' + auth.auth)
            .set('User-Agent', auth.useragent)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
              api_type: 'json',
              kind: 'link',
              resubmit: resubmit || true,
              sendreplies: true,
              sr: subreddit,
              url: link,
              title: title
            })
            .end((err, res) =>{
              if(err) reject(err);
              resolve(res.body)
            })
        })
  	})
  }

  submitTextPost(subreddit, title, content){
    let self = this
  	return new Promise((resolve, reject) =>{
		  self.checkAuthRefresh()
        .then(() =>{
          request
            .post(oauthTarget + 'submit')
            .set('Authorization', 'bearer ' + auth.auth)
            .set('User-Agent', auth.useragent)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
              api_type: 'json',
              kind: 'self',
              resubmit: true,
              sendreplies: true,
              sr: subreddit,
              text: content,
              title: title
            })
            .end((err, res) =>{
              if(err) reject(err);
              resolve(formatter.formatSuccessPost(res.body, self))
            })
        })
  	})
  }

  checkAuthRefresh(){
    let self = this
    let seconds = new Date() / 1000;
    return new Promise((resolve, reject) =>{
      if(seconds - auth.expiry >= 3600){
        self.refreshAuth()
          .then(() =>{
            resolve(true)
          })
      }else{
        resolve(true)
      }
    })
  }

  refreshAuth(){
    return new Promise((resolve, reject) =>{
      new authenticater(auth)
      .then(reply =>{
        auth = reply
        resolve(true)
      })
    })
  }
}


module.exports = reddit
