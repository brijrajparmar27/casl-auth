import { useContext } from 'react';
import { users } from '../constants/app-constants';
import { NotesContext } from '../context/NotesContect';

const AppContent = () => {
  const { notes, setNotes } = useContext(NotesContext);

  const handleDelete = (note) => {
    setNotes((prev) => prev.filter((each) => each.id !== note.id));
  };

  const handleCheckChange = (note) => {
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
        display: 'flex',
        height: '100%',
        gap: '15px',
        padding: '0px 15px 15px 15px',
      }}
    >
      {users.map((sectionUser) => {
        if (sectionUser.isAdmin) return;
        return (
          <div
            key={sectionUser.id}
            style={{
              display: 'flex',
              flex: 1,
              borderRadius: '10px',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <h2 style={{ textAlign: 'left' }}>{sectionUser.title}</h2>
            {notes
              ?.filter((note) => note.createdBy === sectionUser.id)
              .map((note) => (
                <div
                  key={note.id}
                  style={{
                    backgroundColor: '#3f3f3f',
                    padding: '15px',
                    borderRadius: '10px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={note.checked}
                        onClick={() => handleCheckChange(note)}
                      />
                      <h4>{note.text}</h4>
                    </div>
                    <button onClick={() => handleDelete(note)}>Delete</button>
                  </div>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default AppContent;
