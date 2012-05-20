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

test('entry-relative', function (t) {
    t.plan(1);
    
    var src = browserify.bundle(__dirname + '/entry-relative/main.js');
    
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
        [ 'path', '/sub/one.js', '/main.js' ].sort()
    );
});
