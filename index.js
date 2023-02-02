const axios = require('axios')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('enter your email: ', (email) => {
  axios.get(`https://twitter.com/users/email_available?email=${email}`,
  )
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err)
    })
  readline.close()
})

