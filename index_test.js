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

        it('should have a remove function', function(){
            assert.isFunction(cache.remove);
        });

        it('should have a clear function', function(){
            assert.isFunction(cache.clear);
        });

        it('should have a contains function', function(){
            assert.isFunction(cache.contains);
        });
    });

    describe('should be able to add and retrieve items to/from the cache', function(){
        it('should add items to the cache', function(){
            cache.add('someKey', {item: 'I have not yet begun to fight'}, 5);

            assert.isObject(cache.get('someKey'));
        });

        it('should retrieve items from the cache', function(){
            assert.isObject(cache.get('someKey'));
        });

        it('should not return expired items from the cache', function(done){
            setTimeout(function(){
                assert.isNull(cache.get('someKey'));
                done();
            }, 10);            
            
        });

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