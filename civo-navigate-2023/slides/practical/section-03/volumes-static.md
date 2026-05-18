---
layout: two-cols
transition: fade-out
---

# Add data persistency

### compose.yml

```yaml {3,5-7,9,10} {maxHeight:'350px'}
services:
  [...]
  postgres:
    [...]
    volumes:
    - db-data:/var/lib/postgresql/data
  redis:
    [...]
    volumes:
    - redis-data:/data
```

::right::

<br />

<br />

### *Have you tried rebooting?*

<br />

<br /> 

This would currently erase all our data! 😱

We need to create volumes in order to achieve data persistance.

---
layout: two-cols
transition: fade-out
---

# Add data persistency

### compose.yml

```yaml {3,5-7,9,10} {maxHeight:'350px'}
services:
  [...]
  postgres:
    [...]
    volumes:
    - db-data:/data
  redis:
    [...]
    volumes:
    - redis-data:/data
```

::right::

<br />

<br />

### Acornfile

```cue {1-4,12,16} {maxHeight:'350px'}
volumes: {
  "postgres-data": {}
  "redis-data": {}
}

containers: {
  guestbook: {
    // omitted content
  }
  postgres: {
    // omitted content
    dirs: "/var/lib/postgresql/data": "volume://postgres-data?subpath=/data"
  }
  redis: {
    // omitted content
    dirs: "/data": "volume://redis-data"
  }
}

secrets: {
  // omitted content
}
```
