function getHigherRole(roles) {
  const higher = roles.cache.reduce((last, actual) => {
    return last.rawPosition >= actual.rawPosition ? last : actual;
  });

  return higher;
}

function checkisMaxRole(role) {
  return role.name === process.env.MAX_ROLE_NAME;
}

function getNextRole(role, guildRoles) {
  return guildRoles.cache.find((guildRole) => guildRole.rawPosition === role.rawPosition + 1);
}

function addNextRoleToMember(msg) {
  const actualHigherRole = getHigherRole(msg.member.roles);
  const isMaxRole = checkisMaxRole(actualHigherRole);

  if (isMaxRole) {
    return;
  }

  const nextRole = getNextRole(actualHigherRole, msg.guild.roles);
  if (nextRole) {
    msg.member.roles.add(nextRole);
  }
}

function getInitialRole(guildRoles) {
  return guildRoles.cache.find((guildRole) => guildRole.name === process.env.INITIAL_ROLE);
}

function addInitialRole(member) {
  const initialRole = getInitialRole(member.guild.roles);

  if (initialRole) {
    member.roles.add(initialRole);
  }
}

function hasToIncreaseRole(rank) {
  return ((rank[0].rank + 1) % Number.parseInt(process.env.INCREASE_ROLE_BY_RANK_INTERVAL)) === 0;
}

module.exports = {
  addNextRoleToMember,
  hasToIncreaseRole,
  addInitialRole
}