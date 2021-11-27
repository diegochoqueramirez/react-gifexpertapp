import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, uploadImage } from '../../actions/notes';

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);
  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handlePicture = () => {
    document.querySelector('#fileSelector').click();
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadImage(file));
    }
  };

  return (
    <div className='notes__appbar'>
      <span>5 de junio de 2021</span>

      <input
        type='file'
        style={{ display: 'none' }}
        id='fileSelector'
        onChange={handleFile}
      />

      <div>
        <button className='btn' onClick={handlePicture}>
          Picture
        </button>
        <button className='btn' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
