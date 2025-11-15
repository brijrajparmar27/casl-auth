import { AbilityBuilder, createMongoAbility } from "@casl/ability";

const permissions = (user) => {
  console.log(user);

  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (!user) {
    // guests: no actions
    return build();
  }

  if (user.title === "Admin") {
    // admin can update & delete any note
    can(["update", "delete"], "note");

    // admin cannot create note
    cannot("create", "note");
  } else {
    console.log(user.id);

    // regular user: only update/delete notes they own
    can(["update", "delete"], "note", { userId: user.id });

    // user can create their own notes
    can("create", "note");
  }

  return build({ detectSubjectType: (subject) => subject.type });
};

export default permissions;
