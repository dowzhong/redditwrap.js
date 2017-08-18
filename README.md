# reddit.js
* [getCurrentUser](#getCurrentUser)
* [getFriends](#getFriends)
* [login](#login)
* [searchPost](*searchPost)
* [submitComment](#submitComment)
* [submitTextPost](#submitTextPost)
___
### I will not be responsible for how you use this wrapper!
Install: ``npm install reddit.js``

Reddit.js is a promise based library for interacting with Reddit!
### Getting started with making a basic post:
```js
const redditjs = require('reddit.js')
let reddit = new redditjs({
  username: USERNAME,
  password: PASSWORD,
  clientID: YOUR-SCRIPT-TYPE-APP-ID,
  clientSecret: YOUR-SCRIPT-TYPE-APP-SECRET
})

reddit.submitTextPost('test', 'Hello World!', 'My first text post!')
  .then(data =>{
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
```
___
## Documentation
<a id="getFriends"></a>
### getFriends()

Returns an array of objects of the friends the authenticated user has. Each object has ``name`` and ``created``.

__Returns__

* Promise: ``friendsList``
___
<a id="getCurrentUser"></a>
### getCurrentUser()

Gets details about the current logged on user.

__Returns__

* Promise: ``userData``
___
<a id="login"></a>
### login(credentials)

This method doesn't log you in. It just specifies the details the wrapper will use to authenticate your actions.

__Arguments__

* ``credentials``: An object containing ``username``, ``password``, ``clientID`` and ``clientSecret``.
___
<a id="searchPost"></a>
### searchPost(id)

Search for a post by ID/fullname.

__Arguments__

* ``id``: The fullname of the post without ``t3_``

__Returns__

* Promise: ``postData``

*Note: You can quickly comment on this searched post by attaching ``.comment(text)`` function onto the object, where ``text`` is your comment content.*
___
<a id="submitComment"></a>
### submitComment(targetID, comment)

Reply to a post/comment.

__Arguments__

``targetID``: The fullname of the target. Please refer to Reddit documentation if you don't know what that is.
``comment``: The contents of your comment as a string.
___
<a id="submitTextPost"></a>
### submitTextPost(subreddit, title, content)

Submit a new text/selfpost to a subreddit.

__Arguments__

* ``subreddit``: The subreddit you'd like to post in.
* ``title``: The title of the post.
* ``content``: The content of your post.

__Returns__

* Promise: ``successData``
