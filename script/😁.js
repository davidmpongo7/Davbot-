const axios = require('axios');

module.exports.config = {
		name: '😁',
		version: '1.0.0',
		role: 0,
		hasPrefix: false,
		description: "An AI command powered by OpenAI",
		usages: "",
		credits: 'Developer',
		cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
		if (!args[0]) {
				api.sendMessage("quel bêtise tu as encore fait 😒", event.threadID);
				return;
		}

		const question = args.join(" ");
		const apiUrl = `https://openai-rest-api.vercel.app/hercai?ask=${encodeURIComponent(question)}&model=v3`;

		try {
				const response = await axios.get(apiUrl);
				api.sendMessage(response.data.reply, event.threadID);
		} catch (error) {
				console.error("Error fetching response from OpenAI API:", error);
				api.sendMessage("An error occurred while processing your request. Please try again later.", event.threadID);
		}
};
