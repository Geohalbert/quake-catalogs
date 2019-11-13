import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

type Props = {
  list: Array<{ id: string; name: string }>;
};

export default memo(({ list }: Props) => (
  <div className={styles.QuakeList}>
    <h4>Quake List</h4>
    <ul>
      {list.map(({ id, name }) => (
        <li key={id}>
          <Link to={`/QuakeInfo/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  </div>
));
