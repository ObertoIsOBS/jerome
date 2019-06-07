const Discord = require('discord.js');
const client = new Discord.Client();
const {Client, RichEmbed} = require('discord.js');
const package = require('./package.json');
const eco = require("discord-economy");
const dl = require('discord-leveling');
const fs = require("fs");
const ms = require("ms");
const SelfReloadJSON = require('self-reload-json');
const profanities = require('profanities');
const racialSlur = require('./racial-slur');
const snekfetch = require('snekfetch');
let settingsFile = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));
let settings = new SelfReloadJSON(__dirname + '/settings.json');
let modlog = new SelfReloadJSON(__dirname + '/modlog.json');
let welcome = new SelfReloadJSON(__dirname + '/welcome.json');
var weather = require('weather-js');
const config = require('./config.json');
let cooldown = new Set();
let cdseconds = 5;
client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
  console.log('I am ready!');
  console.log(client.guilds.size);

})


client.on('message', message => {
  if (!message.guild) return; 

    if(!settings[message.guild.id]){
    settings[message.guild.id] = {
    	prefix: config.prefix
    };
   
client.on('error', console.error);

let prefix = settings[message.guild.id].prefix;

}
});



client.on('error', console.error);

//custom prefix  

   client.on('message', async message => {
let prefix = settings[message.guild.id].prefix;
 var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
    var args = message.content.split(' ').slice(1);
  if (!message.guild) return console.log('Command Used in DM\'s'); 
   if (!message.content.startsWith(prefix) || message.author.bot) return;
   if (command ==='prefix') {
   	if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply('You do not have permission to do this! You need \`Mannage Server\` permission.');
   	if(!args[0]) return message.reply('You didn\'t specify a prefix');
message.reply(`**Prefix was changed!**`);

   	let settings = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));
    settings[message.guild.id] = {
    	prefix: args[0]
    };
    
    fs.writeFile('./settings.json', JSON.stringify(settings), (err) => {
    if(err) console.log(err);
});


}
}); 	

// custom modlog
   client.on('message', async message => {
let prefix = settings[message.guild.id].prefix;
 var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
    var args = message.content.split(' ').slice(1);
  if (!message.guild) return console.log('Command Used in DM\'s'); 
   if (!message.content.startsWith(prefix) || message.author.bot) return;
   if (command ==='setup-modlog') {
   	if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply('You do not have permission to do this! You need \`Mannage Server\` permission.');
   	if(!args[0]) return message.reply('You didn\'t specify a channel');
message.reply(`**Channel Set!**`);

   	let modlog = JSON.parse(fs.readFileSync('./modlog.json', 'utf8'));
    modlog[message.guild.id] = {
    	channel: args[0]
    };
    
    fs.writeFile('./modlog.json', JSON.stringify(modlog), (err) => {
    if(err) console.log(err);
});


}
}); 



   client.on('message', async message => {
let prefix = settings[message.guild.id].prefix;
 var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
    var args = message.content.split(' ').slice(1);
  if (!message.guild) return console.log('Command Used in DM\'s'); 
   if (!message.content.startsWith(prefix) || message.author.bot) return;
   if (command ==='setup-welcome') {
   	if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply('You do not have permission to do this! You need \`Mannage Server\` permission.');
   	if(!args[0]) return message.reply('You didn\'t specify the channel!');
   	if(!args[1]) return message.reply('You didn\'t specify the message!');
message.reply(`**Welcome Setup!**`);

   	let file = JSON.parse(fs.readFileSync('./welcome.json', 'utf8'));
    welcome[message.guild.id] = {
    	channel: args[0],
    	message: args.slice(1).join(' ')
    };
    
    fs.writeFile('./welcome.json', JSON.stringify(welcome), (err) => {
    if(err) console.log(err);
});


}
}); 

//Profanity
client.on('message', message => {
if (message.author.id === '537808581496537108') return;
if (message.guild.id === '551351989124988933') return;
if (message.author.bot) return;
for (x = 0; x < profanities.length; x++) {
	if (message.content.includes(profanities[x])) {
		message.channel.send('Boi! Dont Swear!')
		message.delete()
		return;
	}
 }
}); 

//Racial Slur
client.on('message', message => {
if (message.author.bot) return;
for (x = 0; x < racialSlur.length; x++) {
	if (message.content.includes(racialSlur[x])) {
		message.channel.send('Boi! Dont Swear!')
		message.delete();
	}
 }
}); 	

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  if (!member.guild) return;
  // Send the message to a designated channel on a server:
  let welcomeChannelName = welcome[member.guild.id].channel;
  if (error) return;
