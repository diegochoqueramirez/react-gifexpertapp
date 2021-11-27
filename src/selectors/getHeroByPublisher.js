import { heroes } from '../data/heroes';

export const getHeroByPublisher = (publisher) => {
  const validation = ['DC Comics', 'Marvel Comics'];

  if (!validation.includes(publisher)) {
    throw new Error(`No se encontro el "${publisher}"`);
  }

  return heroes.filter((hero) => hero.publisher === publisher);
};
