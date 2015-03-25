MILColorSelector
==============

<p align="center">
<img src="mil-color-selector.gif" alt="Animation" border=1 /></p>

MILColorSelector is a reusable UI component written as an AngularJS directive, which defines a __color selector__ HTML element. The color selector creates a simple and intuitive visual interface, allowing users to easily view and select colors, and can be easily incorporated into a standard HTML form.

## Installation

Include the .js file in the `head` of the HTML file where the AngularJS controller is being applied.

```html
<script src="[path to file]/color-selector.js"></script>
```

Also include the `MILColorSelector` module as a dependency when defining your AngularJS module.

```js
angular.module('myModule', ['MILColorSelector']);
```

## Usage

The color selector can be inserted into an HTML document as in the example below:

```html
<color-selector name="myColor" color-text="Color" color-options="[{color: 'Red', hexColor: '#F00'},{color: 'Blue', hexColor: '#00F'}]" color-selected="func(color)" />
```

* `name` - This optional parameter attaches a name to the color selector so its data can be used in a standard HTML form. The associated `value` is the `color` element of whatever color has been chosen by the user. In the above example, the possible values are `Red` or `Blue`.
* `color-text` - This optional parameter indicates the text to appear in place of "Color" before the selected color's name is displayed. If no value is specified, "Color" will be used.
* `color-options` - This parameter is an array of objects that represent the possible color options for the selector. Each object has two required fields, though additional fields can be included:
  * `color` - The name of the color. This will appear after "Color: " or whatever `color-text` is specified.
  * `hexColor` - The hex value of the color. This is the color that will appear inside the box corresponding to this color object. Note that each color is surrounded by a light-gray border, so near-white colors can be more easily seen.
  
  If any of the color objects are invalid, they will not be displayed. If there are no valid color objects, the color selector will not display in any way.
* `color-selected` - This optional parameter specifies an external function that will be executed whenever the user clicks on a color. Any such function should take in only one parameter, which is the color object corresponding to the selected color.

The color selector can be styled by making changes to the class `color-selector-text` for the text, or to `color-select-box` for the color boxes. Note that if you wish to change the inner border color for a color box, the operative class is `color-select-box-inner`.

## Requirements

`MILColorSelector` is designed to work with AngularJS 1.3. It may work on older versions of AngularJS with little to no adjustment.

## Author

Created by [Jim Avery](https://github.com/TheSoundDefense) at the [IBM Mobile Innovation Lab](http://www-969.ibm.com/innovation/milab/)

## License

`MILColorSelector` is available under the Apache 2.0 license. See the LICENSE file for more info.