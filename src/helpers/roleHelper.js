function getHigherRole(roles) {
  const higher = roles.cache.reduce((last, actual) => {
    return last.rawPosition >= actual.rawPosition ? last : actual;
  });

  return higher;
}

function checkisMaxRole(role) {
  return role.name === process.env.MAXROLENAME;
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
  msg.member.roles.add(nextRole);
}

module.exports = {
  addNewRole
}