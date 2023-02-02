const axios = require('axios');
const fs = require('fs');
const { stdout } = require('process');
const readline = require('readline');
const bertanya = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

(function async() {
  console.log(`
'########:'##:::::'##:'########::::::::::'########:'##::::'##::::'###::::'####:'##:::::::::::::::::'######::'##::::'##:'########::'######::'##:::'##:'########:'########::
... ##..:: ##:'##: ##:... ##..::::::::::: ##.....:: ###::'###:::'## ##:::. ##:: ##::::::::::::::::'##... ##: ##:::: ##: ##.....::'##... ##: ##::'##:: ##.....:: ##.... ##:
::: ##:::: ##: ##: ##:::: ##::::::::::::: ##::::::: ####'####::'##:. ##::: ##:: ##:::::::::::::::: ##:::..:: ##:::: ##: ##::::::: ##:::..:: ##:'##::: ##::::::: ##:::: ##:
::: ##:::: ##: ##: ##:::: ##::::'#######: ######::: ## ### ##:'##:::. ##:: ##:: ##:::::::'#######: ##::::::: #########: ######::: ##::::::: #####:::: ######::: ########::
::: ##:::: ##: ##: ##:::: ##::::........: ##...:::: ##. #: ##: #########:: ##:: ##:::::::........: ##::::::: ##.... ##: ##...:::: ##::::::: ##. ##::: ##...:::: ##.. ##:::
::: ##:::: ##: ##: ##:::: ##::::::::::::: ##::::::: ##:.:: ##: ##.... ##:: ##:: ##:::::::::::::::: ##::: ##: ##:::: ##: ##::::::: ##::: ##: ##:. ##:: ##::::::: ##::. ##::
::: ##::::. ###. ###::::: ##::::::::::::: ########: ##:::: ##: ##:::: ##:'####: ########::::::::::. ######:: ##:::: ##: ########:. ######:: ##::. ##: ########: ##:::. ##:
:::..::::::...::...::::::..::::::::::::::........::..:::::..::..:::::..::....::........::::::::::::......:::..:::::..::........:::......:::..::::..::........::..:::::..::
`)
  bertanya.question(`
1. import email.txt (multiple check)
2. single check
pilih: `, (pilihan) => {
    if (pilihan == 1) return fileInput()
    if (pilihan == 2) return singleInput()
  })

})()

const fileInput = async () => {
  fs.readFile('./email.txt', 'utf-8', (err, data) => {
    if (err) throw err

    const lines = data.split('\n')
    for (const line of lines) {
      axios.get(`https://twitter.com/users/email_available?email=${line}`)
        .then(res => {
          console.log(`${line}: `,res.data, '\n');
        })
        .catch(err => {
          console.error(err)
        })
    }
  })
}

function singleInput() {
  bertanya.question('enter your email: ', (email) => {
    axios.get(`https://twitter.com/users/email_available?email=${email}`,
    )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err)
      })
    bertanya.close()
  })
}