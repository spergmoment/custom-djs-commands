String.prototype.toRandomCase = () => {
    let strArr = this.split("");
    let newStr = "";
    strArr.forEach(s => {
        if (Math.random() > 0.5) {
            newStr += s.toUpperCase();
        } else {
            newStr += s.toLowerCase();
        }
    });
    return newStr;
};
msg.channel.send(args.join(" ").toRandomCase());
