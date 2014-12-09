//TODO: have the cache drop expired items on an interval of some sort
var cache = {}
    , isExpired = function(key){
        var currentTime = new Date()
            , expired = !!(currentTime.getTime() >= cache[key].expires.getTime() || cache[key].expires === 0);

        if(expired){
            //clear this item from cache
            delete cache[key];
        }

        return expired;
    };

module.exports = {
    getFromCache: function (key) {
        if(typeof cache[key] !== 'undefined' && !isExpired(key)){
            return cache[key].data;
        } else {
            return null;
        }
    }

    , addToCache: function (key, object, expires) {
        cache[key] = {
            data: object
            , expires: new Date(new Date().getTime() + expires)
        };

        //permenant cache option... pass in 0 as the expires period
        if(expires === 0){
            cache[key].expires = 0;
        }
    }
}
