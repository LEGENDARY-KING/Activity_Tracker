// BRUH MY COMMITS WERE ALL CREDITED AS UNKNOWN, AMAZING SPIDER MAN

const config=require("./config.json")
const { MessageEmbed, Client, Intents,MessageActionRow,MessageButton  } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_PRESENCES,Intents.FLAGS.GUILD_MESSAGES ] });
const db=require("better-sqlite3")("./database.sqlite")
let clien={} // Discord.js v16 disabled client extension so this for DB functions
let snoozed={},overplaying={}  // Snoozed and overplaying temp variable, Not the most important so just a memory one

client.login(config.token)

client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}!`);
     const data = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'data';"
    )
    .get();
    if (!data["count(*)"]) {
   db
      .prepare(
        "CREATE TABLE data (id TEXT PRIMARY KEY, user TEXT, consent TEXT,dailyLimit INTEGER, playedToday INTEGER, config TEXT);"
      )
      .run();

    db.prepare("CREATE UNIQUE INDEX idx_data_id ON data (id);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  clien.getData = db.prepare(
    "SELECT * FROM data WHERE user = ?"
  );
  clien.deleteData = db.prepare(
    "DELETE FROM data WHERE user = ?"
  );
  clien.setData = db.prepare(
        "INSERT OR REPLACE INTO data (id, user, consent, dailyLimit, playedToday, config) VALUES (@id, @user, @consent, @dailyLimit, @playedToday, @config);"
      )

    client.user.setPresence({ activities: [{  name:"Checking playtime and nagging like a mom"} ],status: 'online' })
});

var prefix=config.prefix

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

const commands = [
new SlashCommandBuilder()
	.setName('consent')
	.setDescription('Do you consent for bot to process and store your presence data')
	.addBooleanOption(option =>
		option.setName('consent')
			.setDescription('True or False')
			.setRequired(true)),
new SlashCommandBuilder()
	.setName('stats')
	.setDescription('Get your genshin playtime stats'),
new SlashCommandBuilder()
	.setName('daily_limit')
	.setDescription('Sets your daily playtime limit after which the bot starts reminding(Disabled by default)')
	.addIntegerOption(option => option.setName('hours').setDescription('Select the hours').setRequired(true)
.addChoice("1",1).addChoice("2",2).addChoice("3",3).addChoice("4",4).addChoice("5",5).addChoice("6",6).addChoice("7",7)
.addChoice("8",8).addChoice("9",9).addChoice("10",10).addChoice("11",11).addChoice("12",12).addChoice("13",13)
.addChoice("14",14).addChoice("15",15).addChoice("16",16).addChoice("17",17).addChoice("18",18)
.addChoice("19",19).addChoice("20",20).addChoice("21",21).addChoice("22",22).addChoice("23",23))

.addIntegerOption(option=>option.setName("minutes").setDescription('Select the minutes').setRequired(false)
.addChoice("5",5).addChoice("10",10).addChoice("15",15).addChoice("20",20).addChoice("25",25).addChoice("30",30).addChoice("35",35)
.addChoice("40",40).addChoice("45",45).addChoice("50",50).addChoice("55",55).addChoice("59",59))
]; 

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
 await rest.put(
      Routes.applicationCommands("887258753882267660"),
      { body: commands },
    );

    await rest.put(
      Routes.applicationGuildCommands("887258753882267660",config.guild),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

//Slash commands interaction listener
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'consent') {
try{
await interaction.deferReply();
const consent=interaction.options.getBoolean('consent').toString()
let conf=getData(interaction.member.user.id)
conf.consent=consent
if(consent=="false")
{
interaction.editReply("Your genshin playtime will no longer be processed")
let temp=conf
temp.config=JSON.stringify(temp.config)
clien.setData.run(temp)
}
else if(consent=="true")
{
interaction.editReply("Thanks for your consent, Your genshin playtime will now be processed\nYou can opt out by selecting `False` in the same command")
let temp=conf
temp.config=JSON.stringify(temp.config)
clien.setData.run(temp)
}
}
catch(e)
{
console.error(e)
}
}
if(interaction.commandName=="stats")
{
try{
await interaction.deferReply()
var a=getData(interaction.user.id)
if(a.consent=='false')
{
await interaction.editReply("You have not consented for the bot to process your activity\nPlease use /consent true to give consent")
return
}
else
{
const event = new Date(Date.now());

event.setUTCDate(event.getUTCDate());
event.setHours(0)
event.setSeconds(0)
event.setMilliseconds(0)
event.setMinutes(0)

if(a.playedToday==0)
{
await interaction.editReply("Great work! You did not play at all today.")
}
else
{
if(!a.config.data[Date.parse(event).toString()])a.config.data[Date.parse(event).toString()]={times:[],totalPlayed:1}
a.config.data[Date.parse(event).toString()].totalPlayed=a.todayPlayed
var allsessions=a.config.data[Date.parse(event).toString()].times.map(f=>{
var from=f.split("-")[0] //The starting timestamp
var to=f.split("-")[1]  //The ending timestamp
return `<t:${from}:t> To <t:${to}:t>-${to-from}`
})

let embed=emb(`You have played a total of ${FromMillis(a.playedToday)}
Your max limit is ${FromMillis(a.dailyLimit)}
${a.dailyLimit-a.playedToday<0?"You have already played "+FromMillis(a.playedToday-a.dailyLimit)+" more than what your daily limit :angry: ":"You have "+FromMillis(a.dailyLimit-a.playedToday)+" more playtime till your daily limit :smile: "}`)
.setTitle("Genshin Playtime Report For <t:"+((Date.parse(event)/1000).toFixed(0)).toString()+":D>").setTimestamp()
allsessions.forEach(f=>{
embed.addField(f.split("-")[0],FromMillis(f.split("-")[1]*1000),true)
})
await interaction.editReply({content:"Here is your today's genshin report",embeds:[embed]})
}
}
}
catch(e)
{
console.error(e)
}
}
if(interaction.commandName=="daily_limit")
{
await interaction.deferReply()
var hours= interaction.options.getInteger('hours');
var minutes= interaction.options.getInteger('minutes');
if(!minutes)minutes=0
var conf=getData(interaction.user.id)
var prev=conf.dailyLimit
conf.dailyLimit=(hours*60*60*1000)+(minutes*60*1000)
let temp=conf
temp.config=JSON.stringify(temp.config)
clien.setData.run(temp)
await interaction.editReply("Changed your limit from "+FromMillis(prev)+" To "+FromMillis(conf.dailyLimit))
}
});


//Snooze button interaction listener
client.on('interactionCreate',async interaction => {
	if (!interaction.isButton()) return;
if(interaction.customId==='snooze')
{
try{
if(snoozed[interaction.user.id])
{
await interaction.deferReply();
interaction.editReply("You have already snoozed once today")
return
}
else
{
await interaction.deferReply();
snoozed[interaction.user.id]=Date.now()
overplaying[interaction.user.id]=false
interaction.editReply("Snoozed for 15 minutes till <t:"+((Date.now()/1000)+15*60).toFixed(0)+":t> (<t:"+((Date.now()/1000)+15*60).toFixed(0)+":R>)")
}
}
catch(e)
{
console.error(e)
}
}
});


function erremb(msg) {
if(!msg)msg="."
    const embed = new MessageEmbed().setColor("PURPLE").setTitle(msg);
  return embed;
}
function emb(msg) {
  const embed = new MessageEmbed()
      .setColor("PURPLE").setTitle(".")
    .setDescription(msg);
  return embed;
}

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}
client.on("messageCreate", async message => {
  if (message.author.id != config.owner) return;
  if (
    message.channel.type === "dm" ||
    message.author.bot ||
    message.author === client.user
  )
    return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase(); // Replaces the Current Prefix with this
if(command=="applicationid")
{
message.channel.send(message.member.presence?.activities[0]?.applicationId||"You do not have an activity playing")
}
  if (command == "eval") {
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send("```xl\n"+clean(evaled)+"```");
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

let temppresencea ={},temppresencer ={} //Temporary variable to store adding user id incase the bot and user are in multiple guilds so it triggers more than once

 
client.on("presenceUpdate", async (oldp,newp) =>{
var conf=getData(newp.user.id)
if(conf.consent=="false")return //No consent for data recording
if(oldp?.activities[0]?.applicationId!=config.presence_id&&newp?.activities[0]?.applicationId!=config.presence_id)return // Non genshin presence ID return
if(oldp?.activities[0]?.applicationId==newp?.activities[0]?.applicationId)return // Still playing the application 😠
if(oldp?.activities[0]?.applicationId!=config.presence_id) //If started playing the application
{

if(temppresencea[newp.user.id]==true)return //Return if already triggerred in last 15 seconds
temppresencea[newp.user.id]=true
setTimeout(()=>{
delete temppresencea[newp.user.id] //Allow to retrigger after 15 seconds 
},15*1000)

conf.playedToday+=1 //Add 1 milisecond so the stats command works if its at day reset
let temp=conf
temp.config=JSON.stringify(temp.config)
clien.setData.run(temp)

const event = new Date(Date.now());

event.setUTCDate(event.getUTCDate()+1);
event.setHours(0)
event.setSeconds(0)
event.setMilliseconds(0)
event.setMinutes(0)  //Creating a 00:00:00 time for the next day
 try
{
var timeee=FromMillis(conf.dailyLimit-conf.playedToday,{long:true})+" left"
if(conf.dailyLimit-conf.playedToday<0)
{
timeee="overplayed by "+FromMillis(conf.playedToday-conf.dailyLimit,{long:true});
overplay(newp.member); //Start the reminder spam
}
/*On play message, Disabled because of QoL violation

var embed=emb(`You have started playing **${newp.activities[0].name}** at <t:${(newp.activities[0].createdTimestamp/1000).toFixed(0)}:F> (<t:${(newp.activities[0].createdTimestamp/1000).toFixed(0)}:R>)
Bot has started counting your time and will notify when you reach the limit

