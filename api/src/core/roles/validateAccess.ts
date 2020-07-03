import { UserRoles, Roles, IRole } from './constants';
/**
 * Validate access based on provided role
 * Role check is cascading
 *
 * @param {string} acceptedRole What role does the user need to have
 * @param {string} userRole What role does this user have
 *
 * @returns {boolean}
 */
export default function(acceptedRole: string, userRole: string): boolean {
  // Always approve superAdmin
  if (userRole === UserRoles.SUPER) {
    return true;
  }

  // Get role objects to check priorities
  const userRoleObj: IRole = Roles.find(
    (role: IRole) => userRole === role.role,
  );
  const acceptedRoleObj: IRole = Roles.find(
    (role: IRole) => acceptedRole === role.role,
  );

  // Fail if either role object isn't found
  if (!userRoleObj || !acceptedRoleObj) {
    return false;
  }

  return userRoleObj.priority >= acceptedRoleObj.priority;
}
