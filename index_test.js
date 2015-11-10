/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , cache = require('./index.js')

    , oneHundred = 100
    , threeHundred = 300;

describe('lds-node-cache tests', () => {

    describe('should be defined correctly', () => {
        it('should have a get function', () => {
            assert.isFunction(cache.get);
        });

        it('should have an add function', () => {
            assert.isFunction(cache.add);
        });

        it('should have a remove function', () => {
            assert.isFunction(cache.remove);
        });

        it('should have a clear function', () => {
            assert.isFunction(cache.clear);
        });

        it('should have a entries function', () => {
            assert.isFunction(cache.entries);
        });

        it('should have a prune function', () => {
            assert.isFunction(cache.prune);
        });
    });

    describe('should be able to add and remove items to/from the cache', () => {
        it('should add items to the cache', () => {
            cache.add('someKey', { item: 'I have not yet begun to fight' }, 5);

            assert.isObject(cache.get('someKey'));
        });

        it('should retrieve items from the cache', () => {
            assert.isObject(cache.get('someKey'));
        });

        it('should not return expired items from the cache', (done) => {
            setTimeout(() => {
                assert.isNull(cache.get('someKey'));
                done();
            }, 10);

        });

        it('should allow permenant caching of items', () => {
            cache.add('infiniteKey', { item: 'I have not yet begun to fight' }, Infinity);

            cache.prune(2);
            assert.isObject(cache.entries().infiniteKey, 'should be there');
            assert.isObject(cache.get('infiniteKey'));
        });

        it('should remove expired items from the cache', (done) => {
            cache.add('someKey', { item: 'I have not yet begun to fight' }, 5);

            setTimeout(() => {
                assert.isNull(cache.get('someKey'));
                assert.isUndefined(cache.entries().someKey);
                done();
            }, 10);
        });

        it('should remove all items below a certain use threshold from the cache with prune', () => {
            cache.add('ether', { prophet: true }, oneHundred);
            cache.add('samuel', { prophet: true }, oneHundred);
            cache.add('jared', { prophet: true }, oneHundred);
            cache.add('joseph', { prophet: true }, oneHundred);

            cache.get('ether');
            cache.get('ether');
            cache.get('joseph');
            cache.get('joseph');
            cache.get('jared');
            cache.get('joseph');

            cache.prune(2);

            assert.isNull(cache.get('jared'), 'jared should be null');
            assert.isNull(cache.get('ether'), 'ether should be null');
            assert.isObject(cache.get('joseph'), 'jospeh should be an object');
        });

        it('should remove all items below a certain use threshold from the cache with clearCache and a param', () => {
            cache.add('ether', { prophet: true }, oneHundred);
            cache.add('samuel', { prophet: true }, oneHundred);
            cache.add('jared', { prophet: true }, oneHundred);
            cache.add('joseph', { prophet: true }, oneHundred);

            cache.get('ether');
            cache.get('ether');
            cache.get('joseph');
            cache.get('joseph');
            cache.get('jared');
            cache.get('joseph');

            cache.clear(2);

            assert.isNull(cache.get('jared'), 'jared should be null');
            assert.isNull(cache.get('ether'), 'ether should be null');
            assert.isObject(cache.get('joseph'), 'jospeh should be an object');
        });
    });

    describe('should be able to find out what is in the cache now', () => {
        it('should return an object of keys', () => {
            cache.add('entriesTest', {}, oneHundred);

            assert.isObject(cache.entries().entriesTest);
        });

        it('the returned object should contain a use count', () => {
            cache.add('entriesTest', {}, oneHundred);

            assert.isObject(cache.entries().entriesTest);
            assert.isNumber(cache.entries().entriesTest.uses);
        });

        it('the returned object should contain an expires date object', () => {
            cache.add('entriesTest', {}, oneHundred);

            assert.isObject(cache.entries().entriesTest);
            assert.instanceOf(cache.entries().entriesTest.expires, Date);
        });
    });

    describe('should allow items to be manually removed from the cache', () => {
        it('should clear the entire cache with clear', () => {
            cache.add('testData', {}, threeHundred);
            cache.add('moreTest', {}, threeHundred);
            cache.add('lotsATest', {}, threeHundred);

            cache.clear();

            assert.isNull(cache.get('lotsATest'));
        });

        it('should have a remove function that takes a key', () => {
            assert.throw(cache.remove, Error);
        });

        it('remove should return false if the key does not exist', () => {
            assert.strictEqual(cache.remove('moroni'), false);
        });

        it('should remove an item from cache by key', () => {
            cache.add('moroni', { prophet: true, hasPlates: true }, oneHundred);

            assert.isObject(cache.get('moroni'));

            cache.remove('moroni');

            assert.isNull(cache.get('moroni'));
        });
    });
});
