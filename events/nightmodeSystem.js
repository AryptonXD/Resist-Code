const client = require('../index.js');
const { ownerIDS } = require('../owner.json');

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (!newMember.guild.me.permissions.has('VIEW_AUDIT_LOG')) {
        return;
    }
    const auditLogs = await newMember.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_ROLE_UPDATE' });
    const logs = auditLogs.entries.first();
    if (!logs) return;

    const { executor, target } = logs;
    const nightmodeSettings = await client.db15.get(`${newMember.guild.id}_nightmodeSettings`);
    const nightmodeGuild = await client.db15.get(`${newMember.guild.id}_nightmodeGuild`);
    const extraOwner = await client.db11.get(`${newMember.guild.id}_eo.extraownerlist`) || [];
    const roleData = await client.db15.get(`${newMember.guild.id}_nightmode.nightmoderoleslist`) || [];
    const bypassData = await client.db15.get(`${newMember.guild.id}_nightmode.nightmodebypasslist`) || [];

    if (!roleData) return;

    const botHighestRolePosition = newMember.guild.me.roles.highest.position;

    const rolesToRemove = newMember.roles.cache.filter((role) => {
        const rolePosition = role.position;
        return (
            roleData.includes(role.id) &&
            rolePosition < botHighestRolePosition
        );
    });

    if (newMember.guild.ownerId.includes(executor.id) || ownerIDS.includes(executor.id) || extraOwner.includes(executor.id) || bypassData.includes(executor.id) || nightmodeSettings !== true) return;

    if (rolesToRemove.size > 0) {
        await newMember.roles.remove(rolesToRemove);
    }
});
