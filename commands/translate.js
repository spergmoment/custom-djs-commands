translate = require('translate'),
    ld = new(require('languagedetect')), // get these from npm
    let uu = ld.detect(args.slice(1).join(" "), 30).toString().split("[ [ ").toString().split(','); // detects 30 potential languages that the input may be
console.log(uu);
if (args[0] !== 'auto') uu = [args[0]]; // either auto detect or manual detect
const map = require('./map.json'); // the map file, checks supported languages and maps langs to the correct format
if (!map) return console.log("No map.json file exists."); // no map? no problem!
let tr; // a translate variable
for (let i = 0; i < uu.length; i++) { // more efficient method of looping and continuing
    let u = uu[i]; // get the current index of the langs variable
    if (map[u]) { // checks if the lang is in the map
        try {
            tr = await translate(args.slice(1).join(" "), { // this tries to translate the given text...
                from: u,
                to: 'en',
                engine: 'yandex',
                key: 'trnsl.1.1.20200313T000120Z.1e268cadb185b0fe.56c43eee320920fd11da980e568a555b5cb0cf3f' // put your own
            });
        } catch (e) { // when an unsupported language is detected, it throws an error...
            continue; // ...so this continues the loop and stops.
        }
        if (tr.toLowerCase() !== args.slice(1).join(" ").toLowerCase()) { // makes sure the input isnt the same as the translated output
            uu = u; // overwrites the langs array with just the current detected language
            break; // and stops the loop
        } else {
            continue; // if the input is the same as the output, continue the loop
        }
    }
}
while (tr instanceof Promise) tr = await tr; // just to make sure...
msg.channel.send(tr); // and sends the message!
