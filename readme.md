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

###remove

###contains

###clear

###prune

Takes a key, data, and expires in milliseconds. Returns nothing.