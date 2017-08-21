const request = require('superagent')
const formatter = require('./formatter.js')
const authenticater = require('./auth/authenticator.js')
const target = 'https://www.reddit.com/api/v1/'
let oauthTarget = 'https://oauth.reddit.com/api/'
const events = require("events")
let auth
class reddit extends events{
  constructor(obj){
    super()
    let self = this
    auth = new authenticater(obj)
      .then(() =>{
        self.emit('ready')
      })
  }

  get authDetails(){
    return auth
  }

  getCurrentUser(){
    let self = this
  	return new Promise((resolve, reject) =>{
		request
			.get(oauthTarget + 'v1/me')
			.set('Authorization', 'bearer ' + self.bearer)
			.set('User-Agent', self.useragent)
			.end((err, res) =>{
				if(err) reject(err);
				resolve(res.body)
			})
  	})
  }

  getFriends(){
    let self = this
  	return new Promise((resolve, reject) =>{
		request
			.get(oauthTarget + 'v1/me/friends')
			.set('Authorization', 'bearer ' + self.bearer)
			.set('User-Agent', self.useragent)
			.end((err, res) =>{
				if(err) reject(err);
				resolve(formatter.formatFriends(res.body, self))
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
		request
			.post(oauthTarget + 'submit')
			.set('Authorization', 'bearer ' + self.bearer)
			.set('User-Agent', self.useragent)
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
  }

  submitTextPost(subreddit, title, content){
    let self = this
  	return new Promise((resolve, reject) =>{
		request
			.post(oauthTarget + 'submit')
			.set('Authorization', 'bearer ' + self.bearer)
			.set('User-Agent', self.useragent)
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
				resolve(res.body)
			})
  	})
  }
}


module.exports = reddit
