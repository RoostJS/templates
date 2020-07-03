import validateAccess from './validateAccess';
import { UserRoles } from './constants';

describe('ValidateAccess', () => {
  it('can validate a single user role', () => {
    expect(validateAccess(UserRoles.USER, UserRoles.USER)).toBeTruthy();
  });

  it('can validate a higher priority role', () => {
    expect(validateAccess(UserRoles.USER, UserRoles.ADMIN)).toBeTruthy();
  });

  it('will fail on invalid role', () => {
    expect(validateAccess('cow', UserRoles.ADMIN)).toBeFalsy();
  });

  it('can validate super admin', () => {
    expect(validateAccess(UserRoles.ADMIN, UserRoles.SUPER));
  });
});
