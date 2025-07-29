import axios from "axios";

const API = "http://localhost:5000/api/notes";

export const fetchNotes = async (token) => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createNote = async (text, token) => {
  const res = await axios.post(
    API,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deleteNote = async (id, token) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
