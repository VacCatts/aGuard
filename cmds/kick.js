exports.run = async (bot, message) => {
    const user = message.mentions.users.first();
    let split = message.content.split(" ");
    if (split.length === 3) {
        console.log("d");
        if (user) {
            const member = message.guild.member(user);
            if (member) {
              member.kick(split[2]).then(() => {
                message.reply(`Successfully kicked ${user.tag}`);
              }).catch(err => {
                message.reply('cant kick, maybe perms');
                console.error(err);
              });
            } else {
              message.reply('that users not here');
            }
        }
    } else {
        message.reply("usage: .kick @user reason");
    }
};