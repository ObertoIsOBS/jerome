const Discord = require('discord.js');
const client = new Discord.Client();
const {Client, RichEmbed} = require('discord.js');
const eco = require("discord-economy");
const dl = require('discord-leveling');
const fs = require("fs");
const ms = require("ms");
const profanities = require('profanities');
var modbot = require('discord-moderator-bot');
var weather = require('weather-js');
const settings = {
  prefix: 'j.',
}

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
  console.log('I am ready!');
  console.log(client.guilds.name);
});

client.on('error', console.error);



//Profanity
client.on('message', message => {
for (x = 0; x < profanities.length; x++) {
	if (message.content.toUpperCase() == profanities[x].toUpperCase()) {
		message.channel.send('Boi! Dont Swear!')
		message.delete()
		return;
	}
 }
}); 	

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server my name is Jerome I was made by OSXNuggets, ${member}`);
  member.send('Welcome to the server!');
});

client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`${member.guild.tag} has left the server :(`);
});

//Messages Respond
client.on('message', message => {
  if (message.content === 'hi') {
    message.channel.send('sup');
  }
  
  if (message.content === 'oof') {
    message.channel.send('oof!');
  }

  if (message.content === 'ha') {
    message.channel.send('gottem');
  }  

 if (message.content === 'your mom') {
 message.reply('no ur mom');
 } 

 if (message.content === 'ping') {
 message.reply('pong');
 }
  
  if (message.content === 'j.guilds') {
  	message.channel.send(`${client.guilds.size}`);
 } 	

  if (message.content === 'hello') {
    message.channel.send('Hey');
  }  
  
  if (message.content === 'j.clear') {
        if (message.author.bot) return;
        async function clear() {
            message.delete();
            const fetched = await message.channel.fetchMessages({limit: 99});
            message.channel.bulkDelete(fetched);
        }
        clear();
    }
 
 if (message.content === 'j.help') {	
  	if (message.author.bot) return;
  const embed = new RichEmbed()
  .setAuthor(`${client.user.tag}`)
  .setDescription(`**All commands use the prefix "j."**`)
  .addField('Money Commands',`
- "balance/bal" displays your balance
- "daily" collects your daily
- "dice" rolls a dice for money
- "coinflip" flips a coin for money
- "transfer" gives another user money
- "work [storekeeper or cashier]" can give you money
- "delete" (admin only) deletes all of specified users money`, true)
.addField('XP Commands',`
- "profile" Shows your level and XP
 **The Leaderboard Command is being fixed**`, true)
.addField('Moderation Commands',`
**In order to use commands here, you must have the permission of what the bot is doing.**
- "clear" clears last 99 messages sent
- "warn" warns mentioned member | Manage Messages perm is required for this command.
- "kick" kicks mentioned member
- "ban" bans mentioned member
- "suggest" suggest a command or bug fix. Use: j.suggest [suggestion]`, true)
  .addField('Bug Fixes',`
  	-Required Permission Bug: Solved
  	-Missing Permissions: Solved, Wrong bot invite link provided on dbl
  	**Make sure to give Jerome Administrator Permission**
  	-If there is a bug pls let me know on the support server`)
  .addField('Command Suggestions', 'Please let me know if you have any command suggestions. Using the "j.suggest" command')
  .setFooter('commands updated 4/20/2019')
  .setColor(0xe0b533)
message.channel.send(embed);
 }
});

//kick
client.on('message', message => {

 //This is the log channel 
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "j.kick"
  if (message.content.startsWith('j.kick')) {
    // Check permissions
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('You dont have permission to do this!');     
    // Assuming we mention someone in the message, this will return the user
//must have kick members perm
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
            member.send('You\'ve been kicked from the server.');       
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Successfully kicked ${user.tag}`); 

        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to kick the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }

 if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('j.ban')) {
    //Check permissions
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You dont have permission to do this!');    
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
         */
            member.send('You\'ve been banned from the server.');       
        member.ban({
          reason: 'Reason',
        }).then(() => {
          // We let the message author know we were able to ban the person
          message.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to ban the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    } else {
    // Otherwise, if no user was mentioned
      message.reply('You didn\'t mention the user to ban!');
    }
  }
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('j.mute')) {

 let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
var muteembed = new Discord.RichEmbed()
.setTitle('Member Muted')
.setAuthor(client.user.tag, client.user.avatarURL)
.addField('Moderator', message.author)
.addField('Reason', 'Mute Command')
.addField('User', tomute)
.setFooter(tomute.id)
.setTimestamp();
 logchannel.send(muteembed);  
  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


}
}); 
client.on("messageDelete", (messageDelete) => {
 const channel = messageDelete.guild.channels.find(ch => ch.name === 'jlogs');
  if (!channel) return;
    const embed = new RichEmbed()
    .setTitle('Message Deleted')
    .setColor(0xd81313)
    .setDescription(`The message : "${messageDelete.content}" in ${messageDelete.channel} by ${messageDelete.author} was deleted.`) 
    .addField('User ID', messageDelete.author.id)
    .setAuthor(messageDelete.author.username, messageDelete.author.avatarURL) 
    .setFooter(messageDelete.author.id)
    .setTimestamp();
channel.send(embed);
});

