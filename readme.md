#lds-node-cache
A super super simple in server cache for long running stuff. For instance if you are grabbing remote rss feeds and want to hold on to them for a few minutes instead of requesting them again everytime you need them.

##API

###get

Usage:
```
var cache = require('lds-node-cache')
    item = cache.get('http://some-rss-feed/feed.xml');
```
Returns null if the item is not in cache or is expired. Otherwise returns the object.

###add

Usage:
```
var cache = require('lds-node-cache');

//permenant cache
cache.add('http://some-rss-feed/feed.xml', {some: 'stuff'}, Infinity);

//timed cache (10 minutes)
cache.add('http://some-rss-feed/feed.xml', {some: 'stuff'}, 600000);

```

Takes a key, data, and expires in milliseconds. Returns nothing.

###remove

Usage:
```
var cache = require('lds-node-cache');

cache.remove('http://some-rss-feed/feed.xml');
```

Takes a key and removes the item from the cache if it is present. Requires a key and throws an error if no key is present.

###entries

Usage:
```
var cache = require('lds-node-cache');

var list = cache.entries();
```

Returns a list of all the items in the cache. The returned object is structured like this:

```
{
   key: {expires: Date, uses: Number} 
}
```

Uses is the number of times that the cached item has been accessed from the cache. Expires is the date object (or Infinity) that represents the time when the item should become invalid.

###prune

Usage:
```
var cache = require('lds-node-cache');

cache.prune(2);
```

It takes a single parameter, which is the number of uses below which the item should be deleted from cache. That sounds confusing but the example above deletes any item from the cache that has been accessed with `cache.get` two or fewer times.

It does not delete items that have expires of Infinity.

Under the hood it is a convenience function on top of `cache.clear`.

###clear

Usage:
```
var cache = require('lds-node-cache');

//clear all
cache.clear();

//prune
cache.clear(2);
```

`clear` deletes everything in the cache including items that are cached Infinitely. Passing in a paramter functions exactly as `prune` above.
