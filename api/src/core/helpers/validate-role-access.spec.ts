import { validateRoleAccess } from './validate-role-access';
import { UserRoles } from '@/core/constants';

// Current Role / New Role

describe('ValidateAccess', () => {
  it('can validate a single user role', () => {
    // I am a USER and I want to do USER things
    expect(validateRoleAccess(UserRoles.USER, UserRoles.USER)).toBeTruthy();
  });

  it('can validate a higher priority role', () => {
    // I am an OWNER and I want to do USER thing
    expect(validateRoleAccess(UserRoles.OWNER, UserRoles.USER)).toBeTruthy();
  });

  it('can not validate an invalid role', () => {
    // I am an OWNER and I want to do cow things
    expect(validateRoleAccess(UserRoles.OWNER, 'cow')).toBeFalsy();
  });

  it('can validate ADMIN OWNER', () => {
    // I am a ADMIN and I want to do OWNER things
    expect(validateRoleAccess(UserRoles.ADMIN, UserRoles.OWNER)).toBeTruthy();
  });

  it('can not validate a lower priority role', () => {
    // I am an OWNER and I want to do ADMIN things
    expect(validateRoleAccess(UserRoles.OWNER, UserRoles.ADMIN)).toBeFalsy();
  });
});
