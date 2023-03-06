const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv/config");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on("ready", () => {
  console.log("the bot is ready");
});

client.on("messageCreate", (message) => {
  //get channel category name for differentiating between main channels and sub channels by category
  var chanCategory = message.channel.parent.name;

  //vars of all possible commands
  var splitCom = ".split";
  var split4Com = ".split4";
  var hhCom = ".hh";

  //if category is a main channel category i.e. general do something otherwise do other commands by else
  if (chanCategory.toLowerCase() === "general" || chanCategory.toLowerCase() === "lost ark; server una") {
    if (message.content.startsWith(splitCom) || message.content.startsWith(hhCom)) {
      message.reply("These commands are not active in the main channels");
    }
  } else {
    // if category is not a main channel instead...
    if (message.content.toLowerCase() === splitCom) {
      message.reply("The correct syntax is:\n .split `X` \n where `X` is the value to split among the 8 people ");
    } else if (message.content.startsWith(splitCom + " ")) {
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
        value = value - tax;

        // gold awarded to bidder is split by X <= 2000; 2000> X <5000; and X > 5000
        // to award a split generally between 75 and 200 gold average
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
    } else if (message.content.startsWith(split4Com)) {
      let parameters = message.content.split(" ");
      for (let i = 0; i < parameters.length; i++) {
        console.log("Parameter " + i + " equals " + parameters[i]);
      }
      if (parameters.length == 1 || parameters.length >= 3) {
        message.reply("The correct syntax is:\n .split4 `X` \n where `X` is the value to split among the 4 people ");
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

        if (even_split == -1 || com_split == -1 || !Number.isInteger(even_split)) {
          message.reply("The correct syntax is:\n .split `X` \n where `X` is the value to split among the 4 people ");
        } else {
          message.reply("Even split bid = `" + even_split + "`");
        }
      }
    }
  }

  /// functions below this line work in all channels

  if (message.content.toString() === hhCom) {
    message.reply("https://youtu.be/_swfdQOBMjc");
  }
});

client.login(process.env.TOKEN);
