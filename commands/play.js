const {SlashcommandBuilder, SlashCommandBuilder} = require('@discordjs/builders')
const {QueryType} = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('音楽を再生します。')
        .addStringOption((option) =>
            option.setName('url')
                .setDescription('Youtube URL')
                .setRequired(true)),

    run: async ({client, interaction}) => {
        if (!interaction.member.voice.channelId) {
            return await interaction.reply({
                content: 'VCにいる必要があります。'
            });
        }
        const queue = client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel,
            },
        });
        try{
            if(!queue.connection){
                await queue.connect(interaction.member.voice.channel);
            }
        }catch {
            return await interaction.reply({
                content: 'VCに接続できません。'
            })
        }
        await interaction.deferReply();
        const url = interaction.options.getString('url');
        const track = await client.player
            .search(url,{
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            }).then((x)=> x.tracks[0]);

        if(!track){
            return await interaction.followUp({
                content: '該当なし.'
            });
        }
        await queue.addTrack(track);

        if(!queue.playing){
            queue.play();
        }
        return await interaction.followUp({
            content: `${track.title} を再生します...`,
        });
    }
}