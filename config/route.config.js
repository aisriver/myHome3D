export default [
  {
    path: '/',
    routes: [
      { path: '/', component: './home' },
      { path: '*', component: './404' },
    ],
  },
];
