var Listener = require('asteroids-listener');

var BaseObject = module.exports = function(){
    Listener.call(this);
    this._x = 0;
    this._y = 0;
};
BaseObject.prototype = new Listener();
BaseObject.prototype.position = function(position){
    if (position){
	var oldX = this._x;
	var oldY = this._y;
	this._x = position.x || oldX;
	this._y = position.y || oldY;
	this.notifyOnChange(oldX, oldY);
    }
    return { 'x': this._x, 'y': this._y };
}
BaseObject.prototype.x = function(value){
    var position = this.position({ x: value });
    return position.x;
}
BaseObject.prototype.y = function(value){
    var position = this.position({ y: value });
    return position.y;
}
BaseObject.prototype.notifyOnChange = function(oldX, oldY) {
    if (oldX != this._x || oldY != this._y) {
	this.notifyOf('position');
    }
}
