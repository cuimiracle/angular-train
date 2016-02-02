'use strict';

angular.module('host').config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider.
		state('host', {
			url: '/host',
			templateUrl: 'host/host.html',
			controller: 'hostCtrl'
		});
	}]);