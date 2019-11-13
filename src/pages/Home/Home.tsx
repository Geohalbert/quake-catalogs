import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { quakesAction } from '../../actions';
import { QuakeList } from '../../components';
import { AppState, ThunkDispatch } from '../../types';
import styles from './styles.scss';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

// Export for unit testing
export const Home = ({ readyStatus, list, fetchQuakesIfNeeded }: Props) => {
  useEffect(() => {
    fetchQuakesIfNeeded();
  }, []);

  const renderQuakeList = () => {
    if (!readyStatus || readyStatus === 'invalid' || readyStatus === 'request')
      return <p>Loading...</p>;

    if (readyStatus === 'failure') return <p>Oops, Failed to load list!</p>;

    return <QuakeList list={list} />;
  };

  return (
    <div className={styles.Home}>
      <Helmet title="Home" />
      {renderQuakeList()}
    </div>
  );
};

const mapStateToProps = ({ home: { readyStatus, list } }: AppState) => ({
  readyStatus,
  list
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  fetchQuakesIfNeeded: () => dispatch(quakesAction.fetchQuakesIfNeeded())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Home));
