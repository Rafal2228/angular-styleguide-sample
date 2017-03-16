import angular from 'angular';
import uiRouter from 'angular-ui-router';

// App
import AppComponent from './app.component';
import Components from './components';
import Common from './common';

import States from './app.states';

const app = angular
    .module('app', [
        uiRouter,
        Components,
        Common
    ])
    .component('app', AppComponent)
    .config(States)
    .name;

export default app;
