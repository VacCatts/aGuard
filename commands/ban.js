const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('bans mentioned user')
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('user you want to ban')
				.setRequired(true),
		),
	async execute(interaction) {
		if (interaction.member?.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			const user = interaction.options.getMember('target');
			if (interaction.member == user) {
				await interaction.reply('you can\'t kick yourself');
			}
			else {
				user.ban();
				await interaction.reply(`ban user ${user}`);
			}
		}
		else {
			await interaction.reply('you do not have permission to kick');
		}

	},
};
