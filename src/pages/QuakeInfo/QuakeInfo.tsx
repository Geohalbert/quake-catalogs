import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { quakeAction } from '../../actions';
import { QuakeCard } from '../../components';
import { AppState, ThunkDispatch } from '../../types';
import styles from './styles.scss';

// Normal props for the component
type ownProps = {
  match: any;
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  ownProps;

// Export for unit testing
export const QuakeInfo = ({ match, quakeInfo, fetchQuakeIfNeeded }: Props) => {
  const { id } = match.params;

  useEffect(() => {
    fetchQuakeIfNeeded(id);
  }, [id]);

  const renderQuakeCard = () => {
    const quakeInfoById = quakeInfo[id];

    if (!quakeInfoById || quakeInfoById.readyStatus === 'request')
      return <p>Loading...</p>;

    if (quakeInfoById.readyStatus === 'failure')
      return <p>Oops, Failed to load info!</p>;

    return <QuakeCard info={quakeInfoById.info} />;
  };

  return (
    <div className={styles.QuakeInfo}>
      <Helmet title="Quake Info" />
      {renderQuakeCard()}
    </div>
  );
};

const mapStateToProps = ({ quakeInfo }: AppState) => ({ quakeInfo });

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  fetchQuakeIfNeeded: (id: string) => dispatch(quakeAction.fetchQuakeIfNeeded(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(QuakeInfo));
