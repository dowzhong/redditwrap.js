const request = require('superagent')
const formatter = require('./formatter.js')
const target = 'https://www.reddit.com/api/v1/'
let oauthTarget = 'https://oauth.reddit.com/api/'

let reddit = function(obj){
	let self = this
	this.useragent = (obj.useragent === undefined) ? '' : obj.useragent
	this.username = obj.username
	this.password = obj.password
	this.clientID = obj.clientID
	this.clientSecret = obj.clientSecret
}

reddit.prototype.getCurrentUser = function(){
	let self = this
	return new Promise((resolve, reject) =>{
		getToken(self)
			.then(token =>{
				self.bearer = token
				request
					.get(oauthTarget + 'v1/me')
					.set('Authorization', 'bearer ' + self.bearer)
					.set('User-Agent', self.useragent)
					.end((err, res) =>{
						if(err) reject(err);
						resolve(res.body)
					})
			})
	})
}

reddit.prototype.getFriends = function(){
	let self = this
	return new Promise((resolve, reject) =>{
		getToken(self)
			.then(token =>{
				self.bearer = token
				request
					.get(oauthTarget + 'v1/me/friends')
					.set('Authorization', 'bearer ' + self.bearer)
					.set('User-Agent', self.useragent)
					.end((err, res) =>{
						if(err) reject(err);
						resolve(formatter.formatFriends(res.body))
					})
			})
	})
}

reddit.prototype.getPosts = function(subreddit, sort, count){
	return new Promise((resolve, reject) =>{
		request
			.get('https://www.reddit.com/r/' + subreddit + '/' + sort + '/.json?count=' + count)
			.end((err, res) =>{
				if(err) reject(err);
				resolve(formatter.formatPosts(res.body))
			})
	})
}

// reddit.prototype.getInbox = function(){
// 	let self = this
// 	return new Promise((resolve, reject) =>{
// 		getToken(self)
// 			.then(token =>{
// 				self.bearer = token
// 				request
// 					.get(oauthTarget + 'message/inbox')
// 					.set('Authorization', 'bearer ' + self.bearer)
// 					.set('User-Agent', self.useragent)
// 					.set('Content-Type', 'application/x-www-form-urlencoded')
// 					.send({
// 						mark: false
// 					})
// 					.end((err, res) =>{
// 						if(err) reject(err);
// 						resolve(res.body)
// 					})
// 			})
// 	})
// }

reddit.prototype.submitComment = function(parent, comment){
	let self = this
	return new Promise((resolve, reject) =>{
		getToken(self)
			.then(token =>{
				self.bearer = token
				request
					.post(oauthTarget + 'comment')
					.set('Authorization', 'bearer ' + self.bearer)
					.set('User-Agent', self.useragent)
					.set('Content-Type', 'application/x-www-form-urlencoded')
					.send({
						api_type: 'json',
						text: comment,
						thing_id: parent
					})
					.end((err, res) =>{
						if(err) reject(err);
						resolve(res.body)
					})
			})
	})
}

reddit.prototype.searchPost = function(id){
	let self = this
	return new Promise((resolve, reject) =>{
	request
		.get('https://www.reddit.com/by_id/t3_' + id + '.json')
		.end((err, res) =>{
			if(err) reject(err);
			let formatted = formatter.formatPosts(res.body)
			if(Array.isArray(formatted)){
				for(let i = 0; i < formatted.length; i++){
					Object.defineProperty(formatted[i], 'comment', {
					    value: function(comment) {
								return new Promise((resolve, reject) =>{
									self.submitComment('t3_' + formatted[i].id, comment)
										.then(data => resolve(data))
										.catch(err => reject(err))
								})
					    },
					    enumerable: false
					})
				}
			}else{
				Object.defineProperty(formatted, 'submitComment', {
				    value: function(comment) {
							return new Promise((resolve, reject) =>{
								self.submitComment('t3_' + formatted.id, comment)
									.then(data => resolve(data))
									.catch(err => reject(err))
							})
				    },
				    enumerable: false
				})
			}
			resolve(formatted)
		})
	})
}

reddit.prototype.searchComment = function(parent, target){
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

reddit.prototype.submitLinkPost = function(subreddit, link, title, resubmit){
	let self = this
	return new Promise((resolve, reject) =>{
		getToken(self)
			.then(token =>{
				self.bearer = token
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
			.catch(err => reject(err))
	})
}

reddit.prototype.submitTextPost = function(subreddit, title, content){
	let self = this
	return new Promise((resolve, reject) =>{
		getToken(self)
			.then(token =>{
				self.bearer = token
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
			.catch(err => reject(err))
	})
}

function getToken(self){
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
				if(err) reject(err);
				resolve(res.body.access_token)
			})
	})
}

module.exports = reddit