You have ${timeee} for today (Resets <t:${(Date.parse(event)/1000).toFixed(0)}:R>)`).setTitle("Started Game").setColor("RED").setTimestamp()

newp.user.send({embeds:[embed]})

On play message, Disabled because of QoL violation*/
}
catch(e)
{
console.log(e)
}
}
if(newp?.activities[0]?.applicationId!=config.presence_id) //If stopped playing the application
{

if(temppresencer[newp.user.id]==true)return//Return if already triggerred in last 15 seconds
temppresencer[newp.user.id]=true
setTimeout(()=>{
delete temppresencer[newp.user.id]//Allow to retrigger after 15 seconds 
},15*1000)

var sessionplayed=Date.now()-oldp.activities[0].createdTimestamp

const event = new Date(Date.now());

conf.playedToday+=sessionplayed

var timeee=FromMillis(conf.dailyLimit-conf.playedToday,{long:true})+" left"
    if (conf.dailyLimit - conf.playedToday < 0) timeee = "overplayed by " + FromMillis(conf.playedToday - conf.dailyLimit, { long: true }); overplaying[user.id] == false; //if spamming already then allow for more spam

event.setHours(0)
event.setSeconds(0)
event.setMilliseconds(0)
event.setMinutes(0) //Creating a 00:00:00 time for today

if(!conf.config.data[Date.parse(event).toString()])conf.config.data[Date.parse(event).toString()]={times:[],totalPlayed:0} //Create a property with the name of milliseconds of the day for stats command(WIP)
conf.config.data[Date.parse(event).toString()].times.push((oldp.activities[0].createdTimestamp/1000).toFixed(0)+"-"+(Date.now()/1000).toFixed(0))//Push into the array of the session start- session end time
let temp=conf
temp.config=JSON.stringify(temp.config)
clien.setData.run(temp)

event.setUTCDate(event.getUTCDate()+1);
try
{
var d=Date.now()
var embed=emb(`You have stopped playing **${oldp.activities[0].name}** at <t:${(d/1000).toFixed(0)}:F> (<t:${(d/1000).toFixed(0)}:R>)

