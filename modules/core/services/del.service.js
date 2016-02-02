'use strict';

/**
 * 删除操作
 */
angular.module('core').service('Del', ['$modal',
    function($modal) {
        var modalTemp = '<div class="yo-modal"><div class="modal-header">' +
                            '<h4 class="modal-title">{{title}}<a href="javascript:;" class="pull-right glyphicon glyphicon-remove" ng-click="cancel()"></a></h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<h4 class="text-center">是否确认删除？</h4>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button class="btn btn-default" ng-click="cancel()">取消</button>' +
                            '<button class="btn btn-warning" ng-click="ok()">确认</button>' +
                        '</div></div>';
        /**
         * 打开删除弹窗
         * @param {String} title 弹窗标题
         * @param {Function} callback 确认弹窗后的操作函数
         */
        this.openDelModal = function (title, callback) {
            var modalInstance = $modal.open({
                template: modalTemp,
                size: 'sm',
                controller: function ($scope, $modalInstance) {
                    $scope.title = title;
                    $scope.ok = function () {
                        $modalInstance.close();
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }
            });

            modalInstance.result.then(callback);
        }   
    }]);