import React from 'react';
import DefaultLayout from '../Containers';

const Login = React.lazy(() => import('../Components/FormikForm'));
const Home = React.lazy(() => import('../Components/Home'));

const routes = [
  { path: '/', name: 'Main', component: DefaultLayout, exact: true },
  { path: '/login', name: 'Login', component: Login, exact: true },
  { path: '/home', name: 'Home', component: Home, exact: true, isPrivate: true }
];

export default routes;
