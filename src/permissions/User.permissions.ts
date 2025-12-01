import { AbilityBuilder, MongoAbility } from '@casl/ability';

type Actions = 'create' | 'read' | 'update' | 'delete';
type Subjects = 'note';

type AppAbility = MongoAbility<[Actions, Subjects]>;

type Can = AbilityBuilder<AppAbility>['can'];
type Cannot = AbilityBuilder<AppAbility>['cannot'];

export function UserPermissions(can: Can, cannot: Cannot, user: any) {
  can(['update', 'delete'], 'note', { userId: user.id });
  can('create', 'note');
}
