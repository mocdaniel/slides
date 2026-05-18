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

### Acornfile

```cue {monaco} {height:'350px'}
containers: {
  postgres: {
    [...]
  }
  redis: {
    [...]
  }
}
```