let welcomeMessage = welcome[member.guild.id].message;
  const channel = member.guild.channels.find(ch => ch.name === welcomeChannelName);
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`${welcomeMessage}, ${member}`);
  member.send(`Welcome to ${member.guild}`);
});

client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`**${member.displayName}** has left the server :(`);
});

//Messages Respond
client.on('message', message => {
let prefix = settings[message.guild.id].prefix;
 
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

if (message.content === '<@547978397163192320> prefix') {
	message.reply(`this servers prefix is \`${prefix}\``);

}

 if (message.content === `${prefix}ping`) {
 message.reply(`pong \`${client.pings.length}ms\``);
 }
  
  if (message.content === `${prefix}guilds`) {
  	message.channel.send(`${client.guilds.size}`);
 } 	

  if (message.content === 'hello') {
    message.channel.send('Hey');
  }  
 
  if (message.content === 'j.clear') {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You dont have permission to do this!');       
        if (message.author.bot) return;
        async function clear() {
            message.delete();
            const fetched = await message.channel.fetchMessages({limit: 99});
            message.channel.bulkDelete(fetched);
        }
        clear();
    }
 
 if (message.content === `${prefix}help`) {	
  	if (message.author.bot) return;
   if (!message.guild) return console.log('Command Used in DM\'s');  
  const embed = new RichEmbed()
  .setAuthor(`${client.user.tag}`)
  .setDescription(`**Your server prefix is \`${prefix}\`**`)
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
- "ping" sends the ping in ms
- "clear" Clears messages | Usage: \`${prefix}\`clear [amount]
- "warn" warns mentioned member | Manage Messages perm is required for this command.
- "kick" kicks mentioned member
- "ban" bans mentioned member
- "suggest" suggest a command or bug fix. | Usage: \`${prefix}\`suggest [suggestion]
- "status" shows current status of the bot
- "prefix" sets the server prefix | Usage: \`${prefix}\`prefix [new prefix]
- "setup" shows help for setting up guild settings.
- "settings" shows you'r guilds settigs.`, true)
  .addField('Fun', `
  	- "meme" sends a random dank meme from Reddit`)
  .addField('Bug Fixes',`
  	-Required Permission Bug: Solved
  	-Missing Permissions: Solved, Wrong bot invite link provided on dbl
  	**Make sure to give Jerome Administrator Permission**
  	-If there is a bug pls let me know on the support server`)
  .addField('Command Suggestions', `Please let me know if you have any command suggestions. Using the "\`${prefix}\`suggest" command`)
  .setFooter('commands updated 5/13/2019')
  .setColor(0xe0b533)
message.author.send(embed);
message.react('📩');
 }
});

