import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const usePermissions = () => {
  const user = useContext(UserContext);

  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (!user) {
    // guests: no actions
    return build();
  }

  if (user.role === 'admin') {
    // admin can update & delete any note
    can(['update', 'delete'], 'note');

    // admin cannot create note
    cannot('create', 'note');
  } else {
    // regular user: only update/delete notes they own
    can(['update', 'delete'], 'note', { userId: user.id });

    // user can create their own notes
    can('create', 'note');
  }

  return build();
};

export default usePermissions;
