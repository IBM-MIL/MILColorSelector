/*
 *  Licensed Materials - Property of IBM
 *  © Copyright IBM Corporation 2015. All Rights Reserved.
 */

/**
 *  @namespace MILColorSelector
 *  @description Defines the {@linkcode MILColorSelector} module, which includes the colorSelector directive.
 *  @author Jim Avery
 *  @copyright © 2015 IBM Corporation. All Rights Reserved.
 */

var angular;

(function () {
    'use strict';

    var MILColorSelector = angular.module('MILColorSelector', []);

    /**
     *  @class MILColorSelector.colorSelector
     *  @memberOf MILColorSelector
     *  @description A directive that defines a color selector, which displays a variety of colors as selectable buttons. The directive
     *  includes a hidden input, allowing for the current selection to be included in an HTML form. The name of the input is a directive
     *  attribute; the value is the "color" field of the current selection.
     *  This directive is decorated with four attributes: {@linkcode name} is the name of the hidden input where an HTML form can access
     *  the data from this directive. {@linkcode colorText} is the text that will be displayed before the currently selected color
     *  (usually just "Color"). {@linkcode colorOptions} is an array of objects with color names and hex values. {@linkcode colorSelected}
     *  is an optional external function that will be triggered whenever a color is clicked; it should take in a single color object
     *  as a parameter.
     *  @example
     *  <color-selector name="myColor" color-text="Color" color-options="[{color: 'Red', hexColor: '#F00'}]" color-selected="func(color)"></color-selector>
     *  @author James Avery
     *  @copyright © 2015 IBM Corporation. All Rights Reserved.
     */

    MILColorSelector.directive('colorSelector', function () {

        return {

            restrict: 'E',

            scope: {
                name: '@',
                colorText: '@',
                colorOptions: '=',
                colorSelected: '&'
            },

            template: "<style>.color-select-box {width: 25px;height: 25px;padding: 3px;border: 1px;border-style: solid;border-color: #888888;margin: 0px auto;background-color: white;z-index: 10;float: left;position: relative;}.color-select-box-inner {content: '';display: block;border: 1px;border-style: solid;border-color: #DDD;position: absolute;top: 3px;bottom: 3px;left: 3px;right: 3px;z-index: -1;}</style><div ng-if='finalColors.length > 0'><input type='hidden' name='{{name}}' value='{{currentColor.color}}'><p class='color-selector-text' style='margin-bottom: 10px'>{{colorText}}: {{currentColor.color}}</p> <div ng-repeat-start='pick in finalColors' class='color-select-box' ng-if='currentColor.hexColor == pick.hexColor' ng-click='changeColor($index)'><div class='color-select-box-inner' style='background-color: {{pick.hexColor}}'></div></div><div ng-repeat-end class='color-select-box' style='border-color: #ffffff;' ng-if='currentColor.hexColor != pick.hexColor' ng-click='changeColor($index)'><div class='color-select-box-inner' style='background-color: {{pick.hexColor}}'></div></div></div>",

            link: function (scope, element, attrs) {

                scope.currentElem = 0;

                /* Since we're using two-way binding, we need to encase everything in a watch function. */
                scope.$watch('colorOptions', function () {
                    scope.finalColors = [];

                    /* A function to change the selected color. */
                    scope.changeColor = function (colorIndex) {
                        scope.currentElem = colorIndex;
                        scope.currentColor = scope.colorOptions[scope.currentElem];
                        if (scope.colorSelected !== null && scope.colorSelected !== undefined) {
                            scope.colorSelected({
                                color: scope.currentColor
                            });
                        }
                    };

                    /* A function to sanitize the received color array. */
                    scope.cleanColors = function (colorArray) {
                        var retArray = [];
                        for (var i = 0; i < colorArray.length; i++) {
                            if ('color' in colorArray[i] && 'hexColor' in colorArray[i]) {
                                retArray.push(colorArray[i]);
                            }
                        }
                        return retArray;
                    };

                    console.log(String(scope.colorOptions.length));
                    /* Sanitize the provided color array before doing anything else. */
                    if (scope.colorOptions !== undefined && scope.colorOptions !== null && scope.colorOptions.constructor === Array && scope.colorOptions.length > 0) {
                        scope.finalColors = scope.cleanColors(scope.colorOptions);
                    }
                    console.log(String(scope.finalColors.length));

                    /* Initialize a selected color. */
                    if (scope.finalColors.length > 0) {
                        scope.currentColor = scope.finalColors[scope.currentElem];
                    } else {
                        scope.currentColor = {
                            color: "",
                            hexColor: "",
                            url: ""
                        };
                    }

                    /* Set the default colorText, if necessary. */
                    if (angular.isUndefined(scope.colorText)) {
                        scope.colorText = "Color";
                    }
                });

            }

        };

    });
}());