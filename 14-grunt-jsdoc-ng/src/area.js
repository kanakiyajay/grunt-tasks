"use strict";
/**
 * @constructor
 */
function Area(width, height) {

	/**
	 * Width of the area
	 * @type {int}
	 */
	this.width = width;

	/**
	 * Height of the area
	 * @type {int}
	 */
	this.height = height;

	/**
	 * Returns the width of the area
	 * @return {int}      the width of the area
	 */
	this.getWidth = function() {
		return this.width;
	};

	/**
	 * Returns the height of the area
	 * @return {int}      the height of the area
	 */
	this.getHeight = function() {
		return this.height;
	};

	/**
	 * Returns the 2D area of the object
	 * @return {int} height x width
	 */
	this.getTotalArea = function() {
		return this.height * this.width;
	};

	/**
	 * Returns whether height or width is greater
	 * @return {string}
	 */
	this.getGreater = function() {
		var greater = this.height > this.width ? "height" : "width";
		return greater;
	};

	/**
	 * Changes the Height of the area
	 * @param {int} ht new height
	 */
	this.setHeight = function(ht) {
		this.height = ht;
		return ht;
	};

	/**
	 * Changes the Width of the area
	 * @param {int} wd new width
	 */
	this.setWidth = function(wd) {
		this.width = wd;
		return wd;
	};
}