const fs = require('fs');
const readline = require('readline');

 function main () {
  console.log('pastikan file bernama email.txt')

  const bacaBaris = readline.createInterface({
    input: fs.createReadStream('./email.txt'),
    output: process.stdout,
    console: false,
  })

  bacaBaris.on('baris', (baris) => {
    console.log('baris: ', baris);
  })
}

main()