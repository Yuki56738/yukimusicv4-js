const {SlashCommandBuilder} = require("@discordjs/builders");


module.exports ={
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('ιεΊγγ.'),
        run: async ({ client, interaction })=>{
            const queue = client.player.getQueue(interaction.guildId);

            queue.destroy();

            await interaction.reply({
                content: 'Disconnecting...'
            })
}}