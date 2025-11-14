import { useContext } from 'react';
import { NotesContext } from '../context/NotesContect';
import { users } from '../constants/app-constants';
import { UserContext } from '../context/UserContext';
import usePermissions from '../permissions/permissionsEngine';

const AppHeader = () => {
  const { setNotes } = useContext(NotesContext);
  const { user, setUser } = useContext(UserContext);

  const ability = usePermissions();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ability.cannot('create', 'note')) return; // << BLOCK admin here

    const noteText = e.target.note.value.trim();
    if (!noteText) return;

    setNotes((prev) => [
      {
        createdBy: user.id,
        text: noteText,
        checked: false,
        id: Math.round(Math.random() * 1000),
      },
      ...prev,
    ]);

    e.target.reset();
  };

  return (
    <div
      style={{
        width: '100%',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      {/* Show create form only if user can create */}
      {ability.can('create', 'note') && (
        <div>
          <form
            style={{ display: 'flex', gap: '10px' }}
            onSubmit={handleSubmit}
          >
            <input type="text" name="note" style={{ paddingLeft: '8px' }} />
            <button type="submit">Add Note</button>
          </form>
        </div>
      )}

      {/* User Switch Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {users.map((each) => {
          return (
            <button
              style={{
                backgroundColor: user.id === each.id ? '#7c50c7' : '',
              }}
              key={each.id}
              onClick={() => setUser(each)}
            >
              {each.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AppHeader;
