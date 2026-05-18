---
layout: two-cols
transition: fade-out
clicks: 4
---

# Defining the guestbook

### compose.yml

```yaml {all|2-10,19,20|2,3,4|2,5-10|2,19-20} {maxHeight:'350px'}
services:
  guestbook:
    image: dbodky/guestbook-demo:v1.1.0
    container_name: guestbook
    command:
    - --db-name=postgres
    - --db-host=postgres
    - --db-password=password
    - --db-user=postgres
    - --redis-host=redis
    depends_on:
      postgres:
        condition: service_started
      redis:
        condition: service_started
    [...]
    networks:
    - guestbook-network
    ports:
    - 8080:8080
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
  redis: {...}
}
```