//kick
client.on('message', message => {
let prefix = settings[message.guild.id].prefix;
  var args = message.content.split(' ').slice(1);
 
 //This is the log channel 
  // Ignore messages that aren't from a guild
  if (!message.guild) return console.log('Command Used in DM\'s'); 

  // If the message content starts with "j.kick"
  if (message.content.startsWith(`${prefix}kick`)) {
    // Check permissions
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('You dont have permission to do this!');     
    // Assuming we mention someone in the message, this will return the user
//must have kick members perm
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
     
     let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word   
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
            member.send(`**You\'ve been kicked from** \`${message.guild}\` **for:**${reason}`);       
        member.kick(reason).then(() => {
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

  if (!message.guild) return console.log('Command Used in DM\'s'); 
  // if the message content starts with "!ban"
  if (message.content.startsWith(`${prefix}ban`)) {
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
            member.send(`**You\'ve been banned from** \`${message.guild}\` **for:**${reason}`);       
        member.ban({
          reason: reason,
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
  if (!message.guild) return console.log('Command Used in DM\'s'); 

  // if the message content starts with "!ban"
  if (message.content.startsWith(`${prefix}mute`)) {

 let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_GUILD")) return message.reply("Can't mute them!");
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
let modlogName = modlog[messageDelete.guild.id].channel;
  const modlogChannel = messageDelete.guild.channels.find(ch => ch.name === modlogName);
  if (!modlogChannel) return;
    const embed = new RichEmbed()
    .setTitle(`Message Deleted in #${messageDelete.channel.name}`)
    .setColor(0xd81313)
    .addField('Message', messageDelete.content) 
    .addField('User', messageDelete.author)
    .addField('User ID', messageDelete.author.id)
    .setAuthor(messageDelete.author.username, messageDelete.author.avatarURL) 
    .setFooter(messageDelete.author.id)
    .setTimestamp();
modlogChannel.send(embed);
});


client.on('ready', () => {
client.user.setActivity('jeromebot.gq | j.help', { type: 'WATCHING' });
});
//set activity command
   client.on('message', async message => {
 let prefix = settings[message.guild.id].prefix;
 var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
    var args = message.content.split(' ').slice(1);
   if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.author.id !== '537808581496537108') return;
if (command ==='setpresence') {

client.user.setActivity(args.join(' '));

message.reply('Presence Updated!');
}

if (command =='resetpresence') {
client.user.setActivity('Prefix j. | j.help', { type: 'WATCHING' });
message.reply('Done!');
}

if (command ==='setstatusstream') {
    client.user.setActivity(args.join(' '), { type: "STREAMING", url: "https://www.twitch.tv/discord-jerome" });
message.reply('status set!');

}

if (command ==='setstatus-online') {

    client.user.setStatus("online");
message.reply('status set!');

}

if (command ==='setstatus-idle') {

client.user.setStatus("idle");    

message.reply('status set!');

}

if (command ==='setstatus-dnd') {
	client.user.setStatus("dnd");

message.reply('status set!');

}

if (command ==='setstatus-invis') {
	client.user.setStatus("invisible");

message.reply('status set!');

}
});

client.on('message', async message => {
 let prefix = settings[message.guild.id].prefix;
 var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
    var args = message.content.split(' ').slice(1);
   if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (!message.guild) return console.log('Command Used in DM\'s'); 

if (command ==='clear') {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You dont have permission to do this!');  
        if (message.author.bot) return;
        async function clear() {
            message.delete();
            const fetched = await message.channel.fetchMessages({limit: args.join(' ')});
            message.channel.bulkDelete(fetched);
        }
        clear();
    }
});
//economy$$$

 
//Whenever someone types a message this gets activated.
//(If you use 'await' in your functions make sure you put async here)
client.on('message', async message => {
 
 let prefix = settings[message.guild.id].prefix;
  //This reads the first part of your message behind your prefix to see which command you want to use.
  var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
 
  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);
 
   if (!message.guild) return console.log('Command Used in DM\'s'); 

 var cooldownEmbed = new Discord.RichEmbed()
 .setTitle('Command Cooldown')
 .setAuthor(client.user.tag, client.user.avatarURL)
 .setTimestamp()
 .setDescription('Woah, way to fast there!')
 .addField('Command Type', 'Economy')
 .addField('Command', `\`${command}\``)
 .addField('Cooldown', "\`5 seconds\`")
 .setColor(0xf44274);
  //If the message does not start with your prefix return.
  //If the user that types a message is a bot account return.
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.channel.send(cooldownEmbed);
  }
  if(!cooldown.has(message.author.id)){
    cooldown.add(message.author.id);
  }

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

   

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
    var output = await eco.FetchBalance(message.author.id)
    var user = message.mentions.users.first()
    var amount = args[1]
 if (args[1] = "max") amount = (output.balance);
    if (!user) return message.reply('Reply the user you want to send :dollar: to!')
    if (!amount) return message.reply('Specify the amount you want to pay!')
 

    if (output.balance < amount) return message.reply('You have less coins than the amount you want to transfer!')
 
    var transfer = await eco.Transfer(message.author.id, user.id, amount)
    message.reply(`Transfering :dollar: succesfully done!\nBalance from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`);
  }


 
  if (command === 'coinflip') {
  	var output = await eco.FetchBalance(message.author.id) 
    var flip = args[0] //Heads or Tails
    var amount = args[1] //Coins to gamble
 if (args[1] = "max") amount = (output.balance);
   
    if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Pls specify the flip, either heads or tails!')
    if (!amount) return message.reply('Specify the amount you want to gamble!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have less :dollar: than the amount you want to gamble!')
 
    var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
    message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)
 
  }
 
  if (command === '$leaderboard') {
 
    //If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
    //(message.author.id + message.guild.id) can be your way to store guild based id's
    //filter: x => x.userid.endsWith(message.guild.id)
 
    //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
   if (message.mentions.users.first()) {
 
      var output = await eco.Leaderboard({
        filter: x => x.balance > 50,
        search: message.mentions.users.first().id
      })
      message.channel.send(`The user ${message.mentions.users.first().tag} is number ${output} on my leaderboard!`);
 
    } else {
 
      eco.Leaderboard({
        limit: 5, //Only takes top 3 ( Totally Optional )
        filter: x => x.balance > 50 //Only allows people with more than 100 balance ( Totally Optional )
      }).then(async users => { //make sure it is async
 
        if (users[0]) var firstplace = await client.fetchUser(users[0].userid) //Searches for the user object in discord for first place
        if (users[1]) var secondplace = await client.fetchUser(users[1].userid) //Searches for the user object in discord for second place
        if (users[2]) var thirdplace = await client.fetchUser(users[2].userid) //Searches for the user object in discord for third place
        if (users[3]) var fourthplace = await client.fetchUser(users[3].userid) 
        if (users[4]) var fithhplace = await client.fetchUser(users[4].userid) 
     
    const embed = new RichEmbed()
      .setDescription( `My leaderboard:
 
1 - ${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None'}
2 - ${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'}
3 - ${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'}
4 - ${fourthplace && fourthplace.tag || 'Nobody Yet'} : ${users[3] && users[3].balance || 'None'}
5 - ${fithhplace && fithhplace.tag || 'Nobody Yet'} : ${users[4] && users[4].balance || 'None'}`)
      .setTitle('Leaderboard')
      .setAuthor(`${client.user.tag}`)
      .setColor(0xd6ab48)

      message.channel.send(embed);

      })
 
    }
  }  

  if (command === 'dice') {
  	var output = await eco.FetchBalance(message.author.id) 
    var roll = args[0] //Should be number between 1 and 6
    var amount = args[1] //Coins to gamble
  	 if (args[1] = "max") amount = (output.balance);  
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
      failurerate: 30,
      money: Math.floor(Math.random() * 500),
      jobs: ['cashier', 'shopkeeper', 'youtuber', 'teacher', 'noob']
    })
    //30% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
    if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!') 
    message.channel.send(`${message.author.username}
You worked as a \` ${output.job} \` and earned :dollar: ${output.earned}
You now own ${output.balance}`)
 
  }

});