You have ${timeee} for today (Resets <t:${(Date.parse(event)/1000).toFixed(0)}:R>)

**Session Information**`).setTitle("Stopped Game").setColor("GREEN").setTimestamp()
.addField("Started Playing At","<t:"+(oldp.activities[0].createdTimestamp/1000).toFixed(0)+":F> (<t:"+(oldp.activities[0].createdTimestamp/1000).toFixed(0)+":R>)",true)
.addField("Stopped Playing At","<t:"+(d/1000).toFixed(0)+":F> (<t:"+(d/1000).toFixed(0)+":R>)",true)
.addField("Played For",FromMillis(sessionplayed))
newp.user.send({embeds:[embed]})
}
catch(e)
{
console.log(e)
}
}
})

//Function to reminder spam and check if still playing after max time
async function overplay(user)
{
    if (overplaying[user.id] == true) return //Already running on this account
    async function msg() {
var conf=getData(user.id)
if(user.presence?.activities[0]?.applicationId==config.presence_id)  //Still playing the application
{
var sessionplayed=Date.now()-user.presence.activities[0].createdTimestamp
var timeleft=conf.dailyLimit-(conf.playedToday+sessionplayed)
if(timeleft<0)
{
const event = new Date(Date.now());
event.setUTCDate(event.getUTCDate()+1);
event.setHours(0)
event.setSeconds(0)
event.setMilliseconds(0)
event.setMinutes(0)         //Creating a 00:00:00 time for the next day

let embed=emb(`You have been overplaying this game for ${FromMillis(timeleft*-1)}
Please stop playing for today
Today's timer resets <t:${(Date.parse(event)/1000).toFixed(0)}:R>

