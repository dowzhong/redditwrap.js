# reddit.js
[![npm](https://img.shields.io/npm/v/redditwrap.js.svg?style=flat-square)](https://www.npmjs.com/package/redditwrap.js)
[![npm](https://img.shields.io/github/license/mvegter/redditwrap.js.svg?style=flat-square)](https://github.com/mvegter/redditwrap.js/blob/master/LICENSE)
[![Travis branch](https://img.shields.io/travis/mvegter/redditwrap.js/master.svg?style=flat-square)](https://travis-ci.org/mvegter/redditwrap.js)
[![Known Vulnerabilities](https://snyk.io/test/github/mvegter/redditwrap.js/badge.svg?style=flat-square)](https://snyk.io/test/github/mvegter/redditwrap.js)

## Events

* [comment](#commentEvent)
* [message](#messageEvent)
* [ready](#readyEvent)
* [submission](#submission) 

## Methods
* [getCurrentUser](#getCurrentUser)
* [getFriends](#getFriends)
* [getInbox](#getInbox)
* [getPosts](#getPosts)
* [getUser](#getUser)
* [login](#login)
* [searchPost](*searchPost)
* [submitComment](#submitComment)
* [submitTextPost](#submitTextPost)


## Types

* [commentData](#commentData)
* [friendsList](#friendsList)
* [inbox](#inbox)
* [postData](#postData)
* [userData](#userData)
___
### I will not be responsible for how you use this wrapper!
Install: ``npm install redditwrap.js``

Reddit.js is a promise and event based library for interacting with Reddit!
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
reddit.on('ready', () =>{
  reddit.submitTextPost('test', 'Hello World!', 'My first text post!')
    .then(data =>{
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
})

reddit.on('message', message =>{
  message.reply("beep boop!")
})
```
___
## Documentation

## Events
<a id="commentEvent"></a>
### comment

Emmitted when there is a new comment. Listens to r/all. (Needs a bit of fixing. Some subreddits might not appear for some reason.)

__Parameters__

``commentData``
___

<a id="messageEvent"></a>
### message

Emitted when client receives a new notification in inbox.

__Parameters__

``inbox``
___

<a id="readyEvent"></a>
### ready

Emitted when the client is ready.
___

<a id="submission"></a>
### submission
Emitted when there is a new post on reddit. Listen's to all posts.

__Paramaters__

``postData``
___

## Methods
<a id="getCurrentUser"></a>
### getCurrentUser()

Gets details about the current logged on user.

__Returns__

* Promise: ``userData``
___
<a id="getFriends"></a>
### getFriends()

Returns an array of objects of the friends the authenticated user has. Each object has ``name`` and ``created``.

__Returns__

* Promise: ``friendsList``
___
<a id='getInbox'></a>
### getInbox([option])

Returns an array of objects of your mail.

__Arguments__

``option``: A filter. One of ``unread``, ``sent``. Defaults to ``inbox``.

__Returns__

* Promise: ``inbox``
___
<a id="getPosts"></a>
### getPosts(subreddit, [sort])

Get submissions on a subreddit based on ``sort``.

__Arguments__

* ``sort``: One of ``hot``, ``new``, ``rising``, ``controversial``, ``random``, ``top``.

__Returns__

* Promise: ``postData``
___
<a id="getUser"></a>
### getUser(username)

Retrieves information on a user.

__Arguments__

* ``username``: The username of the user.

__Returns__


* Promise: ``userData`` object.
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
<a id="commentData"></a>
### commentData

#### Properties

* subreddit_id
* approved_at_utc
* edited
* banned_by
* removal_reason
* link_id
* link_author
* likes
* replies
* user_reports
* saved
* id
* banned_at_utc
* gilded
* archived
* report_reasons
* author
* num_comments
* can_mod_post
* parent_id
* score
* approved_by
* over_18
* collapsed
* body
* link_title
* author
* downs
* is_submitter
* collapsed_reason
* body_html
* distinguished
* quarantine
* can_gild
* subreddit
* name
* score_hidden
* num_reports
* link_permalink
* stickied
* created
* author_flair_text
* link_url
* created_utc
* subreddit_name_prefixed
* controversiality
* mod_reports
* subreddit_type
* ups

#### Methods

* submitComment(comment)

   &nbsp;&nbsp;&nbsp;&nbsp;Reply to the comment.

   &nbsp;&nbsp;&nbsp;&nbsp;``comment``: The content of your reply.
___
<a id="friendsList"></a>
### friendsList

#### Properties

* username
* id
* dateAdded

___
<a id="inbox"></a>
### inbox

#### Properties

* type
* subject
* body
* created
* parentId
* id
* author
* subreddit

#### Methods

* reply(text)

  &nbsp;&nbsp;&nbsp;&nbsp;Reply to the target ``inbox`` object.

  &nbsp;&nbsp;&nbsp;&nbsp;``text``: Your reply.

___
<a id="postData"></a>
### postData

#### Properties
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
* ups
* num_comments
* is_self
* visited
* num_reports
* is_video
* distinguished

#### Methods
* submitComment(comment)

   &nbsp;&nbsp;&nbsp;&nbsp;Comment on the returned post.

   &nbsp;&nbsp;&nbsp;&nbsp;``comment``: The content of your reply.

* save()

  &nbsp;&nbsp;&nbsp;&nbsp;Save the returned post.

___
<a id="userData"></a>
### userData

#### Properties

* username
* id
* isFriend
* joinedAt
* commentKarma
* linkKarma
* subreddit
* client

#### Methods
* friend()

  &nbsp;&nbsp;&nbsp;&nbsp;Adds the user as friend.
* unfriend()

  &nbsp;&nbsp;&nbsp;&nbsp;Unfriends the user.