//TODO: have the cache drop expired items on an interval of some sort
//TODO: memory size?
//TODO: jshint and editorconfig (add them yo)

var cache = {}
    , isExpired = function (key) {
        var currentTime = new Date()
            , expired;

        if(cache[key].expires === Infinity){
            expired = false;
        } else {
            expired = !!(currentTime.getTime() >= cache[key].expires.getTime() || cache[key].expires === 0);
        }

        if(expired){
            //clear this item from cache
            delete cache[key];
        }

        return expired;
    }

    , getFromCache = function (key) {
        if(typeof cache[key] !== 'undefined' && !isExpired(key)){
            cache[key].uses++;

            return cache[key].data;
        } else {
            return null;
        }
    }

    , cacheEntries = function () {
        var obj = {};

        Object.keys(cache).forEach(function(item){
            obj[item] = {expires: cache[item].expires, uses: cache[item].uses};
        });

        return obj;
    }

    , clearCache = function (pruneThreshold) {
        if(typeof pruneThreshold !== 'undefined'){
            Object.keys(cache).forEach(function(item){
                if(cache[item].uses <= pruneThreshold && cache[item].expires !== Infinity){
                    delete cache[item];
                }
            });
        }else{
            cache = {};
        }
    }

    , pruneCache = function (threshold) {
        return clearCache(threshold);
    }

    , removeFromCache = function (key) {
        if(typeof key === 'undefined'){
            throw new Error('key must be passed in');
        }

        if(typeof cache[key] !== 'undefined'){
            return delete cache[key];
        }else {
            return false;
        }
    }

    , addToCache = function (key, object, expires) {
        cache[key] = {
            data: object
            , expires: 0
            , uses: 0
        };

        //permenant cache option... pass in 0 as the expires period
        if(expires === Infinity){
            cache[key].expires = Infinity;
        } else {
             cache[key].expires = new Date(new Date().getTime() + expires);
        }
    };

module.exports = {
    get: getFromCache
    , clear: clearCache
    , remove: removeFromCache
    , entries: cacheEntries
    , add: addToCache
    , prune: pruneCache
};
