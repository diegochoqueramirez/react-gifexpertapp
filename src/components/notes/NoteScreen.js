import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleteNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const dispatch = useDispatch();

  const activeId = useRef(note.id);

  useEffect(() => {
    if (activeId.current !== note.id) {
      reset(note);
      activeId.current = note.id;
    }
  }, [reset, note]);

  const { title, body, id } = formValues;

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleteNote(id));
  };

  return (
    <div className='notes__main-content'>
      <NotesAppBar />

      <div className='notes__content'>
        <input
          type='text'
          placeholder='Some awesome title'
          className='notes__title-input'
          autoComplete='off'
          value={title}
          onChange={handleInputChange}
          name='title'
        />
        <textarea
          placeholder='what happened today'
          className='notes__text-area'
          value={body}
          onChange={handleInputChange}
          name='body'
        ></textarea>
        {note.url && (
          <div className='notes__image'>
            <img src={note.url} alt='una imagen' />
          </div>
        )}
      </div>

      <button className='btn btn-danger' onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
