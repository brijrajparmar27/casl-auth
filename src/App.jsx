import "./App.css";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import { NotesProvider } from "./context/NotesContect";
import PermissionsProvider from "./context/PermissionsContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <PermissionsProvider>
        <NotesProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              width: "100vw",
            }}
          >
            <AppHeader />
            <AppContent />
          </div>
        </NotesProvider>
      </PermissionsProvider>
    </UserProvider>
  );
}

export default App;
