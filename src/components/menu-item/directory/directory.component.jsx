import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../../redux/directory/directory.selectors';

import './directory.styles.scss';
import MenuItem from '../menu-item.component';

const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {sections.map(({ title, id, imageUrl, size, linkUrl }) => (
        <MenuItem
          key={id}
          title={title.toUpperCase()}
          imageUrl={imageUrl}
          size={size}
          linkUrl={linkUrl}
        />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
