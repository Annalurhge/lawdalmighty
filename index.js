const Discord = require('discord.js');
//const ytdl = require("ytdl-core");
//const opus = require("opusscript")

//const opusscript = require('opusscript');
const bot = new Discord.Client();
const version = '0.0.1';
const token = 'Njk5OTAwODkyMTY1NTcwNjQz.XpbIAw.FlTVrUoV9jFKDq2qRbdHrECES10';
const ignoredChannels = ['deadbois'];
const mutedPeeps = [];
const doubletable = [];
const haschannelll = [];
//lol
const ms = require("ms")

var servers = {};
var PREFIX = '^';
var logschannel = ['744199315009962064', '360567552122028034'];
var reportchannel = ['706345781971648602'];
var supplogs = ['70642129658550687'];
var rep = ['706348041145155614'];
var sup = ['706417222285000746'];
var modrole = ['360358273414725632'];
var adminrole = ['360357969910824962'];
var suppparent = ['706347904691863622'];
var ownchannelparent = ['446225318865534977'];
var muterole = ['712213025246937099'];
//
let mimiti;
let disisti;
bot.on('ready', () => {

    console.log('Bot is online!');
    if (!bot.channels.resolve(bot.channels.cache.find(ch => logschannel.includes(ch.id)).id)) { return }

    logschannel.forEach(function (element, index) {
        let lmao = bot.channels.resolve(element)
        let adaoy = new Discord.MessageEmbed()
            .setTitle('Bot Status')
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
            .addField('STATUS:', 'Started')
        lmao.send(adaoy)
    })

})
bot.on('disconnect', () => {
    console.log('Bot is offline!');
    if (!bot.channels.resolve(bot.channels.cache.find(ch => logschannel.includes(ch.id)).id)) { return }
    logschannel.forEach(function (element, index) {
        let lmao = bot.channels.resolve(element)
        let adaoy = new Discord.MessageEmbed()
            .setTitle('Bot Status')
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
            .addField('STATUS:', 'Offline!')
        lmao.send(adaoy)
    })
})

//Chat logs system//

bot.on('message', msg => {
    //let lal = msg.guild.channels.cache.array()//(msg.guild.channels.cache.array().find(ch => ch.name.toLowerCase().match("logs".toLowerCase())))

    //if (lal) {console.log("Found logs!");}
    if (!msg.content.startsWith(PREFIX)) return;
    if (msg.author.bot) return;
    if (msg.channel.type == "dm") return;
    let lmao = msg.guild.channels.resolve(msg.guild.channels.cache.find(ch => logschannel.includes(ch.id)).id);
    if (!lmao) { return msg.channel.send("You do not have an assigned logs channel; Please assign one now."); return; }


    if (ignoredChannels.includes(msg.channel.name)) return;
    const kiba = new Discord.MessageEmbed()
        .setTitle('Command Logs')
        .setColor(0xF1C40F)
        .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
        .setThumbnail(msg.author.displayAvatarURL())
        .addField('Sender: ', msg.author.tag + '/' + msg.author.toString())
        .addField('Command: ', msg.content)
        .addField('Channel: ', msg.channel.toString())
        .addField('Message Link:', msg.url)
        .addField('When: ', msg.createdAt);
    lmao.send(kiba)
})

//Message Edited//

bot.on('messageUpdate', async (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    if (oldMessage.channel.type == "dm") { return; }
    if (oldMessage.content === newMessage.content) {
        return;
    }
    let lmao = oldMessage.guild.channels.resolve(oldMessage.guild.channels.cache.find(ch => logschannel.includes(ch.id)).id);
    if (!lmao) { return msg.channel.send("You do not have an assigned logs channel; Please assign one now."); return; }
    if (ignoredChannels.includes(oldMessage.channel.name)) return;
    const baba = new Discord.MessageEmbed()
        .setTitle('Message Edited')
        .setColor(0x0000FF)
        .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
        .setThumbnail(oldMessage.author.displayAvatarURL())
        .addField('Sender: ', oldMessage.author.tag + '/' + oldMessage.author.toString())
        .addField('Previous Message: ', oldMessage.content, true)
        .addField('New Message: ', newMessage.content, true)
        .addField('Channel: ', newMessage.channel.toString())
        .addField('Message Link:', msg.url)
        .addField('When: ', oldMessage.createdAt);
    lmao.send(baba);
})

//Message Deleted//

