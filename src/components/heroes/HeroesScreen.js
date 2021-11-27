import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router';
import { getHeroById } from '../../selectors/getHeroById';

export const HeroesScreen = ({ history }) => {
  const { heroId } = useParams();

  const hero = useMemo(() => getHeroById(heroId), [heroId]);

  const { superhero, publisher, alter_ego, first_appearance, characters } =
    hero;

  if (!hero) {
    return <Redirect to='/' />;
  }

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/');
    } else {
      history.goBack();
    }
  };

  return (
    <div className='row mt-5'>
      <div className='col-4'>
        <img
          src={`../assets/heroes/${heroId}.jpg`}
          className='img-thumbnail animate__animated animate__fadeInLeft'
          alt={superhero}
        />
      </div>
      <div className='col-8 animate__animated animate__fadeIn'>
        <h3> {superhero}</h3>
        <ul className='list-group list-flush'>
          <li className='list-group-item'>
            <b>Alter ego:</b>
            {alter_ego}
          </li>
          <li className='list-group-item'>
            <b>Publisher:</b>
            {publisher}
          </li>
          <li className='list-group-item'>
            <b>First Appearence:</b>
            {first_appearance}
          </li>
        </ul>

        <h5> Characters</h5>
        <p>{characters}</p>

        <button className='btn btn-outline-primary' onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  );
};