client.on('ready', () => {
	client.user.setActivity("j.help | Prefix is j.");
});
//economy$$$

 
//Whenever someone types a message this gets activated.
//(If you use 'await' in your functions make sure you put async here)
client.on('message', async message => {
 
  //This reads the first part of your message behind your prefix to see which command you want to use.
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
 
  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);
 
  //If the message does not start with your prefix return.
  //If the user that types a message is a bot account return.
  if (!message.content.startsWith(settings.prefix) || message.author.bot) return;


  if (command === 'balance') {
 
    var output = await eco.FetchBalance(message.author.id)
    message.channel.send(`Hey ${message.author.tag}! You own ${output.balance} :dollar: .`);
  }

  if (command === 'bal') {
  	var output = await eco.FetchBalance(message.author.id)
    message.channel.send(`Hey ${message.author.tag}! You own ${output.balance} :dollar: .`);
  }


 
  if (command === 'daily') {
 
    var output = await eco.Daily(message.author.id)
    //output.updated will tell you if the user already claimed his/her daily yes or no.
 
    if (output.updated) {
 
      var profile = await eco.AddToBalance(message.author.id, 100)
      message.reply(`You claimed your daily coins succesfully! You now own ${profile.newbalance} :dollar: .`);
 
    } else {
      message.channel.send(`Sorry, you already claimed your daily :dollar: !\nBut no worries, over ${output.timetowait} you can daily again!`)
    }
 
  }
 
  if (command === 'resetdaily') {
 
    var output = await eco.ResetDaily(message.author.id)
 
    message.reply(output) //It wil send 'Daily Reset.'
 
  }

  if (command === 'transfer') {
 
    var user = message.mentions.users.first()
    var amount = args[1]
 
    if (!user) return message.reply('Reply the user you want to send :dollar: to!')
    if (!amount) return message.reply('Specify the amount you want to pay!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have less coins than the amount you want to transfer!')
 
    var transfer = await eco.Transfer(message.author.id, user.id, amount)
    message.reply(`Transfering :dollar: succesfully done!\nBalance from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`);
  }
 
  if (command === 'coinflip') {
 
    var flip = args[0] //Heads or Tails
    var amount = args[1] //Coins to gamble
 
    if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Pls specify the flip, either heads or tails!')
    if (!amount) return message.reply('Specify the amount you want to gamble!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have less :dollar: than the amount you want to gamble!')
 
    var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
    message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)
 
  }
 
  if (command === 'dice') {
 
    var roll = args[0] //Should be number between 1 and 6
    var amount = args[1] //Coins to gamble
 
    if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Specify the roll, it should be a number between 1-6')
    if (!amount) return message.reply('Specify the amount you want to gamble!')
 
    var output = eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have less :dollar: than the amount you want to gamble!')
 
    var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
    message.reply(`The dice rolled ${gamble.dice}. So you ${gamble.output}! New balance: ${gamble.newbalance}`)
 
  }

 
  if (command == 'delete') { //You want to make this command admin only!
 
    var user = message.mentions.users.first()
    if (!user) return message.reply('Pls, Specify a user I have to delete in my database!')
 
    if (!message.guild.me.hasPermission(`ADMINISTRATION`)) return message.reply('You need to be admin to execute this command!')
 
    var output = await eco.Delete(user.id)
    if (output.deleted == true) return message.reply('Succesfully deleted the user out of the database!')
 
    message.reply('Error: Could not find the user in database.')
 
  }
 
  if (command === 'work') { //I made 2 examples for this command! Both versions will work!
 
    var output = await eco.Work(message.author.id, {
      failurerate: 10,
      money: Math.floor(Math.random() * 500),
      jobs: ['cashier', 'shopkeeper']
    })
    //10% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
    if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!')
 
    message.channel.send(`${message.author.username}
You worked as a \` ${output.job} \` and earned :dollar: ${output.earned}
You now own ${output.balance}`)
 
  }

});

//xp commands

