import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { DcScreen } from '../dc/DcScreen';
import { HeroesScreen } from '../heroes/HeroesScreen';
import { MarvelScreen } from '../marvel/MarvelScreen';
import { SearchScreen } from '../search/SearchScreen';
import { Navbar } from '../ui/NavBar';

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className='container mt-2'>
        <Switch>
          <Route exact path='/marvel' component={MarvelScreen} />
          <Route exact path='/hero/:heroId' component={HeroesScreen} />
          <Route exact path='/dc' component={DcScreen} />
          <Route exact path='/search' component={SearchScreen} />

          <Redirect to='/marvel' />
        </Switch>
      </div>
    </>
  );
};
