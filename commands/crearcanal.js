const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crearcanal')
    .setDescription('Crea un nuevo canal en el servidor')
    .addStringOption(option =>
      option
        .setName('nombre')
        .setDescription('Nombre del canal')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('tipo')
        .setDescription('Tipo de canal (texto o voz)')
        .setRequired(false)
        .addChoices(
          { name: 'Texto', value: 'text' },
          { name: 'Voz', value: 'voice' }
        )
    ),
  
  async execute(interaction) {
    const nombre = interaction.options.getString('nombre');
    const tipo = interaction.options.getString('tipo') || 'text';

    // Verificar permisos
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({
        content: '❌ No tienes permisos para crear canales.',
        ephemeral: true
      });
    }

    try {
      const nuevoCanal = await interaction.guild.channels.create({
        name: nombre,
        type: tipo === 'voice' ? ChannelType.GuildVoice : ChannelType.GuildText,
      });

      await interaction.reply({
        content: `✅ Canal creado: ${nuevoCanal}`,
        ephemeral: false
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: '❌ Hubo un error al crear el canal.',
        ephemeral: true
      });
    }
  }
};