client.on('message', async message => {
 
  //This reads the first part of your message behind your prefix to see which command you want to use.
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
 
  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);
 
  //If the user that types a message is a bot account return.
  if (message.author.bot) return;
 
  //When someone sends a message add xp
  var profile = await dl.Fetch(message.author.id)
  dl.AddXp(message.author.id, 10)
  //If user xp higher than 100 add level
  if (profile.xp + 10 > 100) {
    await dl.AddLevel(message.author.id, 1)
    await dl.SetXp(message.author.id, 0)
    message.reply(`You just leveled up!! You are now level: ${profile.level + 1}`)
  }
 
  //If the message does not start with your prefix return.
  if (!message.content.startsWith(settings.prefix)) return;
 
  if (command === 'profile') {
 
    var user = message.mentions.users.first() || message.author
 
    var output = await dl.Fetch(user.id)
    message.channel.send(`Hey ${user.tag}! You have ${output.level} level(s)! and ${output.xp} xp!`);
  }
 
  if (command === 'setxp') {
 
    var amount = args[0]
    var user = message.mentions.users.first() || message.author
 
    var output = await dl.SetXp(user.id, amount)
    message.channel.send(`Hey ${user.tag}! You now have ${amount} xp!`);
  }
 
  if (command === 'setlevel') {
 
    var amount = args[0]
    var user = message.mentions.users.first() || message.author
 
    var output = await dl.SetLevel(user.id, amount)
    message.channel.send(`Hey ${user.tag}! You now have ${amount} levels!`);
  }
 
  if (command === 'leaderboard') {
 
    //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
    if (message.mentions.users.first()) {
 
      var output = await dl.Leaderboard({
        search: message.mentions.users.first().id
      })
      message.channel.send(`The user ${message.mentions.users.first().tag} is number ${output.placement} on my leaderboard!`);
 
      //Searches for the top 3 and outputs it to the user.
    } else {
 
      dl.Leaderboard({
        limit: 3
      }).then(async users => { //make sure it is async
 
        var firstplace = await client.fetchUser(users[0].userid) //Searches for the user object in discord for first place
        var secondplace = await client.fetchUser(users[1].userid) //Searches for the user object in discord for second place
        var thirdplace = await client.fetchUser(users[2].userid) //Searches for the user object in discord for third place
 
        message.channel.send(`My leaderboard:
 
1 - ${firstplace.tag} : ${users[0].level} : ${users[0].xp}
2 - ${secondplace.tag} : ${users[1].level} : ${users[1].xp}
3 - ${thirdplace.tag} : ${users[2].level} : ${users[2].xp}`)
 
      })
 
    }
  }
 
});

//weather
  client.on('message', message => {
var msg = message.content.toUpperCase();
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
 
  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);
    if (!message.content.startsWith(settings.prefix)) return;
  if (command === 'weather') {
  weather.find({search: args.join(''), degreeType: 'F'}, function(err, result) {
  if(err) message.channel.send(err);
 
  var current = result[0].current;
  var location = result[0].location;

    const embed = new Discord.RichEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Weather for ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor(0x9b18af)
      .addField('Timezone', `UTC${location.timezone}`, true)
      .addField('Degree Type',location.degreetype, true)
      .addField('Temperature',`${current.temperature} Degrees`, true) 
      .addField('Feels Like', `${current.feelslike} Degrees`, true)
      .addField('Winds',current.winddisplay, true)
      .addField('Humidity', `${current.humidity}%`, true)

      message.channel.send(embed);  

       });
    }
}); 


 client.on('message', message => {
var msg = message.content.toUpperCase();
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
 
  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);
    if (!message.content.startsWith(settings.prefix)) return;  
    if (command ==='announce') {
    	message.delete();
    	message.channel.send(`Announcement: @everyone ${args.join(' ')}`);
       }
if (!message.content.startsWith(settings.prefix)) return;
if (command ==='suggest') {
message.delete();
const suggestembed = new Discord.RichEmbed()
 .setTitle('Command Suggestion')
 .setAuthor(message.author.tag)
 .setThumbnail(message.author.avatarURL)
 .addField('User', message.author)
 .addField('Suggestion', `Reason: ${args.join(' ')}`)
 .setTimestamp()
 .setColor(0x42f4dc);


client.users.get("537808581496537108").send(suggestembed);

const succesfulembed = new Discord.RichEmbed()
.setTitle('Suggestion Succesful!')
.setColor(0x42f4dc);

message.channel.send(succesfulembed);
}

    if (!message.content.startsWith(settings.prefix)) return;  
    if (command ==='warn') {
    var embedColor = '#e5f442' // Change this to change the color of the embeds!
    
    var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Insufficient Permissions!')
        .setDescription('You need the `MANAGE_MESSAGES` permission to use this command!')
        .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `warn [@User] [Reason]')
        .setTimestamp();
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
    let mentioned = message.mentions.users.first(); // Gets the user mentioned!
    if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
    if(!reason) return message.channel.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning
    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`You've been warned in ${message.guild.name}`)
        .addField('Warned by', message.author.tag)
        .addField('Reason', reason)
        .setTimestamp();
    mentioned.send(warningEmbed); // DMs the user the above embed!
    var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
        .setColor(embedColor)
        .setTitle('User Successfully Warned!');
    message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
    message.delete(); // Deletes the command
const logchannel = message.guild.channels.find(ch => ch.name === 'jlogs');
var warninglogEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Warn!`)
        .addField('User', mentioned.tag)
        .addField('Moderator', message.author.tag)
        .addField('Reason', reason)
        .setTimestamp();
    logchannel.send(warninglogEmbed);
}  
});



 // Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('token');
