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
  return guildRoles.cache.find((r) => r.rawPosition === role.rawPosition + 1);
}

function addNewRole(msg) {
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

function hasToIncreaseRole(rank) {
  return ((rank[0].rank + 1) % Number.parseInt(process.env.INCREASE_ROLE_BY_RANK_INTERVAL)) === 0;
}

module.exports = {
  addNewRole,
  hasToIncreaseRole
}