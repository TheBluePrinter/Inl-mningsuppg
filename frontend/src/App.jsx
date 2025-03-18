import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThreadProvider } from "./contexts/ThreadContext";
import ThreadList from "./components/ThreadList";
import CreateThread from "./components/CreateThread";
import ThreadDetail from "./components/ThreadDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <ThreadProvider>
        <div className="app">
          <nav className="navbar">
            <h1>Discussion Forum</h1>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/create">Create Thread</Link>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<ThreadList />} />
              <Route path="/create" element={<CreateThread />} />
              <Route path="/thread/:id" element={<ThreadDetail />} />
            </Routes>
          </main>
        </div>
      </ThreadProvider>
    </Router>
  );
}

export default App;
