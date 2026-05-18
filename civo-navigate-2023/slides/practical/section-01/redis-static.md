---
layout: two-cols
transition: fade-out
clicks: 1
---

# Defining the Redis cache

### compose.yml

```yaml {all|3-7} {maxHeight:'400px'}
services:
  [...]
  redis:
    container_name: redis
    ports:
    - 6379:6379
    image: redis:7
    networks:
    - guestbook-network
    restart: unless-stopped
  [...]
```


::right::

<br />

<br />


### Next up: **Redis** 

<br />

<br />

<br />


<v-click at=1>

We only need to configure the port and image used for this simple setup.

</v-click>


---
layout: two-cols
transition: fade-out
---

# Defining the Redis cache

### compose.yml

```yaml {3,4,7} {maxHeight:'400px'}
services:
  [...]
  redis:
    container_name: redis
    ports:
    - 6379:6379
    image: redis:7
    networks:
    - guestbook-network
    restart: unless-stopped
  [...]
```


::right::

<br />

<br />

### Acornfile

```cue {3-5} {maxHeight:'400px'}
containers: {
  postgres: {...}
  redis: {
    image: "redis:7"
  }
}
```

---
layout: two-cols
transition: fade-out
---

# Defining the Redis cache

### compose.yml

```yaml {3,5,6} {maxHeight:'400px'}
services:
  [...]
  redis:
    container_name: redis
    ports:
    - 6379:6379
    image: redis:7
    networks:
    - guestbook-network
    restart: unless-stopped
  [...]
```


::right::

<br />

<br />

### Acornfile

```cue {3,5,6} {maxHeight:'400px'}
containers: {
  postgres: {...}
  redis: {
    image: "redis:7"
    ports: "redis:6379/tcp"
  }
}
```