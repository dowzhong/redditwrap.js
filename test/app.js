const redditjs = require('../lib/main.js') // use require('redditjs') in production
let reddit = new redditjs({
  username: process.env.username,
  password: process.env.password,
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret
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