---
layout: two-cols
transition: fade-out
---

# Defining the Redis cache

### compose.yml

```yaml {all|3-7|3,4,7|3,5,6} {maxHeight:'400px'}
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

```cue {monaco} {height:'350px'}
containers: {
  postgres: {...}
}
```
