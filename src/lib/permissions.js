export function can(permissions, codename, isOwner = false) {
  if (isOwner) return true;
  return Array.isArray(permissions) && permissions.includes(codename);
}

export function canAny(permissions, codenames, isOwner = false) {
  if (isOwner) return true;
  return codenames.some((codename) => permissions.includes(codename));
}

export function canAll(permissions, codenames, isOwner = false) {
  if (isOwner) return true;
  return codenames.every((codename) => permissions.includes(codename));
}
