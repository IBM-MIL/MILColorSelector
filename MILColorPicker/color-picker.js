/*
 *  Licensed Materials - Property of IBM
 *  © Copyright IBM Corporation 2015. All Rights Reserved.
 */

/**
 *  @namespace MILColorPicker
 *  @description Defines the {@linkcode MILColorPicker} module, which includes the colorPicker directive.
 *  @author Jim Avery
 *  @copyright © 2015 IBM Corporation. All Rights Reserved.
 */

var angular;

(function () {
    'use strict';

    var MILColorPicker = angular.module('MILColorPicker', []);

    /**
     *  @class MILColorPicker.colorPicker
     *  @memberOf MILColorPicker
     *  @description A directive that defines a color picker, which displays a variety of colors as selectable buttons. The directive
     *  includes a hidden input, allowing for the current selection to be included in an HTML form. The name of the input is a directive
     *  attribute; the value is the "color" field of the current selection.
     *  This directive is decorated with four attributes: {@linkcode name} is the name of the hidden input where an HTML form can access
     *  the data from this directive. {@linkcode colorText} is the text that will be displayed before the currently selected color
     *  (usually just "Color"). {@linkcode colorOptions} is an array of objects with color names and hex values. {@linkcode colorPicked}
     *  is an optional external function that will be triggered whenever a color is clicked; it should take in a single color object
     *  as a parameter.
     *  @example
     *  <color-picker name="myColor" color-text="Color" color-options="[{color: 'Red', hexColor: '#F00'}]" color-picked="func(color)"></color-picker>
     *  @author James Avery
     *  @copyright © 2015 IBM Corporation. All Rights Reserved.
     */

    MILColorPicker.directive('colorPicker', function () {

        return {

            restrict: 'E',

            scope: {
                name: '@',
                colorText: '@',
                colorOptions: '=',
                colorPicked: '&'
            },

            template: "<style>.color-pick-box {width: 25px;height: 25px;padding: 3px;border: 1px;border-style: solid;border-color: #888888;margin: 0px auto;background-color: white;z-index: 10;float: left;position: relative;}.color-pick-box-inner {content: '';display: block;border: 1px;border-style: solid;border-color: #DDD;position: absolute;top: 3px;bottom: 3px;left: 3px;right: 3px;z-index: -1;}</style><div ng-if='finalColors.length > 0'><input type='hidden' name='{{name}}' value='{{currentColor.color}}'><p class='color-picker-text' style='margin-bottom: 10px'>{{colorText}}: {{currentColor.color}}</p> <div ng-repeat-start='pick in finalColors' class='color-pick-box' ng-if='currentColor.hexColor == pick.hexColor' ng-click='changeColor($index)'><div class='color-pick-box-inner' style='background-color: {{pick.hexColor}}'></div></div><div ng-repeat-end class='color-pick-box' style='border-color: #ffffff;' ng-if='currentColor.hexColor != pick.hexColor' ng-click='changeColor($index)'><div class='color-pick-box-inner' style='background-color: {{pick.hexColor}}'></div></div></div>",

            link: function (scope, element, attrs) {

                scope.currentElem = 0;

                /* Since we're using two-way binding, we need to encase everything in a watch function. */
                scope.$watch('colorOptions', function () {
                    scope.finalColors = [];

                    /* A function to change the selected color. */
                    scope.changeColor = function (colorIndex) {
                        scope.currentElem = colorIndex;
                        scope.currentColor = scope.colorOptions[scope.currentElem];
                        if (scope.colorPicked !== null && scope.colorPicked !== undefined) {
                            scope.colorPicked({
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

                    /* Sanitize the provided color array before doing anything else. */
                    if (scope.colorOptions !== undefined && scope.colorOptions !== null && scope.colorOptions.constructor === Array && scope.colorOptions.length > 0) {
                        scope.finalColors = scope.cleanColors(scope.colorOptions);
                    }

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