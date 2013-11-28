var expect = require('chai').expect;

var BaseObject = require('../lib/object');

describe('BaseObject', function(){
    it('should exist', function(){
	expect(BaseObject).to.exist;
    });

    it('should be constructor', function(){
	expect(BaseObject).to.be.a('function');
    });

    it('should be an instance of \'Listener\'', function(){
	expect(new BaseObject()).to.be.an.instanceof(require('asteroids-listener'));
    });

    describe('object', function(){
	var base;

	beforeEach(function(){
	    base = new BaseObject();
	});

	['x', 'y', 'radius', 'position', 'orientation', 'tick'].forEach(function(methodName){
	    it('should respond to ' + methodName, function(){
		expect(base).to.respondTo(methodName);
	    });
	});
    })

    describe('interactions', function(){
	var base;

	beforeEach(function(){
	    base = new BaseObject();
	});

	it('should have a default \'x\'', function(){
	    expect(base.x()).to.equal(0);
	});

	it('should be able to set \'x\'', function(){
	    var value = 1;

	    base.x(value);

	    expect(base.x()).to.equal(value);
	});

	it('should have a default \'y\'', function(){
	    expect(base.y()).to.equal(0);
	});

	it('should be able to set \'y\'', function(){
	    var value = 1;

	    base.y(value);

	    expect(base.y()).to.equal(value);
	});

	it('should have a default \'position\'', function(){
	    var position = base.position();

	    expect(position).to.deep.equal({ 'x': 0, 'y': 0 });
	});

	it('should be able to set \'position\'', function(){
	    var value = { 'x': 1, 'y': 1 };

	    base.position(value);

	    expect(base.position()).to.deep.equal(value);
	});

	it('should be able partially update \'position\'', function(){
	    base.position({ x: 1 });
	    expect(base.position()).to.deep.equal({ x: 1, y: 0 });

	    base.position({ y: 1 });
	    expect(base.position()).to.deep.equal({ x: 1, y: 1 });
	});

	it('should have a default \'radius\'', function(){
	    expect(base.radius()).to.equal(1);
	});

	it('should be able to set \'radius\'', function(){
	    var value = 5;

	    base.radius(value);

	    expect(base.radius()).to.equal(value);
	});


	it('should have a default \'orientation\'', function(){
	    expect(base.orientation()).to.equal(0);
	});

	it('should be able to set \'orientation\'', function(){
	    var value = Math.PI/3;

	    base.orientation(value);

	    expect(base.orientation()).to.equal(value);
	});

	[
	    function(base){ base.x(1); },
	    function(base){ base.y(1); },
	    function(base){ base.position({ x: 1 }); },
	    function(base){ base.position({ y: 1 }); },
	    function(base){ base.position({ x: 1, y: 1 }); }
	].forEach(function(mutator){
	    it('should notify upon changes', function(done){
		base.addListener('position', function(){ done(); });

		mutator(base);
	    });
	});
    });
});
