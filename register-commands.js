const {REST} = require("@discordjs/rest")
const {Routes} = require("discord-api-types/v9")
const dotenv = require("dotenv")
const fs = require("fs")

dotenv.config();

const commands = [];

const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({version: "9"}).setToken(process.env.DISCORD_TOKEN);


(async () => {
    try {
        console.log('registering slash commands...')
        await rest.put(
            Routes.applicationCommands(
                process.env.CLIENT_ID
            ),
            {body: commands}
        ).then((res)=>{
            console.log(res)
        })

    } catch (err) {
        console.error(err);
    }
})();
