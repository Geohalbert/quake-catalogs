/*
 * Due to this known issue: https://github.com/smooth-code/loadable-components/issues/173
 * Use .js extension for code-splitting file
 */

import React from 'react';
import loadable from '@loadable/component';

import { Loading, ErrorBoundary } from '../../components';

const QuakeInfo = loadable(() => import('./QuakeInfo'), {
  fallback: <Loading />
});

export default props => (
  <ErrorBoundary>
    <QuakeInfo {...props} />
  </ErrorBoundary>
);
