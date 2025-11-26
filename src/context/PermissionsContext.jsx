import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { createContext, useContext, useMemo } from "react";
import { UserContext } from "./UserContext";

export const PermissionsContext = createContext(createMongoAbility([]));

// eslint-disable-next-line react/prop-types
export default function PermissionsProvider({ children }) {
  const { user } = useContext(UserContext);
  const ability = useMemo(() => {
    // Build ability whenever "user" changes
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (!user) {
      return build();
    }

    if (user.title === "Admin") {
      can(["update", "delete"], "note");
      cannot("create", "note");
    } else {
      can(["update", "delete"], "note", { userId: user.id });
      can("create", "note");
    }

    return build({
      detectSubjectType: (subject) => subject.type,
    });
  }, [user]);

  return (
    <PermissionsContext.Provider value={ability}>
      {children}
    </PermissionsContext.Provider>
  );
}
