export default function($stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise(function($injector) {
    return '/';
  });

  $stateProvider
  .state({
    name: 'app',
    url: '',
    component: 'app'
  });

}
