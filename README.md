# reddit.js
[![npm](https://img.shields.io/npm/v/redditwrap.js.svg?style=flat-square)](https://www.npmjs.com/package/redditwrap.js)
[![npm](https://img.shields.io/github/license/mvegter/redditwrap.js.svg?style=flat-square)](https://github.com/mvegter/redditwrap.js/blob/master/LICENSE)
[![Travis branch](https://img.shields.io/travis/mvegter/redditwrap.js/master.svg?style=flat-square)](https://travis-ci.org/mvegter/redditwrap.js)
[![Known Vulnerabilities](https://snyk.io/test/github/mvegter/redditwrap.js/badge.svg?style=flat-square)](https://snyk.io/test/github/mvegter/redditwrap.js)


## Methods
* [getCurrentUser](#getCurrentUser)
* [getFriends](#getFriends)
* [getPosts](#getPosts)
* [login](#login)
* [searchPost](*searchPost)
* [submitComment](#submitComment)
* [submitTextPost](#submitTextPost)


## Types

* [postData](#postData)
___
### I will not be responsible for how you use this wrapper!
Install: ``npm install redditwrap.js``

Reddit.js is a promise based library for interacting with Reddit!
### Getting started with making a basic post:
```js
const redditjs = require('reddit.js')
let reddit = new redditjs({
  useragent: USERAGENT,
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

## Methods
<a id="getFriends"></a>
### getFriends()

Returns an array of objects of the friends the authenticated user has. Each object has ``name`` and ``created``.

__Returns__

* Promise: ``friendsList``
___
<a id="getPosts"></a>
### getPosts(subreddit, [sort])

Get submissions on a subreddit based on ``sort``.

__Arguments__

* ``sort``: One of ``hot``, ``new``, ``rising``, ``controversial``, ``random``, ``top``.

__Returns__

* Promise: ``postData`` OR Array of ``postData``
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
___

## Types
<a id="postData"></a>
### postData
* domain
* approved_at_utc
* banned_by
* media_embed
* thumbnail_width
* subreddit
* selftext_html
* selftext
* likes
* suggested_sort
* user_reports
* secure_media
* link_flair_text
* id
* banned_at_utc
* view_count
* archived
* clicked
* report_reasons
* title
* media
* mod_reports
* can_mod_post
* author_flair_text
* score
* approved_by
* over_18
* hidden
* preview
* thumbnail
* subreddit_id
* edited
* link_flair_css_class
* author_flair_css_class
* contest_mode
* gilded
* downs
* brand_safe
* secure_media_embed
* saved
* removal_reason
* post_hint
* stickied
* can_gild
* thumbnail_height
* parent_whitelist_status
* name
* spoiler
* permalink
* subreddit_type
* locked
* hide_score
* created
* url
* whitelist_status
* quarantine
* author
* created_utc
* subreddit_name_prefixed
* ups: 32,
* num_comments
* is_self
* visited
* num_reports
* is_video
* distinguished
