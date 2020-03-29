acceptInvite = async (code, client) => {
        const inviteEndpoint = 'https://discordapp.com/api/v6/invite/';
        request.post({
            url: `${inviteEndpoint}${code}`,
            headers: {
                Authorization: client.token
            }
        }, async (err, response, body) => {
            return console.log(`${client.user.tag}: ${body || err}`);
        });
    },
/* This is only available on user accounts.
Automating user accounts, or "selfbots", are against
the Discord TOS. I am not responsible if your
account gets compromised due to this. */
