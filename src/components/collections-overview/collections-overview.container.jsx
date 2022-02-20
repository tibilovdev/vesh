import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from './../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

// т.к мы mapStateToProps-ом врапим WithSpinner(CollectionsOverview), то isLoading является автоматом пропсом для WithSpinner(CollectionsOverview) (мы вручную не прописываем пропсы) а даем мы название isLoading т.к НОС withSpiner ожидает пропс с именем isLoading
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});
//191
// const CollectionsOverviewContainer = connect(mapStateToProps)(
//   WithSpinner(CollectionsOverview)
// );
// это то же самое. справо налево
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
