const Deferred = require('jquery-deferred').Deferred;

let utils = {
    
    chunkedForEach: function(array, fn, context) {
        context             = context || window;
        var maxTimePerChunk = 100;
        var index           = 0;
        var def = Deferred();

        function now() {
            return new Date().getTime();
        }

        function doChunk() {
            var startTime = now();
            while (index < array.length && (now() - startTime) <= maxTimePerChunk) {
                fn.call(context, array[index], index, array);
                ++index;
            }
            if (index < array.length) {
                setTimeout(doChunk, 0);
            } else {
                def.resolve();
            }
        }

        doChunk();

        return def.promise();
    }
};

module.exports = utils;