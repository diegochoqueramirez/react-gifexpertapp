import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { loadImage } from '../helpers/loadImage';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const doc = await db.collection(`${uid}/journals/notes`).add(newNote);

    dispatch(activeNote(doc.id, newNote));
    dispatch(insertarNota(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const insertarNota = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note },
});

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startLoadNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const formNote = { ...note };
    delete formNote.id;

    await db.doc(`${uid}/journals/notes/${note.id}`).update(formNote);

    dispatch(updateNote(note.id, formNote));
    Swal.fire('Saved', note.title, 'success');
  };
};

export const updateNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const uploadImage = (file) => {
  return async (dispatch, getState) => {
    const { active } = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const url = await loadImage(file);

    active.url = url;
    dispatch(startSaveNote(active));

    Swal.close();
  };
};

export const startDeleteNote = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    await db.doc(`${uid}/journals/notes/${id}`).delete();

    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const notesLogout = () => ({
  type: types.notesLogoutCleaning,
});
