//TODO: have the cache drop expired items on an interval of some sort
//TODO: memory size?
//TODO: jshint and editorconfig (add them yo)

var cache = {}
    , isExpired = function (key) {
        var currentTime = new Date()
            , expired = !!(currentTime.getTime() >= cache[key].expires.getTime() || cache[key].expires === 0);

        if(expired){
            //clear this item from cache
            delete cache[key];
        }

        return expired;
    }

    , getFromCache = function (key) {
        if(typeof cache[key] !== 'undefined' && !isExpired(key)){
            return cache[key].data;
        } else {
            return null;
        }
    }

    , cacheContains = function () {
        var obj = {};

        Object.getOwnPropertyNames(cache).forEach(function(item){
            obj[item] = cache[item].expires;
        });

        return obj;
    }

    , clearCache = function () {
        cache = {};
    }

    , removeFromCache = function (key) {
        try{
            delete cache[key];
        } catch (e) {
            //an error...
        }
    }

    , addToCache = function (key, object, expires) {
        cache[key] = {
            data: object
            , expires: new Date(new Date().getTime() + expires)
        };

        //permenant cache option... pass in 0 as the expires period
        if(expires === 0){
            cache[key].expires = 0;
        }
    };

module.exports = {
    get: getFromCache
    , clear: clearCache
    , remove: removeFromCache
    , contains: cacheContains
    , add: addToCache
};
