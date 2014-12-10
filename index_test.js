var assert = require('chai').assert
    , cache = require('./index.js');

describe('lds-node-cache tests', function(){

    describe('should be defined correctly', function(){
        it('should have a get function', function(){
            assert.isFunction(cache.get);
        });

        it('should have an add function', function(){
            assert.isFunction(cache.add);
        });
    });

    describe('should be able to add and retrieve items to/from the cache', function(){
        it('should retrieve items from the cache');
        it('should add items to the cache');
        it('should not return expired items from the cache');
        it('should allow permenant caching of items');
        it('should remove expired items from the cache');
    });

    describe('should be able to find out what is in the cache now', function(){
        it('should return an object of keys with time that the key expires');
    });

    describe('should allow items to be manually removed from the cache', function(){
        it('should have a clear function');
        it('should clear the entire cache with clear')
        it('should have a remove function that takes a key');
        it('should remove an item from cache by key');
    });
});