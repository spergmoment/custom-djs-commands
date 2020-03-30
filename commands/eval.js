const util = require("util");
const Discord = require("discord.js");
const ownerids = [

]; // put your owner ids here
if (!ownerids.includes(msg.author.id)) return msg.channel.send("You must be an owner to use this commands!")
try {
    let result = eval(`const run = async () => {${argJoin}};\nrun();`); // this allows for easy awaits and asyncs
    while (result instanceof Promise) { // make sure it never returns a promise
        result = await result;
    }
    if (typeof result !== 'string') {
        result = util.inspect(result, {
            depth: 0
        }); // in case it returns a Code object, inspect it
    }
    result = result.replace(msg.client.token, 'null'); // remove the token
    const evalEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .addField("Eval", "```js\n" + args.join(" ") + "```")
        .addField("Returns", "```js\n" + result + "```");
    msg.channel.send(evalEmbed);
} catch (err) { // if something goes wrong, catch it
    const evalEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .addField("Eval", "```js\n" + args.join(" ") + "```")
        .addField("Error", "```js\n" + err + "```");
    msg.channel.send(evalEmbed);
}