bot.on('messageDelete', async msg => {
    if (ignoredChannels.includes(msg.channel.name)) return;
    if (msg.author.bot) return;
    if (msg.channel.type == "dm") { return; }
    const fetchedLogs = await msg.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_DELETE',
    });

    const deletionLog = fetchedLogs.entries.first();
    const { executor, target } = deletionLog;
    let lmao = msg.guild.channels.resolve(msg.guild.channels.cache.find(ch => logschannel.includes(ch.id)).id);
    if (!lmao) { return msg.channel.send("You do not have an assigned logs channel; Please assign one now."); return; }
    const babi = new Discord.MessageEmbed()
        .setTitle('Message Deleted')
        .setColor(0xFF0000)
        .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
        .setThumbnail(msg.author.displayAvatarURL())
        .addField('Sender: ', msg.author.tag + '/' + msg.author.toString(), true)
        .addField('Deleted By: ', executor, true)
        .addField('Deleted Message: ', msg)
        .addField('Channel: ', msg.channel.toString())
        .addField('Message Link:', msg.url)
        .addField('When: ', msg.createdAt);

    lmao.send(babi);
})

bot.on('message', msg => {

    if (msg.author.bot) return;
    if (msg.channel.type == "dm") { return msg.channel.send('Please use allowed channels to execute my commands') }
    let args = msg.content.substring(PREFIX.length).split(" ")
    if (!msg.content.startsWith(PREFIX)) return;
    let shouldbeded = msg.guild.member(msg.author.id)
    if (mutedPeeps.includes(msg.author.toString())) {
        shouldbeded.roles.add(muterole)
    } else {
        shouldbeded.roles.remove(muterole)
    }
    let mentionedperson = msg.author
    let asd = [mentionedperson.discriminator, mentionedperson.id]

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    if (msg.content.toLowerCase().startsWith(PREFIX + "8ball")) { //The 8ball Message
        if (!args[1]) return msg.channel.send('Please supply a valid question')
        var msg1 = Array(5);
        msg1[1] = "Yes";
        msg1[2] = "No";
        msg1[3] = "Maybe :wink:";
        msg1[4] = "Without a doubt.";
        msg1[5] = "I Honestly Have No Idea :neutral_face:"
        msg1[6] = "Highly Unlikely"
        var x = getRandomInt(0, 20);
        if (x < 5) {
            if (x < 3) {
                msg.channel.send(msg1[1]);
            }
            else {
                msg.channel.send(msg1[3]);
            }
        }
        else if (x <= 9) {
            if (x >= 7) {
                msg.channel.send(msg1[2]);
            }
            else {
                msg.channel.send(msg1[4]);
            }
        }
        else if (x <= 12) {
            msg.channel.send(msg1[5]);
        }
        else {
            msg.channel.send(msg1[6])
        }
    }

    if (msg.content.toLowerCase().startsWith(PREFIX + "random")) {
        msg.channel.send("The number is " + getRandomInt(1, 1000));
    }
    if (msg.content.toLowerCase().startsWith(PREFIX + "coinflip")) { //The coinflip Message
        var msg2 = Array(2);
        msg2[1] = "Heads";
        msg2[2] = "Tails";
        var x = getRandomInt(0, 8);
        if (x < 4) {
            msg.channel.send(msg2[1]);
        }
        else {
            msg.channel.send(msg2[2]);
        }
    }
    if (msg.content.toLowerCase().startsWith(PREFIX + "rps")) { //The rps Message
        if (!args[1]) return msg.channel.send('Include what you will throw')
        var msg1 = Array(3);
        msg1[1] = "Rock :black_circle:";
        msg1[2] = "Paper :page_facing_up:";
        msg1[3] = "Scissors :scissors:"
        var x = getRandomInt(0, 9);
        if (x < 6) {
            if (x < 3) {
                msg.channel.send(msg1[1]);
            }
            else {
                msg.channel.send(msg1[3]);
            }
        }
        else {
            msg.channel.send(msg1[2]);
        }
    }

    switch (args[0]) {

        //Add more commands here if you want to//
        // case 'plr':
        //     if(!args[1]) return msg.channel.send('Err.')

        //    msg.channel.send(doubletable)
        // break;
        //  case 'find':

        //    msg.channel.send('User exists')

        //     break;
        case 'logsignore':
            if (!msg.member.hasPermission(["MANAGE_MESSAGES" | "ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')
            if (!args[1]) return msg.channel.send('Please mention a channel')
            if (msg.mentions.channels.first()) {
                let channame = msg.mentions.channels.first()
                ignoredChannels.push(channame.name)
                msg.channel.send('Logs will now ignore all commands from ' + channame.name)
            } else {
                if (!msg.guild.channels.cache.array().find(chan => chan.name.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))) return msg.channel.send('Channel does not exist')
                let nonmentionchan = msg.guild.channels.cache.array().find(chan => chan.name.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))
                ignoredChannels.push(nonmentionchan.name)
                msg.channel.send('Logs will now ignore all commands from ' + nonmentionchan.name)
            }
            break;
        case 'logsinclude':
            if (!msg.member.hasPermission(["MANAGE_MESSAGES" | "ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')
            if (!args[1]) return msg.channel.send('Please mention a channel')
            if (msg.mentions.channels.first()) {
                let channame = msg.mentions.channels.first()
                ignoredChannels.splice(channame.name)
                msg.channel.send('Logs will now include all commands from ' + channame.name)
            } else {
                if (!msg.guild.channels.cache.array().find(chan => chan.name.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))) return msg.channel.send('Channel does not exist')
                let nonmentionchan = msg.guild.channels.cache.array().find(chan => chan.name.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))
                ignoredChannels.splice(nonmentionchan.name)
                msg.channel.send('Logs will now include all commands from ' + nonmentionchan.name)
            }
            break;
        case 'cmds':
            if (!args[1] | args[1] === '1') {
                const al = new Discord.MessageEmbed()
                    .setTitle('Here are the commands! Page 1')
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                    .addField('cmds (page)', 'lists the things I can do')
                    .addField('ping', 'bot returns a message "pong!"')
                    .addField('most', 'bot returns a message depending on the second argument (currently can only do "most disgusting")')
                    .addField('clear', 'bot clears (user designated) amount of messages (limit is 100)')
                    .addField('bot info', 'bot returns a message containing bot info')
                    .addField("info (user/channel)", "bot returns a message containing user's/channel's information")
                    .addField('send (channel) (message)', "bot sends a message to the mentioned channel or to the current channel if a channel is not mentioned")
                    .addField('prefix (prefix)', 'changes the prefix before each command')
                    .addField('privcategory (categoryID)', 'Changes the category where private channels go to when created (WARNING: Please set this first before using the command below')
                    .addField('ownchannel', 'Create your own private chat')
                msg.channel.send(al)
            }
            if (args[1] === '2') {
                const uwah = new Discord.MessageEmbed()
                    .setTitle('Here are the commands! Page 2')
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                    .addField('padd (username)', 'adds the user into your private channel (can only be used in your own channel)')
                    .addField('premove (username)', 'removes the user from your private channel (can only be used in your own channel)')
                    .addField('modrole (roleID)', 'changes the designated moderator role')
                    .addField('adminrole (roleID)', 'changes the designated admin role')
                    .addField('logschannel (channelID)', 'changes the designated channel for logs')
                    .addField('suppcategory (categoryID)', 'changes the designated category for report and support channels (WARNING: Set this first before changing designated channels below')
                    .addField('reportchannel (channelID)', 'changes the designated channel for report logs')
                    .addField('rep (channelID)', 'changes the designated channel for reporting')
                    .addField('supplogs (channelID)', 'changes the designated channel for support logs')
                    .addField('sup (channelID)', 'changes the designated channel for requesting support')
                msg.channel.send(uwah)
            }
            if (args[1] === '3') {
                const awe = new Discord.MessageEmbed()
                    .setTitle('Here are the commands! Page 3')
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                    .addField('logsignore (channel)', 'Makes it so that all commands typed in the channel are not recorded by logs')
                    .addField('logsinclude (channel)', 'Makes it so that all commands typed in the channel are recorded by logs')
                    .addField('mute (user) (specified time)', 'mutes the mentioned user for the amount of time given. If no time is specified the user is permanently muted.')
                    .addField('unmute (user)', 'unmutes the mentioned user')
                    .addField('8ball (question)', '8ball fun')
                    .addField('random', 'returns a random number from 0 to 1000')
                    .addField('coinflip', 'flips a coin')
                    .addField('rps (your pick)', 'rock paper scissors!')
                msg.channel.send(awe)
            }
            break;
        //
        case 'ping':
            msg.channel.send('pong!');
            break;
        case 'most':
            if (args[1] === 'disgusting') {
                msg.channel.send('Well, it would be none other than Harley');
            }
            break;
        case 'clear':
            if (!msg.member.hasPermission(["MANAGE_MESSAGES" | "ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')
            msg.delete()
            if (!args[1]) return msg.channel.send('Please specify how many messages you wish to remove.')
            msg.channel.bulkDelete(args[1]);

            break;
        case 'bot':
            if (args[1] === 'info') {
                msg.channel.send('Bot Creator: Annalurhge' + 'Bot Version: ' + version);
            }
            break;
        case 'info':

            let chaninfo = msg.mentions.channels.first()
            let person = msg.mentions.users.first()
            if (msg.mentions.roles.first()) return msg.channel.send('I am unable to send information')

            if (person) {

                var rolesIHave = []
                if (msg.guild.member(member.user.id).roles.highest.id == msg.guild.id) { rolesIHave.push("No roles found") } else {
                    rolesIHave.push(msg.guild.member(member.user.id).roles.cache.array().sort((a, b) => b.position - a.position).slice(0, -1))
                }//}
                const userembed = new Discord.MessageEmbed()
                    .setTitle("User's Information")
                    //.setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setColor(msg.guild.member(person.id).roles.highest.color)
                    .setThumbnail(person.displayAvatarURL())
                    .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                    .addField('User Name/Tag: ', person.tag, true)
                    .addField('User ID: ', person.id, true)
                    .addField('Roles :', rolesIHave)
                    .addField('Date account was created: ', person.createdAt)
                    .addField('Date account joined the server: ', msg.guild.member(person.id).joinedAt)
                //.addField('Roles: ' + role)
                msg.channel.send(userembed);
            } else {
                if (!person) {

                    if (!msg.guild.members.cache.array().find(user => user.user.username.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))) return msg.channel.send('User is not part of the guild')
                    let member = msg.guild.members.cache.array().find(user => user.user.username.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))


                    var rolesIHave = []

                    if (msg.guild.member(member.user.id).roles.highest.id == msg.guild.id) { rolesIHave.push("No roles found") } else {
                        rolesIHave.push(msg.guild.member(member.user.id).roles.cache.array().sort((a, b) => b.position - a.position).slice(0, -1))
                    }//}

                    const userembed = new Discord.MessageEmbed()
                        .setTitle("User's Information")
                        //.setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setColor(msg.guild.member(member).roles.highest.color)
                        .setThumbnail(member.user.displayAvatarURL())
                        .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                        .addField('User Name/Tag: ', member.user.tag, true)
                        .addField('User ID: ', member.user.id, true)
                        .addField('Roles :', rolesIHave)
                        .addField('Date account was created: ', member.user.createdAt)
                        .addField('Date account joined the server: ', msg.guild.member(member.user).joinedAt)
                    //.addField('Roles: ' + role)
                    msg.channel.send(userembed);
                }

                if (msg.mentions.channels.first()) {
                    const chanembed = new Discord.MessageEmbed()
                        .setTitle("Channel Information")
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        //.setThumbnail(bot.author.displayAvatarURL())
                        .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                        .addField('Channel Name: ', chaninfo.name, true)
                        .addField('Channel ID: ', chaninfo.id, true)
                        .addField('Date channel was created: ', chaninfo.createdAt)
                    msg.channel.send(chanembed);
                }
            }
            break;
        case 'send':
            if (!args[1]) return msg.channel.send('Please specify a message');
            if (!msg.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')

            let argsresult;
            let mChannel = msg.mentions.channels.first()


            if (mChannel) {
                argsresult = args.slice(2).join(" ")
                mChannel.send(argsresult)
            } else {
                argsresult = args.slice(1).join(" ")
                msg.channel.send(argsresult)
            }

            break;
        case 'prefix':
            if (!msg.member.hasPermission(["ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')

            if (!args[1]) { msg.channel.send("Change the prefix into what?") } else {
                PREFIX = args[1];
                msg.channel.send('Prefix has been changed to ' + PREFIX);
            }
            break;
        case 'logschannel':
            if (!msg.member.hasPermission(["ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')

            if (!args[1]) { msg.channel.send('Please include the ID of the channel you want to designate as logs') }
            else {

                if (!msg.guild.channels.resolve(args[1])) return msg.channel.send('Channel does not exist')
                let lmao = msg.guild.channels.cache.find(ch => logschannel.includes(ch.id));
                if (lmao) { logschannel.pop(lmao); logschannel.push(args[1]); } else { logschannel.push(args[1]) }
                msg.channel.send('Logs channel has been successfully changed to ' + args[1])

            }
            break;
        case 'reportchannel':
            if (!msg.member.hasPermission(["ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')

            if (!args[1]) { msg.channel.send('Please include the ID of the channel') }
            else {
                if (!msg.guild.channels.resolve(args[1])) return msg.channel.send('Channel does not exist')
                reportchannel = args[1];
                msg.channel.send('Report logs channel has been successfully changed to ' + reportchannel)

            }
            break;
        case 'supplogs':
            if (!msg.member.hasPermission(["ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')

            if (!args[1]) { msg.channel.send('Please include the ID of the channel') }
            else {
                if (!msg.guild.channels.resolve(args[1])) return msg.channel.send('Channel does not exist')
                supplogs = args[1];
                msg.channel.send('Support logs channel has been successfully changed to ' + supplogs)

            }
            break;
        case 'rep':
            if (!msg.member.hasPermission(["ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')

            if (!args[1]) { msg.channel.send('Please include the ID of the channel') }
            else {
                if (!msg.guild.channels.resolve(args[1])) return msg.channel.send('Channel does not exist')
                rep = args[1];
                msg.channel.send('Report channel has been successfully changed to ' + rep)

            }
            break;
        case 'sup':
            if (!msg.member.hasPermission(["ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')

            if (!args[1]) { msg.channel.send('Please include the ID of the channel') }
            else {
                if (!msg.guild.channels.resolve(args[1])) return msg.channel.send('Channel does not exist')
                sup = args[1];
                msg.channel.send('Support channel has been successfully changed to ' + sup)

            }
            break;
        case 'adminrole':
            if (!msg.member.hasPermission(["ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')

            if (!args[1]) { msg.channel.send('Please include the ID of the role') }
            else {
                if (!msg.guild.roles.resolve(args[1])) return msg.channel.send('Role does not exist')
                adminrole = args[1];
                msg.channel.send('Admin role has been successfully changed to ' + adminrole)

            }
            break;
        case 'modrole':
            if (!msg.member.hasPermission(["ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')

            if (!args[1]) { msg.channel.send('Please include the ID of the role') }
            else {
                if (!msg.guild.roles.resolve(args[1])) return msg.channel.send('Role does not exist')
                modrole = args[1];
                msg.channel.send('Moderator role has been successfully changed to ' + modrole)

            }
            break;
        case 'suppcategory':
            if (!msg.member.hasPermission(["ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')

            if (!args[1]) { msg.channel.send('Please include the ID of the category') }
            else {
                if (!msg.guild.channels.resolve(args[1])) return msg.channel.send('Category does not exist')
                suppparent = args[1];
                msg.channel.send('Support category has been successfully changed to ' + suppparent)

            }
            break;
        case 'privcategory':
            if (!msg.member.hasPermission(["ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')

            if (!args[1]) { msg.channel.send('Please include the ID of the category') }
            else {
                if (!msg.guild.channels.resolve(args[1])) return msg.channel.send('Category does not exist')
                ownchannelparent = args[1];
                msg.channel.send('Private channels category has been successfully changed to ' + ownchannelparent)

            }
            break;
        case 'report':
            if (msg.channel.id !== rep) return msg.channel.send('Please use this command in the allowed channel');
            if (!args[1]) return msg.channel.send('Please mention a user');
            if (!args[2]) return msg.channel.send('Please provide a valid reason')
            let rason = args.slice(2).join(" ")
            let reported = msg.mentions.users.first()
            let lmao = msg.guild.channels.resolve(reportchannel)
            if (reported) {
                const reportlog = new Discord.MessageEmbed()
                    .setTitle('New Case')
                    .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .addField('Reporter: ', msg.author.toString(), true)
                    .addField('Reported: ', reported.toString(), true)
                    .addField('Reason: ', rason)
                    .addField('When: ', msg.createdAt);
                lmao.send(reportlog)
                msg.channel.send('Thank you for your report. Please give the staff time to review it');
            } else {
                const reportlog = new Discord.MessageEmbed()
                    .setTitle('New Case')
                    .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .addField('Reporter: ', msg.author.toString(), true)
                    .addField('Reported: ', args[1], true)
                    .addField('Reason: ', rason)
                    .addField('When: ', msg.createdAt);
                lmao.send(reportlog)
                msg.channel.send('Thank you for your report. Please give the staff time to review it');
            }
            break;
        case 'support':
            if (msg.channel.id !== sup) return msg.channel.send('Please use this command in the allowed channel')
            let requester = msg.author;
            let channeru = msg.guild.channels.create(msg.author.username + "s assistance request", 'text').then(ch => {
                let category = msg.guild.channels.resolve(suppparent)
                msg.channel.send('Please click on this ' + msg.author.username + ': ' + ch.toString())
                ch.setParent(category)
                ch.overwritePermissions([
                    {
                        id: msg.guild.id,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: msg.guild.roles.resolve(adminrole),
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: msg.guild.roles.resolve(modrole),
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: msg.author.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                ])
                let thischan = msg.guild.channels.resolve(ch.id)
                let lmao = new Discord.MessageEmbed()
                    .setTitle('Please read carefully:')
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                    .addField('Provide your information', 'Please provide your username and state your concern. \n\n(Do note that if we do not address your concern immediately that means we are busy. Please be patient.)\n\n If you no longer have any concerns, please close the channel by saying ' + PREFIX + 'addressed')
                thischan.send(lmao)
                bot.on('message', msg => {
                    if (msg.content === PREFIX + 'addressed') {
                        if (msg.channel.id === ch.id) {
                            let vad = msg.guild.channels.resolve(supplogs)
                            let aasd = new Discord.MessageEmbed()

                                .setTitle('Case Closed')
                                .setColor(Math.floor(Math.random() * 16777214) + 1)
                                .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                                .addField('Person with Concern: ', requester.toString(), true)
                                .addField('Channel closed by: ', msg.author.toString(), true)
                                .addField('When: ', ch.createdAt)

                            vad.send(aasd);
                            ch.delete()
                        }
                    }
                })

            })

            break;
        case 'ownchannel':
            //var haschannel = msg.guild.channels.cache.find(ch => {
            // ch.name = msg.author.username+'s-group-chat' })
            //'name', msg.author.username+'s-group-chat')
            // if(haschannelll.includes(msg.author.username)) return msg.channel.send("A channel that includes your username has already been created. Using another user's username is bannable")
            const hasrole = msg.guild.roles.cache.find(ro => ro.name === `${msg.author.discriminator} owner`)
            if (hasrole) return msg.channel.send('You already have your own channel.')//+haschannel.toString())
            // haschannelll.push(msg.author.username)
            //if (ifHas === true) return msg.channel.send('You already have your own channel!');
            // if (!args[1]) return msg.channel.send('Please provide a valid name for your channel');
            //ifHas = true
            let owner = msg.author
            msg.guild.roles.create().then(d => {
                mimiti = d.id
                d.setName(`${msg.author.discriminator} owner`);
                let asd = d.guild.members.resolve(owner.id)
                asd.roles.add(d)
                //
            })
            msg.guild.roles.create().then(r => {
                disisti = r.id
                r.setName(`${msg.author.discriminator}`);
                // let asd = r.guild.members.resolve(owner.id)
                // asd.roles.add(r)
            })
            msg.channel.send('Creating channel....')
            setTimeout(function () {

                var privhca = msg.guild.channels.create(owner.username + 's-group-chat' + '-' + owner.discriminator, 'text').then(ch => {
                    msg.channel.send('Your own private channel has been created. Please click on this: ' + ch.toString())
                    const par = msg.guild.channels.resolve(ownchannelparent)
                    ch.setParent(par);
                    let hgafo = msg.guild.channels.resolve(ch.id)
                    const masoijd = new Discord.MessageEmbed()
                        .setTitle('Your very own channel')
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                        .addField('Hello', "This is your very own channel. \n\n Currently the channel owner can perform 2 commands. The commands are: `^padd (user) and ^premove (user)` \n\n You may change the channel's name but do `keep the discriminator` at the end. This will allow you to keep using commands in your own private channel \n\n That's everything you need to know goodbye!")
                    msg.guild.channels.resolve(ch.id).send(masoijd)
                    doubletable.push(owner.username + asd)
                    ch.overwritePermissions([
                        {
                            id: owner.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: msg.guild.id,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: msg.guild.roles.cache.find(ro => ro.name === `${msg.author.discriminator} owner`).id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: msg.guild.roles.cache.find(ro => ro.name === `${msg.author.discriminator} owner`).id,
                            allow: ['MANAGE_CHANNELS']
                        },
                        {
                            id: msg.guild.roles.cache.find(ro => ro.name === `${msg.author.discriminator}`).id,
                            allow: ['VIEW_CHANNEL']
                        },
                    ])
                })
            }, 1000)

            break;

        case 'padd':
            // if(!msg.guild.channels.cache.find(ch => ch.name === `${msg.author.username.toLowerCase()}s-group-chat`)) {return} else {
            // let haschannel = msg.guild.channels.cache.find(ch => ch.name==`${msg.author.username.toLowerCase()}s-group-chat`)
            //    let haschannel = `${msg.author.username.toLowerCase()}s-group-chat`

            //if (haschannel) return msg.channel.send('b;ah '+ haschannel)
            // var haschannel = msg.guild.channels.cache.find(chan => chan.name = msg.author.username+'s-group-chat')
            if (!msg.channel.name.includes(msg.author.discriminator)) return msg.channel.send('This command can only be used in your own channel.')

            //if(!doubletable.includes(msg.author.username+asd)) return msg.channel.send('You do not own this channel, you can get banned for impersonating another user you know?')


            // if(msg.channel.name.slice(0,-12) !== msg.author.username.toLowerCase()) return msg.channel.send('u gae')
            // if(!msg.guild.roles.cache.some(ro => ro.name===`${msg.author.username} owner`)) return msg.channel.send('Not yours')
            //if(msg.channel.id !== cnaroid) return msg.channel.send('This command can only be used in your own channel')
            if (!args[1]) return msg.channel.send("Please supply a valid argument");
            let aosid = msg.guild.members.cache.array().find(user => user.user.username.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))
            if (!aosid) return msg.channel.send('I could not find the user you were referring to')
            aosid.roles.add(msg.guild.roles.cache.find(ro => ro.name === `${msg.author.discriminator}`).id)
            // msg.guild.member(args[1]).roles.add(msg.guild.roles.cache.find(ro => ro.name === `${msg.author.username}`).id)
            msg.channel.send('User ' + aosid.toString() + ' has successfully been added to your channel')
            //}
            break;
        case 'premove':
            // let haschannels = `${msg.author.username.toLowerCase()}s-group-chat`
            //if(msg.channel.name !== haschannels) return msg.channel.send('This command can only be used in your own channel.')
            if (!msg.channel.name.includes(msg.author.discriminator)) return msg.channel.send('This command can only be used in your own channel.')
            //if(!doubletable.includes(msg.author.name+asd)) return msg.channel.send('You do not own this channel, you can get banned for impersonating another user you know?')
            let asdasd = msg.guild.members.cache.array().find(user => user.user.username.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))
            if (!asdasd) return msg.channel.send('I could not find the user you were referring to')
            asdasd.roles.remove(msg.guild.roles.cache.find(ro => ro.name === `${msg.author.discriminator}`).id)
            // msg.guild.member(args[1]).roles.remove(msg.guild.roles.cache.find(ro => ro.name === `${msg.author.username}`).id)
            msg.channel.send('User ' + asdasd.toString() + ' has successfully been removed from your channel')
            break;
        case 'mute':
            if (!msg.member.hasPermission(["MANAGE_ROLES" | "ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')
            if (!args[1]) return msg.channel.send('Please specify a user');
            let countdown = args[2]
            let violater = msg.guild.members.cache.array().find(user => user.user.username.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))
            let lmasda = msg.mentions.users.first()

            if (violater) {
                if (!args[2]) {
                    if (mutedPeeps.includes(violater.user.username.toString())) return msg.channel.send('User is already muted')
                    violater.roles.add(muterole)
                    mutedPeeps.push(violater.user.username.toString())
                    msg.channel.send('User ' + violater.user.username.toString() + ' is now muted')
                }
                if (args[2]) {
                    let eehuu = msg.guild.members.cache.array().find(user => user.user.username.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))
                    if (mutedPeeps.includes(eehuu.user.username.toString())) return msg.channel.send('User is already muted')
                    eehuu.roles.add(muterole)
                    mutedPeeps.push(eehuu.user.username.toString())
                    msg.channel.send('User ' + eehuu.user.username.toString() + ' has been muted for ' + countdown)
                    setTimeout(function () {
                        if (!mutedPeeps.includes(eehuu.user.username.toString())) return;
                        mutedPeeps.splice(eehuu.user.username.toString())
                        eehuu.roles.remove(muterole)
                        eehuu.send('You have been unmuted')
                    }, ms(countdown))
                }
            }
            if (lmasda) {
                if (!args[2]) {
                    if (mutedPeeps.includes(lmasda.username.toString())) return msg.channel.send('User is already muted')
                    msg.guild.member(lmasda.id).roles.add(muterole)
                    mutedPeeps.push(lmasda.username.toString())
                    msg.channel.send('User ' + lmasda.username.toString() + ' is now muted')
                }
                if (args[2]) {
                    //let hahu = msg.mentions.users.first()
                    if (mutedPeeps.includes(lmasda.username.toString())) return msg.channel.send('User is already muted')
                    msg.guild.member(lmasda.id).roles.add(muterole)
                    mutedPeeps.push(lmasda.username.toString())
                    msg.channel.send('User ' + lmasda.username.toString() + ' has been muted for ' + countdown)
                    setTimeout(function () {
                        if (!mutedPeeps.includes(lmasda.username.toString())) return;
                        mutedPeeps.splice(lmasda.username.toString())
                        msg.guild.member(lmasda.id).roles.remove(muterole)
                        lmasda.send('You have been unmuted')
                    }, ms(countdown))
                }
            }
            break;
        case 'unmute':
            if (!msg.member.hasPermission(["MANAGE_ROLES" | "ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')
            if (!args[1]) return msg.channel.send('Please specify a user');
            let latada = msg.mentions.users.first()
            let violent = msg.guild.members.cache.array().find(user => user.user.username.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))

            if (violent) {
                if (!mutedPeeps.includes(violent.user.username.toString())) { return msg.channel.send('User is not mute') } else {
                    mutedPeeps.splice(violent.user.username.toString())
                    violent.roles.remove(muterole)
                    violent.send('You have been unmuted')
                    msg.channel.send('User has been unmuted')
                }
            }
            if (latada) {
                if (!mutedPeeps.includes(latada.username.toString())) { return msg.channel.send('User is not mute') } else {
                    mutedPeeps.splice(latada.username.toString())
                    msg.guild.member(latada.id).roles.remove(muterole);
                    latada.send('You have been unmuted')
                    msg.channel.send('User has been unmuted')
                }
            }
            break;
        case 'whois':
            if (!msg.member.hasPermission(["MANAGE_ROLES" | "ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')
            if (!args[1]) return msg.channel.send('Please supply a second argument')
            if (args[1] === 'muted') {
                if (mutedPeeps.length > 0) {
                    const mutelist = new Discord.MessageEmbed()
                        .setTitle('List of muted users')
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                        .addField('Usernames:', mutedPeeps.toString())
                    msg.channel.send(mutelist)
                } else {
                    const garbage = new Discord.MessageEmbed()
                        .setTitle('List of muted users')
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setFooter('Bot Made By: Annalurhge; Bot Version: ' + version)
                        .addField('Usernames:', 'N/A')
                    msg.channel.send(garbage)
                }
            }
            break;
        // case 'annoy':
        //     let raoai = false
        //     if(!msg.member.hasPermission(["ADMINISTRATOR"])) return msg.channel.send('Insufficient Permissions')
        //     if (!args[1]) return msg.channel.send("Please mention a user")
        //     let spamchannel = bot.channels.resolve('752020584866775132')
        //     let dagaefa = msg.guild.members.cache.array().find(user => user.user.username.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))
        //     let lmaofac = setTimeout(function(){
                    
        //             if(raoai == false)
        //             {
        //                 spamchannel.send(dagaefa.toString())
        //                 console.log("Lmao")
        //             }
                    
        //         }, 1000)
        //     setTimeout(function(){
        //         do {lmaofac} while (raoai == false)
        //     }, 1000)
            
        // break;
        // case 'ban':
        //     let almightyfind = msg.guild.members.cache.array().find(user => user.user.username.toLocaleLowerCase().includes(args[1].toLocaleLowerCase()))
        //     if(!args[1]) return msg.channel.send('Please mention a user')
        //     if(!almightyfind) return msg.channel.send('User does not exist')
        //     almightyfind.ban()

        //     break;
        // case 'play':
        //     //ignoredChannels.
        //    function play(connection, msg){
        //     var server = servers[msg.guild.id];

        //     server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}))

        //     server.queue.shift();

        //     server.dispatcher.on("end", function(){
        //         if(server.queue[0]){
        //             play(connection, msg);
        //         }else{
        //             connection.disconnect();
        //         }
        //     })

        //    }
        //         if(!args[1]) return msg.channel.send('Please provide a link');
        //         if(!msg.member.voice.channel) return msg.channel.send('Must be in a voice channel to use this command!')
        //         // if(!servers[msg.guild.id]) servers[msg.guild.id] = {
        //         //     queue: []
        //         // }

        //         if(!servers[msg.guild.id]) servers[msg.guild.id] = {
        //             queue: []
        //         };

        //         var server = servers[msg.guild.id];
        //         server.queue.push(args[1]);



        //     if(!msg.guild.voice) msg.member.voice.channel.join().then(function(connection){
        //         play(connection, msg)
        //     })
        //         break;

        // case 'skip':
        //     var server = servers[msg.guild.id];
        //     if(server.dispatcher) server.dispatcher.end()
        //     msg.channel.send('Song skipped')
        // break;

        // case 'stop':
        //     var server = servers[msg.guild.id];
        //     if(msg.guild.voice.connection){
        //         for (var i = server.queue.length -1; i >= 0; i--){
        //             server.queue.splice(i, 1);
        //         }
        //     server.dispatcher.end();
        //     }

        // if (msg.guild.voice.connection) msg.guild.voice.connection.disconnect();
        // msg.channel.send('Goodbye!')
        // break;
        // case 'queue':
        //     var server = servers[msg.guild.id];
        //     if(!server.queue.length <= 0)return msg.channel.send("Empty!")
        //     msg.channel.send(server.queue)
        // break;
        // }})



    }
})
bot.login(token);