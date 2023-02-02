const axios = require('axios')
const email = 'busetgan@gmail.com'


axios.get(`https://twitter.com/users/email_available?email=${email}`,
)
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.error(err)
  })