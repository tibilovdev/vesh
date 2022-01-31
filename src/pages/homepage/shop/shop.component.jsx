import React from 'react';

import { Route } from 'react-router-dom';

import CollectionsOverview from '../../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../collection/collection.component';

// мы имеем доступ к match потому что в апп shope page находится в роуте
const ShopPage = ({ match }) => {
  console.log(match);
  // <Route exact path={`${match.path}`} component={CollectionsOverview} тут мы прописали match.path вместо /shop потому что в апп мы уже в паф прописали что роут равняется /shop, а он сидит как мы знаем в match.path и потом тупо match.path закинули в паф component={CollectionsOverview} и теперь мы можем легко переиспользовать этот компонент тк мы тут хардкодно не прписали в паф /shop. по факту компонент ShopPage это контейнер для  CollectionsOverview который определяет его паф.
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        component={CollectionPage}
      />
    </div>
  );
};

export default ShopPage;
