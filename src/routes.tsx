import { quakesAction, quakeAction } from './actions';
import App from './app';
import { asyncHome, asyncQuakeInfo, NotFound } from './pages';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncHome, // Add your route here
        loadData: () => [
          quakesAction.fetchQuakesIfNeeded()
          // Add other pre-fetched actions here
        ]
      },
      {
        path: '/QuakeInfo/:id',
        component: asyncQuakeInfo,
        loadData: ({ params }: { params: { id: string } }) => [
          quakeAction.fetchQuakeIfNeeded(params.id)
        ]
      },
      {
        component: NotFound
      }
    ]
  }
];
