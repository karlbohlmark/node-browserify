var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

var setTimeout_ = function (cb, t) {
    if (!t) {
        process.nextTick(cb);
    }
    else {
        setTimeout(cb, t);
    }
};

console.log('debug break');

var src = browserify.bundle(__dirname + '/entry-require-parent/sub/main.js');

test('entry-require-parent', function (t) {
    t.plan(1);

    var src = browserify.bundle(__dirname + '/entry-require-parent/sub/main.js');
    
    var c = {
        setTimeout : process.nextTick,
        done : function (one) {
            t.equal(one, 1);
            t.end();
        }
    };
    vm.runInNewContext(src, c);
    



    t.deepEqual(
        Object.keys(c.require.modules).sort(),
        [ 'path', '/one.js', '/sub/main.js' ].sort()
    );
});
