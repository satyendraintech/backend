const roles = {
  admin: ["create", "update", "delete", "read"],
  user: ["read", "update"],
  guest: ["read"],
};

module.exports = roles;
