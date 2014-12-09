var assert = require('chai').assert
    , cache = require('./index.js');

describe('lds-node-cache tests', function(){

    describe('should be defined correctly', function(){
        it('should have a getFromCache function', function(){
            assert.isFunction(cache.getFromCache);
        });

        it('should have an addToCache function', function(){
            assert.isFunction(cache.addToCache);
        });
    });

    describe('should be able to add and retrieve items to/from the cache', function(){
        it('should retrieve items from the cache');
        it('should add items to the cache');
        it('should not return expired items from the cache');
        it('should allow permenant caching of items');
        it('should remove expired items from the cache');
    });
});