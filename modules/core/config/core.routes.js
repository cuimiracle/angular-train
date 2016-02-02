'use strict';

angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'core/home.html',
			controller: function ($scope, $http, $state, $rootScope) {
				$scope.dataList = {
					list: [],
					total: undefined
				};
				$scope.selectedList = []; // 选中元素列表
				$scope.currentPage = 1; // 当前页数
				$scope.query = { // 搜索
					date: new Date()
				};

				// 获取数据
				function getData() {
					var params = angular.extend({}, $scope.query, {
						limit: 10,
						offset: ($scope.currentPage - 1) * 10
					});
					$http.get('../data.json', {params: params}).then(function (res) {
						$scope.dataList = {
							list: res.data.param.list,
							total: res.data.param.totalCount
						};
					});
				}
				getData();

				// 切换页数
				$scope.pageChanged = function () {
					getData();
				};

				// 搜索
				$scope.search = function () {
					$scope.currentPage = 1;
					getData();
				};

				// 全选
				$scope.$watch('selectAll', function (all) {
					var len = $scope.dataList.list.length;
					while(len > 0) {
						$scope.dataList.list[len - 1].selected = all ? true : false;
						len--;
					}
					$scope.selectedList = all ? angular.copy($scope.dataList.list) : [];
				});

				// 单独选择元素
				$scope.selectItem = function (item) {
					if (item.selected) {
						$scope.selectedList.push(item);
					} else {
						$scope.selectedList.splice($scope.selectedList.indexOf(item), 1);
					}
					console.log($scope.selectedList);
				};
			}
		});
	}
]);