class RedisSessionStore {
  constructor (client) {
    this.client = client;
  }

  get (sid, cb) {
    const id = getRedisSessionID(sid);
    this.client.get(id).then(data => {
      cb(null, JSON.parse(data))
    }).catch(err => cb(err))
  }

  set (sid, sess, ttl) {
    const id = getRedisSessionID(sid);
    let resPromise = null;
    if (typeof ttl === 'number')
      ttl = Math.ceil(ttl / 1000);
    try {
      const data = JSON.stringify(sess);
    } catch (error) {
      console.log('redis get err', err);      
    }
    if (ttl) 
      resPromise = this.client.setex(id, ttl, data);
    else
      resPromise = this.client.set(id, data);

    return resPromise.catch(err => console.log('redis get err', err)); 
  }

  destory (sid, cb) {
    const id = getRedisSessionID(sid);
    this.client.del(id).catch(err => cb(err));
  }
}

function getRedisSessionID (sid) {
  return `ssid: ${sid}`
}

module.exports = RedisSessionStore;