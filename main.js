const dotenv = require("dotenv");
const {Client, Events, Collection} = require("discord.js");
const {GatewayIntentBits} = require("discord-api-types/v10");

dotenv.config()

const TOKEN = process.env.DISCORD_TOKEN

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
})
client.commands = new Collection()


client.once(Events.ClientReady, c=>{
    console.log(`Logged in as: ${c.user.tag}`)
})


client.login(TOKEN);
