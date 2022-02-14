import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';
// WithSpinner это HOC. который в аргумент WrappedComponent принимает другой реактовский компонент. isLoading, ...otherProps это пропсы WrappedComponent которые прошли вниз по иерархии к спинеру.
const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    console.log(otherProps);
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};
export default WithSpinner;
