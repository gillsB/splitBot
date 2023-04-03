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
  var split2Com = ".split2";
  var split3Com = ".split3";
  var split4Com = ".split4";
  var split5Com = ".split5";
  var split6Com = ".split6";
  var split7Com = ".split7";
  var splitHelpCom = ".split?";
  var hhCom = ".hh";

  //functions

  //if category is a main channel category i.e. general do something otherwise do other commands by else
  if (chanCategory.toLowerCase() === "general" || chanCategory.toLowerCase() === "lost ark; server una") {
    if (message.content.startsWith(splitCom) || message.content.startsWith(hhCom)) {
      message.reply("These commands are not active in the main channels");
    }
  } else {
    // if category is not a main channel instead roll through all possible commands
    if (message.content.toLowerCase() === splitCom) {
      message.reply("The correct syntax is:\n .split `X` \n where `X` is the value to split among the 8 people ");
    } else if (message.content.startsWith(splitCom + " ")) {
      let parameters = message.content.split(" ");
      splitCommand(parameters);
    } else if (message.content.startsWith(split4Com)) {
      let parameters = message.content.split(" ");
      split4Command(parameters);
    } else if (message.content.startsWith(split2Com)) {
      let parameters = message.content.split(" ");
      splitExtra(2, parameters);
    } else if (message.content.startsWith(split3Com)) {
      let parameters = message.content.split(" ");
      splitExtra(3, parameters);
    } else if (message.content.startsWith(split5Com)) {
      let parameters = message.content.split(" ");
      splitExtra(5, parameters);
    } else if (message.content.startsWith(split6Com)) {
      let parameters = message.content.split(" ");
      splitExtra(6, parameters);
    } else if (message.content.startsWith(split7Com)) {
      let parameters = message.content.split(" ");
      splitExtra(7, parameters);
    }

    function splitCommand(parameters) {
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
    }

    function split4Command(parameters) {
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
          message.reply("The correct syntax is:\n .split4 `X` \n where `X` is the value to split among the 4 people ");
        } else {
          message.reply("Even split bid = `" + even_split + "`");
        }
      }
    }

    function splitExtra(amount, parameters) {
      for (let i = 0; i < parameters.length; i++) {
        console.log("Parameter " + i + " equals " + parameters[i]);
      }
      if (parameters.length == 1 || parameters.length >= 3) {
        message.reply("The correct syntax is:\n .split" + amount + " `X` \n where `X` is the value to split among the " + amount + " people ");
      } else if (parameters.length == 2) {
        let people = amount;
        let value = parameters[1];
        let value_taxed = -1;
        let even_split = -1;
        let tax = 0;
        let split_per_person = -1;
        let split_per_person_taxed = -1;

        split_per_person = Math.floor(value / people);

        tax = value * 0.05;
        console.log(tax);
        value_taxed = value - tax;
        console.log(value);

        even_split = Math.floor(value_taxed - value_taxed / people);
        split_per_person_taxed = Math.floor(value_taxed / people);

        if (even_split == -1 || !Number.isInteger(even_split)) {
          message.reply("The correct syntax is:\n .split" + amount + " `X` \n where `X` is the value to split among the " + amount + " people ");
        } else {
          message.reply(
            "Even split bid = `" +
              even_split +
              "`\nNon Taxed split per person = `" +
              split_per_person +
              "`" +
              "\nAfter tax raw gold = `" +
              value_taxed +
              "`" +
              "\nGold per person after tax = " +
              "`" +
              split_per_person_taxed +
              "`"
          );
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
