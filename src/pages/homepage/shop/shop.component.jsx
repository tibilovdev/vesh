import React from 'react';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../../redux/shop/shop.actions';
import CollectionsOverviewContainer from '../../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../../collection/collection.container';

//мы кидаем наши компоненты в HOC (конкретно этот НОС нужен для того чтобы у нас приложение не рушилось пока данные с сервера не зафетчились. и на это время мы показываем спинер)

// мы имеем доступ к match потому что в апп shope page находится в роуте
class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  // <Route exact path={`${match.path}`} component={CollectionsOverview} тут мы прописали match.path вместо /shop потому что в апп мы уже в паф прописали что роут равняется /shop, а он сидит как мы знаем в match.path и потом тупо match.path закинули в паф component={CollectionsOverviewContainer} и теперь мы можем легко переиспользовать этот компонент тк мы тут хардкодно не прписали в паф /shop. по факту компонент ShopPage это контейнер для  CollectionsOverviewContainer который определяет его паф.
  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
