import { useContext } from "react";
import { users } from "../constants/app-constants";
import { NotesContext } from "../context/NotesContect";
import { PermissionsContext } from "../context/PermissionsContext";

const AppContent = () => {
  const { notes, setNotes } = useContext(NotesContext);
  const ability = useContext(PermissionsContext);

  console.log(ability.rules);

  const handleDelete = (note) => {
    if (ability.cannot("delete", { type: "note", userId: note.createdBy }))
      return;
    setNotes((prev) => prev.filter((each) => each.id !== note.id));
  };

  const handleCheckChange = (note) => {
    if (ability.cannot("update", { type: "note", userId: note.createdBy }))
      return;
    setNotes((prev) =>
      prev.map((each) => ({
        ...each,
        checked: note.id === each.id ? !each.checked : each.checked,
      }))
    );
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        gap: "15px",
        padding: "0px 15px 15px 15px",
      }}
    >
      {users.map((sectionUser) => {
        if (sectionUser.isAdmin) return;

        return (
          <div
            key={sectionUser.id}
            style={{
              display: "flex",
              flex: 1,
              borderRadius: "10px",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h2 style={{ textAlign: "left" }}>{sectionUser.title}</h2>

            {notes
              ?.filter((note) => note.createdBy === sectionUser.id)
              .map((note) => {
                const canUpdate = ability.can("update", {
                  type: "note",
                  userId: note.createdBy,
                });
                console.log("debug update", {
                  ruleYouThinkYouHave: ability.rules,
                  subject: { type: "note", createdBy: note.createdBy },
                  canUpdate,
                });
                const canDelete = ability.can("delete", {
                  type: "note",
                  userId: note.createdBy,
                });
                console.log(canDelete, canUpdate);

                return (
                  <div
                    key={note.id}
                    style={{
                      backgroundColor: "#3f3f3f",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        {/* Checkbox visible only if user can update */}
                        {canUpdate && (
                          <input
                            type="checkbox"
                            checked={note.checked}
                            onChange={() => handleCheckChange(note)}
                          />
                        )}
                        <h4>{note.text}</h4>
                      </div>

                      {/* Delete button visible only if user can delete */}
                      {canDelete && (
                        <button onClick={() => handleDelete(note)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default AppContent;
