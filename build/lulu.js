(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("_"));
	else if(typeof define === 'function' && define.amd)
		define(["_"], factory);
	else if(typeof exports === 'object')
		exports["lulu"] = factory(require("_"));
	else
		root["lulu"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(1);

	module.exports = function (game) {
		var self = {
			indAjust: 0,
			indPoint: 0,
			dat: null,
			newPoint: null
		};

		self["new"] = function () {
			if (self.dat) return;
			self.dat = new dat.GUI({ autoPlace: false });

			var div = document.createElement("div");
			div.style.position = "absolute";
			div.style.bottom = "20px";
			div.style.left = "10px";
			div.appendChild(self.dat.domElement);
			document.body.appendChild(div);

			return self.dat;
		};

		self.newFolder = function (name, options) {
			if (name === undefined) name = 'Folder';
			self["new"]();

			var defaults = {
				open: false
			};
			options = _.defaultsDeep({}, options, defaults);

			var folder = self.dat.addFolder(name);
			if (options.open) folder.open();

			return folder;
		};

		self.checkSubfolder = function (subfolder) {
			if (_.isString(subfolder)) {
				return self.dat.addFolder(subfolder);
			} else if (_.isObject(subfolder)) {
				return subfolder;
			} else {
				return self.dat;
			}
		};

		self.ajust = function (obj, options, subfolder) {
			self["new"]();
			var panel = self.checkSubfolder(subfolder);
			self.indAjust++;

			var defaults = {
				x: 0,
				y: 0,
				angle: true,
				listen: true,
				open: true,
				drag: false,
				scale: false,
				hide: {
					enable: false,
					visible: true
				}
			};
			options = _.defaultsDeep({}, options, defaults);

			if (options.drag) {
				if (!obj.inputEnabled) obj.inputEnabled = true;
				if (obj.input && obj.input.enableDrag) {
					options.listen = true;
					obj.input.enableDrag();
				}
			}

			var folder = panel.addFolder('Ajust Object ' + _.padStart(self.indAjust, 3, '0'));

			var x = folder.add(obj, 'x').step(1);
			var y = folder.add(obj, 'y').step(1);
			if (options.angle) {
				var angle = folder.add(obj, 'angle').step(1);
			}

			if (options.hide.enable) {
				folder.add(obj, 'visible');
				obj.visible = options.hide.visible;
			}

			if (options.scale) {
				var scaleFolder = folder.addFolder('scale');
				var scaleX = scaleFolder.add(obj.scale, 'x').step(0.05).onChange(function (val) {
					obj.scale.y = val;
				});
				// var scaleY = scaleFolder.add(obj.scale, 'y').step(1);
			}

			if (options.listen) {
				x.listen();
				y.listen();
				if (options.angle) angle.listen();
			}

			if (options.open) folder.open();
			return folder;
		};

		self.pointCreator = function () {
			if (self.newPoint) return;

			self.newPoint = true;

			self.dat.add({ New_Point: function New_Point() {
					self.pointer(game);
				} }, 'New_Point');
		};

		self.pointer = function (options, subfolder) {
			self["new"]();
			var panel = self.checkSubfolder(subfolder);
			self.pointCreator(game);
			self.indPoint++;

			var defaults = {
				x: 0,
				y: 0,
				size: 5,
				listen: true,
				color: 'FF0000',
				helper: {
					enable: true,
					size: 100,
					alpha: 0.25
				},
				open: true,
				drag: true,
				hide: {
					enable: false,
					visible: true
				}
			};
			options = _.defaultsDeep({}, options, defaults);

			var dotGroup = game.add.group();
			if (options.helper.enable) {
				var helper = dotGroup.add(game.add.graphics(0, 0).beginFill('0x000000').drawCircle(0, 0, options.helper.size));
				helper.alpha = options.helper.alpha;
			}

			var dot = dotGroup.add(game.add.graphics(0, 0).beginFill('0x' + options.color).drawCircle(0, 0, options.size));
			var sprite = game.add.sprite(options.x, options.y);
			sprite.addChild(dotGroup);

			if (options.drag) {
				if (!sprite.inputEnabled) sprite.inputEnabled = true;
				if (sprite.input && sprite.input.enableDrag) {
					options.listen = true;
					sprite.input.enableDrag();
				}
			}

			var folder = panel.addFolder('Point Finder ' + _.padStart(self.indPoint, 3, '0'));
			var x = folder.add(sprite, 'x').step(1);
			var y = folder.add(sprite, 'y').step(1);

			if (options.listen) {
				x.listen();
				y.listen();
			}

			if (options.hide.enable) {
				sprite.visible = options.hide.visible;
				folder.add(sprite, 'visible');
			}

			if (options.open) folder.open();

			return folder;
		};

		return self;
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;