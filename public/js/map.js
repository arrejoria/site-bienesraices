/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nconsole.log(\"Map Scripts Initialized\");\r\n\r\n(function () {\r\n\r\n  const lat = document.querySelector('input[name=\"lat\"]').value || -34.6037 ,\r\n    lng = document.querySelector('input[name=\"lng\"]').value || -58.3816,\r\n    map = L.map(\"map\").setView([lat, lng], 12);\r\n  let marker;\r\n\r\n  //Utilize Provider and Geocoder\r\n  const geocodeService = L.esri.Geocoding.geocodeService();\r\n\r\n  L.tileLayer(\"https://tile.openstreetmap.org/{z}/{x}/{y}.png\", {\r\n    maxZoom: 19,\r\n    attribution:\r\n      '&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>',\r\n  }).addTo(map);\r\n\r\n  // Add Pin in map\r\n  marker = new L.marker([lat, lng], {\r\n    draggable: true,\r\n    autoPan: true,\r\n  }).addTo(map);\r\n\r\n  // Listen to pin movement on map\r\n  marker.on(\"moveend\", function (e) {\r\n    marker = e.target;\r\n    const position = marker.getLatLng();\r\n    map.panTo(new L.latLng(position.lat, position.lng));\r\n\r\n    // Get Streets information when the pin is released\r\n    geocodeService\r\n      .reverse()\r\n      .latlng(position, 13)\r\n      .run(function (error, result) {\r\n        marker.bindPopup(result.address.LongLabel);\r\n        // Set fields\r\n        document.querySelector(\".street\").textContent =\r\n          `${result?.address?.Address}` ?? 0;\r\n        document.querySelector(\"#street\").value =\r\n          `${result?.address?.Address}` ?? 0;\r\n        document.querySelector(\"#lat\").value = `${result?.latlng?.lat}` ?? 0;\r\n        document.querySelector(\"#lng\").value = `${result?.latlng?.lng}` ?? 0;\r\n      });\r\n  });\r\n})();\r\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;