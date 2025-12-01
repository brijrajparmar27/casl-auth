import { AbilityBuilder, MongoAbility } from '@casl/ability';

type Actions = 'create' | 'read' | 'update' | 'delete';
type Subjects = 'note';

type AppAbility = MongoAbility<[Actions, Subjects]>;

type Can = AbilityBuilder<AppAbility>['can'];
type Cannot = AbilityBuilder<AppAbility>['cannot'];

export function AdminPermissions(can: Can, cannot: Cannot) {
  can(['update', 'delete'], 'note');
  cannot('create', 'note');
}
