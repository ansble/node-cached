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

        it('should have a entries function', function(){
            assert.isFunction(cache.entries);
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
        it('should return an object of keys', function(){
            cache.add('entriesTest', {}, 100);

            assert.isObject(cache.entries().entriesTest);
        });

        it('the returned object should contain a use count', function(){
            cache.add('entriesTest', {}, 100);

            assert.isObject(cache.entries().entriesTest);
            assert.isNumber(cache.entries().entriesTest.uses);
        });

        it('the returned object should contain an expires date object', function(){
            cache.add('entriesTest', {}, 100);

            assert.isObject(cache.entries().entriesTest);
            assert.instanceOf(cache.entries().entriesTest.expires, Date);
        });
    });

    describe('should allow items to be manually removed from the cache', function(){
        it('should clear the entire cache with clear', function(){
            cache.add('testData', {}, 300);
            cache.add('moreTest', {}, 300);
            cache.add('lotsATest', {}, 300);

            cache.clear();

            assert.isNull(cache.get('lotsATest'));
        });

        it('should have a remove function that takes a key', function(){
            assert.throw(cache.remove, Error);
        });

        it('remove should return false if the key does not exist', function(){
            assert.strictEqual(cache.remove('moroni'), false);
        });

        it('should remove an item from cache by key', function(){
            cache.add('moroni', {prophet: true, hasPlates: true}, 100);

            assert.isObject(cache.get('moroni'));
            
            cache.remove('moroni');

            assert.isNull(cache.get('moroni'));
        });
    });
});