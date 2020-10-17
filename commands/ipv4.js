const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

module.exports = {
    name: 'ipv4',
    description: 'Get external IPv4 address of the server this bot runs on.',
    async execute(message) {
        let str;
        str = await exec("curl -s whatismyip.akamai.com");
        console.log(str.stdout.toString())
        await message.channel.send(str.stdout.toString().trim() + " don't hack me plz");
    },
};