import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchNotes, createNote, deleteNote } from "../services/noteService";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const token = await getAccessTokenSilently();
        const notes = await fetchNotes(token);
        setNotes(notes);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
        setError("Failed to fetch notes.");
      }
    };
    loadNotes();
  }, [getAccessTokenSilently]);

  const handleAddNote = async () => {
    if (!noteInput.trim()) {
      setError("Note cannot be empty.");
      return;
    }
    try {
      const token = await getAccessTokenSilently();
      const newNote = await createNote(noteInput, token);
      setNotes([...notes, newNote]);
      setNoteInput("");
      setError("");
    } catch (err) {
      console.error("Failed to add note:", err);
      setError("Failed to add note.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteNote(id, token);
      setNotes(notes.filter((n) => n._id !== id));
      setError("");
    } catch (err) {
      console.error("Failed to delete note:", err);
      setError("Failed to delete note.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="logout-button"
        >
          Sign Out
        </button>
      </header>

      <div className="user-info-card">
        <h2>Welcome, {user?.name || "User"}</h2>
        <p className="user-email">{user?.email}</p>
        <button
          onClick={() => {
            setNoteInput("");
            document.querySelector(".note-input-field")?.focus();
          }}
          className="create-note-button"
        >
          Create Note
        </button>
      </div>

      <div className="notes-section">
        <h3>Notes</h3>
        <div className="note-input-area">
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Write a note..."
            className="note-input-field"
          />
          <button onClick={handleAddNote} className="add-note-button">
            Add Note
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <ul className="note-list">
          {notes.length === 0 && !error && (
            <p className="no-notes-message">No notes yet. Add one!</p>
          )}
          {notes.map((note) => (
            <li key={note._id} className="note-item">
              <span className="note-text">{note.text}</span>
              <button
                onClick={() => handleDelete(note._id)}
                className="delete-note-button"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
