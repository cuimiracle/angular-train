'use strict';

/**
 * usage:
 * <yodatepicker date="date" max-date="maxDate" format="{{format}}"></yodatepicker>
 */

angular.module('core')
.directive('yodatepicker', function($timeout){
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			date: '=',
			maxDate: '=',
			minDate: '=',
			format: '@',
			disabled: '@',
			mychange: '=change',
			searchEnabled: '='
		},
		template: '<div class="input-group">' +
					'<input type="text" class="form-control" ' +
						'datepicker-popup="{{format}}" ' +
						'ng-model="date" ' +
						'is-open="opened" ' +
						'max-date="maxDate" ' +
						'min-date="minDate" ' +
						'ng-disabled="{{disabled}}" ' +
						'current-text="今天" ' +
						'clear-text="清除" ' +
						'close-text="关闭" ' +
						'ng-change="change()"' +
					' />' +
					'<span class="input-group-btn">' +
						'<button type="button" class="btn btn-default"' +
							'ng-click="open($event)" ng-disabled="searchEnabled">' +
						'<i class="glyphicon glyphicon-calendar"></i>' +
						'</button>' +
					'</span>' +
				'</div>',
		link: function(scope, element, attrs){
			scope.format = scope.format || "yyyy-MM-dd";
			scope.open = function($event){
				$event.preventDefault();
				$event.stopPropagation();

				scope.opened = true;
			};

			scope.change = function () {
				$timeout(function () {
					scope.mychange && scope.mychange();
				}, 0);
			};
		}
	};
});