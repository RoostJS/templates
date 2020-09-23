import { UserRoles, Roles, IRole } from '@/core/constants';

/**
 * Validate access based on provided role
 * Role check is cascading
 *
 * @param {string} currentRole What role does this user have
 * @param {string} newRole What role does the user need to have
 *
 * @returns {boolean}
 */
export function validateRoleAccess(
  currentRole: string,
  newRole: string,
): boolean {
  // Always approve ADMIN
  if (currentRole === UserRoles.ADMIN) {
    return true;
  }

  // Get the current user role
  const currentRoleObj: IRole = Roles.find(
    (role: IRole) => currentRole === role.role,
  );
  // Get the new role
  const newRoleObj: IRole = Roles.find((role: IRole) => newRole === role.role);

  // Fail if either role object isn't found
  if (!currentRoleObj || !newRoleObj) {
    return false;
  }

  // Check if current role allows for new role
  return currentRoleObj.priority >= newRoleObj.priority;
}
