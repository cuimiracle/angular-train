"use strict";

angular.module('host').controller('hostCtrl', ['$scope', '$http', '$modal', 'Del',
	function($scope, $http, $modal, Del) {
		$scope.dataList = {
			list: [],
			total: undefined
		};
		$scope.selectedList = []; // 选中元素列表
		$scope.currentPage = 1; // 当前页数
		$scope.query = { // 搜索
			keywords: ""
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

		// 监控选中元素列表
		$scope.$watch('selectedList', function (list) {
			var len = list.length;
			if (len < 1) {
				$scope.deleteBtn = false;
			} else if (len === 1) {
				$scope.deleteBtn = true;
			} else {
				$scope.deleteBtn = false;
			}
		}, true);

		/**
		 * 创建
		 */
		$scope.create = function () {

		};

		/**
		 * 删除
		 */
		$scope.del = function () {
			var id = $scope.selectedList[0].id;
			Del.openDelModal("删除云主机", function () {
				// ajax del host
				console.log('del host', id);
			});
		};

		/**
		 * 详情
		 * @param {Object} item
		 */
		$scope.detail = function (item) {
			var id = item.id;
			var modalInstance = $modal.open({
				templateUrl: 'host/host.detail.html',
				controller: function ($scope, $modalInstance) {
					// ajax get detail
					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				}
			})
		};
	}]);