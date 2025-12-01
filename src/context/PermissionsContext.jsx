import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { createContext, useContext, useMemo } from 'react';
import { UserContext } from './UserContext';
import { AdminPermissions } from '../permissions/Admin.permissions';
import { UserPermissions } from '../permissions/User.permissions';

export const PermissionsContext = createContext(createMongoAbility([]));

// eslint-disable-next-line react/prop-types
export default function PermissionsProvider({ children }) {
  const { user } = useContext(UserContext);

  const ability = useMemo(() => {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (!user) return build();

    if (user.title === 'Admin') {
      AdminPermissions(can, cannot, user);
    } else {
      UserPermissions(can, cannot, user);
    }

    return build({
      detectSubjectType: (s) => s.type,
    });
  }, [user]);

  return (
    <PermissionsContext.Provider value={ability}>
      {children}
    </PermissionsContext.Provider>
  );
}
