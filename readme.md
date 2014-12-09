#lds-node-cache
A super super simple in server cache for long running stuff. For instance if you are grabbing remote rss feeds and want to hold on to them for a few minutes instead of requesting them again everytime you need them.

##API
###getFromCache
Usage:
```
var cache = require('lds-node-cache')
    item = cache.getFromCache('http://some-rss-feed/feed.xml');
```
Returns null if the item is not in cache or is expired. Otherwise returns the object.

###addToCache
Usage:
```
var cache = require('lds-node-cache');

//permenant cache
cache.addToCache('http://some-rss-feed/feed.xml', {some: 'stuff'}, 0);

//timed cache (10 minutes)
cache.addToCache('http://some-rss-feed/feed.xml', {some: 'stuff'}, 600000);

```

Takes a key, data, and expires in milliseconds. Returns nothing.