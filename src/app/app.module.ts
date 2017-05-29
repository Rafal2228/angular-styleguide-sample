import * as angular from 'angular';
import uiRouter from 'angular-ui-router';

import AppComponent from './app.component';

const app = angular
  .module('app', [
    uiRouter
  ])
  .component('app', AppComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise(($injector) => {
      return '/';
    });

    $stateProvider
      .state({
        name: 'app',
        url: '',
        component: 'app'
      });
  })
  .name;

export default app;
