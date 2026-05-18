---
layout: two-cols
transition: fade-out
---

# Add probes

### compose.yml

```yaml {2,6-11} {maxHeight:'350px'}
services:
  guestbook:
    image: dbodky/guestbook
    container_name: guestbook
    [...]
    healthcheck:
      test: ["CMD", "curl", "http://localhost:8080"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 3s
    [...]
```


::right::

<br />

<br />

### Acornfile

```cue {monaco} {height:'350px'}
containers: {
  guestbook: {
    [...]
  }
  postgres: {
    [...]
  }
  redis: {
    [...]
  }
}
```