const { count } = require('console');
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
var colorcodes = ['1ABC9C', '11806A', '2ECC71', '1F8B4C', '3498DB', '9B59B6', '71368A', 'E91E63', 'AD1457', 'F1C40F', 'C27C0E', 'E67E22', 'A84300', 'E74C3C', '992D22', '95A5A6', '979C9F', '7F8C8D', 'BCC0C0', '34495E', '2C3E50', 'FFFF00', 'FFFF00']

client.on("guildCreate", (guild) => {  ;
    console.log(`Joined new guild: ${guild.name}`);
    let channelID;
    let channels = guild.channels.cache;

    channelLoop:
    for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    const invite = new Discord.MessageEmbed()
                .setTitle('⏰ Timer')
                .setColor('#9B59B6') 
                .setDescription('Thanks for adding me to your server !\nEnter _ti help for more info.')
                .setFooter('Timer ©️');
    channel.send(invite);

});


client.on('ready', () => {
  console.log(`Logged in as Timer Bot!`);
  client.user.setActivity(`_ti.help`, { type: 'LISTENING'})
  prefix = '_ti'
});

client.on('message', async msg => {
    let msgContents = msg.content.split(".");
    if (msgContents[0] === prefix) {
        if(msgContents[1] == 'help' || msgContents[1] == null){
            msg.reply({embed: {
                color: 	15158332,
                author: {
                    name : 'Timer',
                    icon_url: 'https://imgur.com/dSwmtwM.png'
                },
                thumbnail: {
                    url: 'https://imgur.com/dSwmtwM.png',
                },
                description : '\n \nThis is an interactive Discord Bot which helps you to set countdowns for various events.\n \n \n-Commands-\n',
                fields: [
                    { name: `_ti.<Name of the event>.<Date/Time> `, value: "Start an instance of the bot to set countdown for the event.", inline: false},
                    { name: `Date-Time Syntaxes`, value: "--------------------------", inline: false},
                    { name: `<Month-Name> <Date> <Year>`, value: `-`, inline: true},
                    { name: `<Month> <Date> <Year>`, value: "-", inline: true},
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: 'https://imgur.com/dSwmtwM.png',
                    text: "©"
                    }
            }})
        }
        else
        countdown(msg);
    }
});

function countdown(msg){


    const synatxerror = new Discord.MessageEmbed()
                .setTitle('⏰ Timer')
                .setColor('#206694') 
                .setDescription(`Error formatting your input !\n\nEnter '_ti.help' for more info !`)
                .setFooter('Timer ©️','https://imgur.com/dSwmtwM.png');
    let user = msg.author.id;
    let locmsgContents = msg.content.split(".");
    if(!locmsgContents[2]){
        const format = new Discord.MessageEmbed()
                .setTitle('⏰ Timer')
                .setColor('#206694') 
                .setDescription('"Format : _ti.<Name of the event>.<Date/Time>"')
                .setFooter('Timer ©️','https://imgur.com/dSwmtwM.png');
            msg.channel.send(format);
        return;
    }
    let name = locmsgContents[1];
    let date = locmsgContents[2];
    let countDownDate = new Date(date).getTime();
    console.log("Running timer func instance")
    let now = new Date().getTime();
    let distance = countDownDate - now;
        days = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if(isNaN(days)){
                msg.channel.send(synatxerror);
            }    
        else if(distance<0){
            const error = new Discord.MessageEmbed()
                .setTitle(name)
                .setColor('#206694') 
                .setDescription('Do You Want A Time Machine !')
                .setFooter('Timer ©️','https://imgur.com/dSwmtwM.png');
            msg.channel.send(error);
        }
        else{
            var i = 0;
            const timer = new Discord.MessageEmbed()
                .setTitle(name)
                .setColor('#95A5A6')
                .setDescription("COUNTDOWN : "+ days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds")
                .setFooter('Timer ©️','https://imgur.com/dSwmtwM.png');
            msg.channel.send(timer).then(msg => {
            let int = setInterval(function () {
                if(i==colorcodes.length-1){
                    i=0;
                }
                    now = new Date().getTime();
                    let lc = countDownDate
                    let ldistance = lc - now;
                    // console.log(lc);
                    // console.log(ldistance);
                    if(ldistance <= 0){
                        let ended = new Discord.MessageEmbed()
                            .setTitle(name)
                            .setColor('#E74C3C')
                            .setDescription(`COUNTDOWN ENDED !`)
                            .setFooter('Timer ©️','https://imgur.com/dSwmtwM.png');
                        msg.edit(ended)
                        client.users.cache.get(user).send(ended);
                        clearInterval(int);
                    }
                    
                    else{
                        var item = colorcodes[i++];
                        let ldays = Math.floor(ldistance / (1000 * 60 * 60 * 24));
                        let lhours = Math.floor((ldistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        let lminutes = Math.floor((ldistance % (1000 * 60 * 60)) / (1000 * 60));
                        let lseconds = Math.floor((ldistance % (1000 * 60)) / 1000); 
                        let timerUpdate = new Discord.MessageEmbed()
                            .setTitle(name)
                            .setColor('#' + item)
                            .setDescription("COUNTDOWN : "+ ldays + " Days " + lhours + " Hours " + lminutes + " Minutes " + lseconds + " Seconds")
                            .setFooter('Timer ©️','https://imgur.com/dSwmtwM.png');
                        msg.edit(timerUpdate)
                    }   
                },60000)
            })
        }
    }

client.login(process.env.TOKEN);