*Please do not block the bot, You set this bot up so its just doing its work, You can press this button to snooze for 15 minutes(If its disabled then you have already snoozed)*
**The bot will message every minute until you stop playing**`).setTitle("Overplaying Genshin Alert").setColor("#660000")

const row = new MessageActionRow()
var button=new MessageButton()
.setCustomId('snooze')
.setLabel('Snooze for 15 minutes')
.setStyle('DANGER')
if(snoozed[user.user.id])button.setDisabled(true) //If already snoozed return
row.addComponents(button)

setTimeout(msg,60*1000) //Restart this after 1 minute
overplaying[user.id]=true //Set that one process has already started messaging
if(!snoozed[user.id]||Date.now()-snoozed[user.user.id]>15*60*1000)
{
user.user.send({content:user.toString(),embeds:[embed], components:[row]}).catch(e=>{
console.log(e)
})
}
}
}
else
{
overplaying[user.id]=false// stopped playing so change to false to allow for overplaying spam later
}
}
msg()
}

//Get user data from the database 
function getData(user){
var conf=clien.getData.get(user)
if(!conf)
{
conf={
id:user,
user:user,
consent:"false",
dailyLimit:24*60*60*1000,
dailyHardLimit:4*60*60*1000,
playedToday:0,
config:`{"data":{}}`
}
}
conf.config=JSON.parse(conf.config,null,2); //i know this is probably dumb, but since i use a flat database i stringify my object and store it as a string, It works and doesnt get broken so idrc.
return conf;
}

//Milliseconds to hours-minutes-seconds function, Didnt remove the "days" thing coz i was too lazy and just copied pasted my code from some other project
function FromMillis(ms) {
  let days = Math.floor(ms / (24 * 60 * 60 * 1000));
  let daysms = ms % (24 * 60 * 60 * 1000);
  let hours = Math.floor(daysms / (60 * 60 * 1000));
  let hoursms = ms % (60 * 60 * 1000);
  let minutes = Math.floor(hoursms / (60 * 1000));
  let minutesms = ms % (60 * 1000);
  let sec = Math.floor(minutesms / 1000);
hours+=days*24
  return (
    "**"+
    hours +
    "** Hours **" +
    minutes +
    "** Minutes **" +
    sec +
    "** Seconds"
  );
}

const CronJob = require("cron").CronJob;

//Daily reset cron job
  const job = new CronJob("0 0 0 * * *",async function() {
console.log("ran")
let  alldata = db
      .prepare(
        "SELECT * FROM data;"
      ).all()
alldata=alldata.filter(l=>l.consent=='true')
snoozed={}
for(var a of alldata)
{
a.config=JSON.parse(a.config)
const event = new Date(Date.now());

event.setUTCDate(event.getUTCDate()-1);
event.setHours(0)
event.setSeconds(0)
event.setMilliseconds(0)
event.setMinutes(0)

if(a.playedToday==0)
{
a.config.data[Date.parse(event).toString()]={times:[],totalPlayed:0}
let temp=a
temp.config=JSON.stringify(temp.config)
clien.setData.run(temp)
//client.users.cache.get(a.user).send("Great work! You did not play at all today.")
}
else
{
var user=client.users.cache.get(a.user)
a.config.data[Date.parse(event).toString()].totalPlayed=a.todayPlayed
var allsessions=a.config.data[Date.parse(event).toString()].times.map(f=>{
var from=f.split("-")[0]
var to=f.split("-")[1]
return `<t:${from}:t> To <t:${to}:t>-${to-from}`
})

let embed=emb(`You played a total of ${FromMillis(a.playedToday)}
Your max limit was ${FromMillis(a.dailyLimit)}
${a.dailyLimit-a.playedToday<0?"You played "+FromMillis(a.playedToday-a.dailyLimit)+" more than what you were supposed to :angry: ":"You played "+FromMillis(a.dailyLimit-a.playedToday)+" less than what your max limit was :smile: "}`)
.setTitle("Daily Genshin Playtime Report For <t:"+((Date.parse(event)/1000).toFixed(0)).toString()+":D>").setTimestamp()
allsessions.forEach(f=>{
embed.addField(f.split("-")[0],FromMillis(f.split("-")[1]*1000),true)
})
user.send({content:"Here is your daily genshin report",embeds:[embed]})
a.playedToday=0

let temp=a
temp.config=JSON.stringify(temp.config)
clien.setData.run(temp)
}
}
})
job.start()

//Every minute overplay check cron job
const job1 = new CronJob("0 * * * * *",async function() {
let  alldata = db
      .prepare(
        "SELECT * FROM data;"
      ).all()
alldata=alldata.filter(l=>l.consent=='true')
for(var a of alldata)
{
var guild=client.guilds.cache.find(guild => guild.members.cache.get(a.user));
if(!guild)continue
var member=guild.members.cache.get(a.user)
overplay(member)
}
})
job1.start()