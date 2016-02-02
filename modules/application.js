'use strict';

// 定义主模块和添加依赖模块
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)
    .config(function($httpProvider) {
        $httpProvider.defaults.transformRequest = function(data) {
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        };
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    })
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ])
    .config(['$httpProvider',
        function($httpProvider) {
            $httpProvider.interceptors.push(['$q',
                function($q) {
                    return {
                        // status < 300
                        response: function(response) {
                            var data = response.data;
                            // 统一处理result为false的情况
                            if (data.result && data.result == "false" && data.errormsg) {
                                alert('error');
                            }
                            return response;
                        },
                        // status >= 400
                        responseError: function(rejection) {
                            switch (rejection.status) {
                                // 401 Unauthorized: jump to login page
                                case 401:
                                    // location.pathname = ;
                                    break;
                                    // other Error
                                default:
                                    alert("error");
                            }

                            return $q.reject(rejection);
                        }
                    };
                }
            ]);
        }
    ])
    .config(function(datepickerConfig) {
        datepickerConfig.showWeeks = false;
    })
    .run(['$rootScope', '$state', function($rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.coll = true; // 侧边栏初始状态为打开
        $rootScope.refresh = function () { // 刷新页面
            $state.reload();
        };
    }]);

angular.element(document).ready(function() {
    if (window.location.hash === '#_=_') window.location.hash = '#!';
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});