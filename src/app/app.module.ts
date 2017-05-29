import uiRouter from '@uirouter/angularjs';
import * as angular from 'angular';

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
