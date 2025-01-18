const axios = require('axios');

module.exports = {
    name: 'Ai2',
    description: 'ahhh basta ai ok nayun',
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const input = args.join(' ');

        if (!input) {
            api.sendMessage(
                `✰𝐃𝐀𝐕𝐁𝐎𝐓✰\n●═════❍═════●\n\nI am an AI developed by  𝐃𝐀𝐕𝐈𝐃 𝐌𝐏 i am here to assist you with any questions or tasks you may have.\n\nUsage: ai [your question]`,
                event.threadID,
                event.messageID
            );
            return;
        }

        api.sendMessage(`Processing your request...`, event.threadID, event.messageID);

        try {
            const { data } = await axios.get(`https://selected-tamiko-joshua132-23ef32c6.koyeb.app/gpt4?query=${encodeURIComponent(input)}`);
            
            if (!data || !data.respond) {
                throw new Error('Ayaw mag response ang gago');
            }
            
            const response = data.respond;

            const options = { timeZone: 'Asia/Manila', hour12: true };
            const timeString = new Date().toLocaleString('en-US', options);

            const finalResponse = ` ➪ 𝐑𝐄𝐏𝐎𝐍𝐒𝐄 \n━━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${input}\n━━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${response}\n\n𝐆𝐀𝐁: ${timeString}\n\n𝐅𝐎𝐋𝐋𝐎𝐖 𝐓𝐇𝐄 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑: https://www.facebook.com/profile.php?id=100092277325670\n https://www.facebook.com/profile.php?id=61550884726891\n\n𝐀𝐔𝐓𝐎𝐁𝐎𝐓 𝐋𝐈𝐍𝐊: contact admin`;
            api.sendMessage(finalResponse, event.threadID, event.messageID);
        } catch (error) {
            let errorMessage = 'An error occurred while processing your request, please try sending your question again.';
            
            if (error.response && error.response.data) {
                errorMessage = `API returned an error: ${error.response.data.message}`;
            } else if (error.message) {
                errorMessage = `Error: ${error.message}`;
            }
            
            api.sendMessage(errorMessage, event.threadID, event.messageID);
            console.error(error);
        }
    },
};
