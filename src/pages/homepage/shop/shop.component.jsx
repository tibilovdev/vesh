import React from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../../firebase/firebase.utils';
import { updateCollections } from '../../../redux/shop/shop.actions';

import WithSpinner from '../../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../collection/collection.component';

//мы кидаем наши компоненты в HOC (конкретно этот НОС нужен для того чтобы у нас приложение не рушилось пока данные с сервера не зафетчились. и на это время мы показываем спинер)
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// мы имеем доступ к match потому что в апп shope page находится в роуте
class ShopPage extends React.Component {
  state = { loading: true };

  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    //так мы вытаскиваем collections (shop данные) из firebase
    // const collectionRef = firestore.collection('collections')
    // collectionRef.onSnapshot(async (snapshot)
    const collectionRef = firestore.collection('collections');
    // collectionRef.get().then((snapshot) это способ вытаскивания данных из файрстора с помощью промисов
    collectionRef.get().then((snapshot) => {
      // эта функция приводит данные вытащенные из файрстор в тот вид который нам нужен.(дополняет routeName для реактроутера )
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      //console.log(collectionsMap);
      // тут мы обновляем наш редукс стор даннымми из файрбейса
      updateCollections(collectionsMap);
      // тут как данные с сервера прогрузятся мы засетим стейт на фалс, это нужно для HOC CollectionsOverviewWithSpinner
      this.setState({ loading: false });
    });
  }

  // <Route exact path={`${match.path}`} component={CollectionsOverview} тут мы прописали match.path вместо /shop потому что в апп мы уже в паф прописали что роут равняется /shop, а он сидит как мы знаем в match.path и потом тупо match.path закинули в паф component={CollectionsOverview} и теперь мы можем легко переиспользовать этот компонент тк мы тут хардкодно не прписали в паф /shop. по факту компонент ShopPage это контейнер для  CollectionsOverview который определяет его паф.
  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            // мы переадаем булевый стейт лоудинг и исходя из него в HOC  будет выодится либо спинер либо наш врапнутый компонент. ...props это пропсы  react routera
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
