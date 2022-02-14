import React from 'react';

import { HomePageContainer } from './shop/homepage.styles';
import Directory from '../../components/menu-item/directory/directory.component';

const Homepage = () => {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};

export default Homepage;
