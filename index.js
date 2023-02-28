const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv/config");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on("ready", () => {
  console.log("the bot is ready");
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(".split ")) {
    let parameters = message.content.split(" ");
    for (let i = 0; i < parameters.length; i++) {
      console.log("Parameter " + i + " equals " + parameters[i]);
    }
    if (parameters.length == 1 || parameters.length >= 4) {
      message.reply("The correct syntax is:\n .split `X` \n where `X` is the value to split among the 8 people ");
    } else if (parameters.length == 2) {
      let people = 8;
      let value = parameters[1];
      let even_split = -1;
      let com_split = -1;
      let tax = 0;
      tax = value * 0.05;
      console.log(tax);
      value = value - tax;
      console.log(value);

      if (parameters[1] <= 2000) {
        even_split = Math.floor(value - value / people);
        com_split = Math.floor(value - value / (people - 3));
      } else if (parameters[1] > 5000) {
        even_split = Math.floor(value - value / people);
        com_split = Math.floor(value - value / (people - 1));
      } else {
        even_split = Math.floor(value - value / people);
        com_split = Math.floor(value - value / (people - 2));
      }
      if (even_split == -1 || com_split == -1 || !Number.isInteger(even_split)) {
        message.reply("The correct syntax is:\n .split `X` \n where `X` is the value to split among the 8 people ");
      } else {
        message.reply("Assumed default of 8 people \nEven split bid = `" + even_split + "` \nSmall commission split bid = `" + com_split + "`\nCommission profit = " + (even_split - com_split));
      }
    }
  } else if (message.content.startsWith(".split4 ")) {
    let parameters = message.content.split(" ");
    for (let i = 0; i < parameters.length; i++) {
      console.log("Parameter " + i + " equals " + parameters[i]);
    }
    if (parameters.length == 1 || parameters.length >= 4) {
      message.reply("The correct syntax is:\n .split `X` \n where `X` is the value to split among the 4 people ");
    } else if (parameters.length == 2) {
      let people = 4;
      let value = parameters[1];
      let even_split = -1;
      let com_split = -1;
      let tax = 0;
      tax = value * 0.05;
      console.log(tax);
      value = value - tax;
      console.log(value);

      even_split = Math.floor(value - value / people);
      com_split = Math.floor(value - value / (people - 1));

      if (even_split == -1 || com_split == -1) {
        message.reply("The correct syntax is:\n .split `X` \n where `X` is the value to split among the 4 people ");
      } else {
        message.reply("Even split bid = `" + even_split + "`");
      }
    }
  }
});

client.login(process.env.TOKEN);
