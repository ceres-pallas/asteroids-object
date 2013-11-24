var Listener = require('asteroids-listener');
var different = require('asteroids-different')(0.0001);

var BaseObject = module.exports = function(){
    Listener.call(this);
    this._x = 0;
    this._y = 0;
    this._radius = 1;
};
BaseObject.prototype = new Listener();
BaseObject.prototype.position = function(position){
    if (position){
	var oldX = this._x;
	var oldY = this._y;
	this._x = position.x || oldX;
	this._y = position.y || oldY;
	if(different(oldX, this._x) || different(oldY, this._y)) {
	    this.notifyOf('position');
	}
    }
    return { 'x': this._x, 'y': this._y };
}
BaseObject.prototype.x = function(value){
    if (value) {
	this.position({ x: value });
    }
    return this._x;
}
BaseObject.prototype.y = function(value){
    if (value) {
	this.position({ y: value });
    }
    return this._y;
}
BaseObject.prototype.radius = function(value){
    if (value) {
	this._radius = value;
    }
    return this._radius;
}
BaseObject.prototype.tick = function(){
    /* do nothing */
}