//xp commands

client.on('message', async message => {
 
 let prefix = settings[message.guild.id].prefix;
  //This reads the first part of your message behind your prefix to see which command you want to use.
  var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
 
  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);
 
  //If the user that types a message is a bot account return.
  if (message.author.bot) return;
 
   if (!message.guild) return console.log('Command Used in DM\'s'); 

  //When someone sends a message add xp
  var profile = await dl.Fetch(message.author.id)
  dl.AddXp(message.author.id, 10)
  //If user xp higher than 100 add level
  if (profile.xp + 10 > 100000) {
    await dl.AddLevel(message.author.id, 1)
    await dl.SetXp(message.author.id, 0)
    message.reply(`You just leveled up!! You are now level: ${profile.level + 1}`)
  }

 
  //If the message does not start with your prefix return.
  if (!message.content.startsWith(prefix)) return;
 
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

 client.on('message', async message => {
let prefix = settings[message.guild.id].prefix;
var msg = message.content.toUpperCase();
  var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
 
  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);
    if (!message.content.startsWith(prefix)) return;  
  if (!message.guild) return console.log('Command Used in DM\'s'); 
   
    if (command ==='announce') {
   if (!args[0]) return message.reply('You didn\'t choose a title.');
   if (!args[1]) return message.reply('You didn\'t specify the announcement');	
    	message.delete();
   const announceEmbed = new Discord.RichEmbed()
   .setAuthor(message.author.username, message.author.avatarURL)
   .setTitle(args[0])
   .setColor(0xd6ab48)
   .setDescription(args.slice(1).join(' '))
   .setTimestamp();
message.delete();
  message.channel.send('@everyone', announceEmbed);

       }

if (!message.content.startsWith(prefix)) return;
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
	
if (command==='meme') {

	        const { body } = await snekfetch
            .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const memeEmbed = new Discord.RichEmbed()
        .setTitle('Meme!')
        .setColor(0x00A2E8)
        .setImage(allowed[randomnumber].data.url);
        message.channel.send(memeEmbed);

}



if (command ==='status') {
const uptime = (client.uptime / 60000);
const statusEmbed = new Discord.RichEmbed()
.setTitle('Jerome Status')
.setAuthor(client.user.tag, client.user.avatarURL)
.addField('This Bots Status', "**ONLINE**")
.addField('Your Server', 'Florent **ONLINE**')
.addField('Problems', 'No issues at this time!')
.addField('Ping', `\`${client.pings.length}ms\``)
.addField('Uptime', `\`${uptime} mins.\``)
.setColor(0x43ce1c)
.setTimestamp()
.setFooter('Made by OSXNuggets 155');
message.channel.send(statusEmbed);

}


if (command ==='setup') {
	const setupEmbed = new Discord.RichEmbed()
	.setTitle('Setup Help')
	.addField('Welcome Messages', `
		**Command:** \`${prefix}setup-welcome\`
		**Usage:** \`${prefix}setup-welcome [channel] [message]\`
		**Example:** \`${prefix}setup-welcome member-log Hey! Welcome to the server!!!\`
		**Parameters:** \${member} - mentions member  \${member.guild} - Displays Guild Name  \${member.tag} - Shows the members name.`)
	.addField('Modlog Channel', `
		**Command:** \`${prefix}setup-modlog\`
		**Usage:** \`${prefix}setup-modlog [channel]\`
		**Example:** \`${prefix}setup-modlog logs\``)
	.setColor(0x42f4dc)
	.setAuthor(client.user.username, client.user.avatarURL)
	.setTimestamp()
	.setFooter('Made by OSX Nuggets');
	message.channel.send(setupEmbed);

}

if (command ==='settings') {
	  const modlogChannelName = modlog[message.guild.id].channel;
	  const modlogChannel = message.guild.channels.find(ch => ch.name === modlog[message.guild.id].channel);
let welcomeChannelName = welcome[message.guild.id].channel;
let welcomeMessage = welcome[message.guild.id].message;
  const welcomeChannel = message.guild.channels.find(ch => ch.name === welcomeChannelName);
  const settingsEmbed = new Discord.RichEmbed()
  .setTitle('This Guilds Settings')
  .addField('Guild Name', `- ${message.guild}`)
  .addField('Prefix', `- ${prefix}`)
  .addField('Logging Channel', `- ${modlogChannelName}`)
  .addField('Welcome Channel', `- ${welcomeChannelName}`)
  .addField('Welcome Message', `- ${welcomeMessage}`)
  .setAuthor(client.user.username, client.user.avatarURL)
  .setTimestamp()
  .setColor(0xd81313)
  .setFooter('Made by OSXNuggets');
  message.channel.send(settingsEmbed);

}

if (command ==='esuggest') {
	message.reply('Done!');
 const channel = client.channels.get('580146755895820298');
 if (!channel) return; 
 channel.send(`${message.author} You'r suggestion was made: ${args.join(' ')} Please wait for your suggestion to be confirmed or denied. |<@537808581496537108>|`);

}

    if (!message.content.startsWith(prefix)) return;  
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
  const modlogChannel = message.guild.channels.find(ch => ch.name === modlog[message.guild.id].channel);
    if(!modlogChannel) return;
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
var warninglogEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Warn!`)
        .addField('User', mentioned.tag)
        .addField('Moderator', message.author.tag)
        .addField('Reason', reason)
        .setTimestamp();
    modlogChannel.send(warninglogEmbed); 

}
});

const setupCMD = "j.createrolemessage";
const initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const embedMessage = `
React to the emoji that matches the role you wish to receive.
If you would like to remove the role, simply remove your reaction!
`;
const embedFooter = "Role Reactions"; // Must set this if "embed" is set to true
const roles = ["Apply"];
const reactions = ["💻"]; // For custom emojis, provide the name of the emoji
const embed = true; // Set to "true" if you want all roles to be in a single embed
const embedColor = "#dd2423"; // Set the embed color if the "embed" variable is set to true
const embedThumbnail = true; // Set to "true" if you want to set a thumbnail in the embed
const embedThumbnailLink = "https://i.imgur.com/P8PD7DD.png"; // The link for the embed thumbnail
/**
 * You'll have to set this up yourself! Read more below:
 * 
 * https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
 */

// Import constructords and login the client
const { Emoji, MessageReaction } = require('discord.js');



// If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

// Function to generate the role messages, based on your settings
function generateMessages() {
    let messages = [];
    for (const role of roles) messages.push({ role, message: `React below to get the **"${role}"** role!` }); //DONT CHANGE THIS
    return messages;
}

// Function to generate the embed fields, based on your settings and if you set "const embed = true;"
function generateEmbedFields() {
    return roles.map((r, e) => {
        return {
            emoji: reactions[e],
            role: r
        };
    });
}

function checkRole(guild, role) {
    const checkRole = guild.roles.find(r => r.name === role);
    if (checkRole) return true;
    else return false;
}

// Client events to let you know if the bot is online and to handle any Discord.js errors
client.on("ready", () => console.log("Bot is online!"));
client.on('error', console.error);

// Handles the creation of the role reactions. Will either send the role messages separately or in an embed
client.on("message", message => {
    if (message.content.toLowerCase() == setupCMD) {

        if (!embed) {
            if (!initialMessage) throw "The 'initialMessage' property is not set. Please do this!";

            message.channel.send(initialMessage);

            const messages = generateMessages();
            messages.forEach((obj, react) => {
                if (!checkRole(message.guild, obj.role)) throw `The role '${obj.role}' does not exist!`;

                message.channel.send(obj.message).then(async m => {
                    const emoji = reactions[react];
                    const customEmote = client.emojis.find(e => e.name === emoji);
                    
                    if (!customEmote) await m.react(emoji);
                    else await m.react(customEmote.id);
                });
            });
        } else {
            if (!embedMessage) throw "The 'embedMessage' property is not set. Please do this!";
            if (!embedFooter) throw "The 'embedFooter' property is not set. Please do this!";

            const roleEmbed = new RichEmbed()
                .setDescription(embedMessage)
                .setFooter(embedFooter);

            if (embedColor) roleEmbed.setColor(embedColor);
            if (embedThumbnail) roleEmbed.setThumbnail(embedThumbnailLink);

            const fields = generateEmbedFields();
            if (fields.length >= 25) throw "That maximum roles that can be set for an embed is 25!";

            for (const f of fields) {
                if (!checkRole(message.guild, f.role)) throw `The role '${role}' does not exist!`;

                const emoji = f.emoji;
                const customEmote = client.emojis.find(e => e.name === emoji);
                
                if (!customEmote) roleEmbed.addField(emoji, f.role, true);
                else roleEmbed.addField(customEmote, f.role, true);
            }

            message.channel.send(roleEmbed).then(async m => {
                for (const r of reactions) {
                    const emoji = r;
                    const customEmote = client.emojis.find(e => e.name === emoji);
                    
                    if (!customEmote) await m.react(emoji);
                    else await m.react(customEmote.id);
                }
            });
        }
    }
});

// This makes the events used a bit more readable
const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

// This event handles adding/removing users from the role(s) they chose
client.on('raw', async event => {

    if (!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id);

    const message = await channel.fetchMessage(data.message_id);
    const member = message.guild.members.get(user.id);

    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);

    if (!reaction) {
        // Create an object that can be passed through the event like normal
        const emoji = new Emoji(client.guilds.get(data.guild_id), data.emoji);
        reaction = new MessageReaction(message, emoji, 1, data.user_id === client.user.id);
    }

    let embedFooterText;
    if (message.embeds[0]) embedFooterText = message.embeds[0].footer.text;

    if (message.author.id === client.user.id && (message.content !== initialMessage || (message.embeds[0] && (embedFooterText !== embedFooter)))) {

        if (!embed) {
            const re = `\\*\\*"(.+)?(?="\\*\\*)`;
            const role = message.content.match(re)[1];

            if (member.id !== client.user.id) {
                const roleObj = message.guild.roles.find(r => r.name === role);

                if (event.t === "MESSAGE_REACTION_ADD") {
                    member.addRole(roleObj.id);
                } else {
                    member.removeRole(roleObj.id);
                }
            }
        } else {
            const fields = message.embeds[0].fields;

            for (let i = 0; i < fields.length; i++) {
                if (member.id !== client.user.id) {
                    const role = message.guild.roles.find(r => r.name === fields[i].value);

                    if ((fields[i].name === reaction.emoji.name) || (fields[i].name === reaction.emoji.toString())) {
                        if (event.t === "MESSAGE_REACTION_ADD") {
                            member.addRole(role.id);
                            break;
                        } else {
                            member.removeRole(role.id);
                            break;
                        }
                    }
                }
            }
        }
    }
});

process.on('unhandledRejection', err => {
    let msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
	console.error(`Unhandled Rejection: \n ${msg}`);
}); 
 // Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);
