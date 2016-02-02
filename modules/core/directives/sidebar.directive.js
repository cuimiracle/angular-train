'use strict';
/**
 * 侧边栏收缩
 */
angular.module('core').directive('sideCollapse', function () {
    return {
        restrict: 'EA',
        scope: {
            close: '='
        },
        link: function (scope, ele, attr) {
            var sideObj = angular.element('.sidebar'),
                subObj = angular.element('.sub-nav a'),
                rightObj = angular.element('.right-content'),
                wordObj = sideObj.find('span'),
                leftWidth = sideObj.width(),
                marLeft = parseInt(rightObj.css('marginLeft')),
                subLeft = parseInt(subObj.css('paddingLeft'));
            var anim = function () {
                // console.log(sideObj, rightObj);
                if (scope.close) {
                    wordObj.hide();
                    sideObj.stop(false, true).animate({
                        width: 60
                    }, 300);
                    rightObj.stop(false, true).animate({
                        marginLeft: 60
                    }, 500);
                    subObj.stop(false, true).animate({
                        paddingLeft: 0,
                        fontSize: 12
                    }, 200).css('text-align', 'center');
                } else {
                    sideObj.stop(false, true).animate({
                        width: leftWidth
                    }, 200);
                    wordObj.delay(300).stop(false, true).fadeIn(300);
                    rightObj.stop(false, true).animate({
                        marginLeft: marLeft
                    }, 300);
                    subObj.stop(false, true).animate({
                        paddingLeft: subLeft,
                        fontSize: 14
                    }, 200).css('text-align', 'left');
                }
                scope.close = !scope.close;
                scope.$apply();
            };

            angular.element(ele).on('click', function () {
                anim();
            });
        }
    };
});

/**
 * 链接提示框 // 默认上边
 * direc -> 方向  top | right
 * useage: <a tips message="这是个链接" color="#fff" bg-color="#333" href="#">链接</a>
 */
angular.module('core').directive('tips', function () {
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            message: '@', // 提示信息
            color: '@', // 提示字体颜色
            bgColor: '@', // 提示框背景色
            direc: '@', // 方向 top(默认) | right  目前只有两个方向
            close: '=' // 是否需要关闭功能 true | false
        },
        link: function (scope, ele, attrs) {
            var linkObj = angular.element(ele),
                objWidth,
                objHeight,
                objOHeight,
                bgColor = scope.bgColor ? scope.bgColor : '#1b242f',
                tipObj = jQuery('<div/>').css({
                    'display': 'none',
                    'backgroundColor': bgColor,
                    'padding': '5px 10px',
                    'whiteSpace': 'nowrap',
                    'lineHeight': '24px',
                    'position': 'absolute',
                    'zIndex': 100,
                    'color': scope.color ? scope.color : '#fff'
                }).addClass('tips').text(scope.message),
                arrowObj = jQuery('<i/>').css({
                    'display': 'block',
                    'width': 0,
                    'height': 0,
                    'border': '6px solid transparent',
                    'position': 'absolute'
                });
            var arrowObjHeight = arrowObj.height(),
                arrowObjWidth = arrowObj.outerWidth();
                
            if (linkObj.css('position') !== 'relative') {
                linkObj.css('position', 'relative');
            }
            if (!linkObj.find('.tips').length) {
                tipObj.appendTo(linkObj);
                arrowObj.appendTo(tipObj);
            }
            // console.log(tipObj.height());
            var tipObjHeight = tipObj.height(),
                tipObjWidth = tipObj.width(),
                tipObOjWidth = tipObj.outerWidth(),
                tipObjOHeight = tipObj.outerHeight();
            function compareHeight(tipH, objH) {
                if (tipH > objH) {
                    return - Math.abs(tipH - objH)/2;
                } else {
                    return Math.abs(tipH - objH)/2;
                }
            }
            linkObj.on('mouseover', function () {
                // console.log(scope);
                // console.log(linkObj, linkObj.length);
                if (scope.close) return;

                objWidth = linkObj.width();
                objHeight = linkObj.height();
                objOHeight = linkObj.outerHeight();
                tipObj.width(tipObjWidth);
                if (scope.direc === "right") { // right显示
                    arrowObj.css('border-top-color', 'transparent');
                    arrowObj.css('border-right-color', bgColor);

                    tipObj.css({
                        // 'top': compareHeight(tipObjOHeight, objOHeight),
                        'top': 5.5,
                        'left': objWidth + 10
                    });
                    // console.log(arrowObj, tipObjHeight, arrowObjHeight, arrowObjWidth);
                    arrowObj.css({
                        'top': (tipObjHeight - arrowObjHeight)/2,
                        'left': - arrowObjWidth
                    });

                } else { // top显示
                    arrowObj.css('border-right-color', 'transparent');
                    arrowObj.css('border-top-color', bgColor);
                    tipObj.css({
                        'top': - tipObjHeight - 18,
                        'left': - (tipObOjWidth - objWidth) / 2
                    });
                    arrowObj.css({
                        'top': tipObjOHeight,
                        'left': (tipObOjWidth - arrowObj.outerWidth()) / 2
                    });
                }

                jQuery(this).find('.tips').show();
            }).on('mouseout', function () {
                if (scope.close) return;
                jQuery(this).find('.tips').hide();
            });

        }
    };
});
