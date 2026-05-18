---
layout: two-cols
transition: fade-out
---

# Add dependencies

### compose.yml

```yaml {2,11-15} {maxHeight:'350px'}
services:
  guestbook:
    image: dbodky/guestbook
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

### The Guestbook needs its friends!

<br />

<br />

<v-click at=1>

If the guestbook comes up before the `redis` or `postgres` workloads, it will crash - we should prevent this.

</v-click>

---
layout: two-cols
transition: fade-out
---

# Add dependencies

### compose.yml

```yaml {11-15} {maxHeight:'350px'}
services:
  guestbook:
    image: dbodky/guestbook
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

```cue {2,12,13} {maxHeight:'350px'}
containers: {
  guestbook: {
    image: "dbodky/guestbook-demo:v1.1.0"
    env: {
      GUESTBOOK_DB_NAME: "guestbookdb"
      GUESTBOOK_DB_USER: "guestbookuser"
      GUESTBOOK_DB_PASSWORD: "password"
      GUESTBOOK_DB_HOST: "postgres"
      GUESTBOOK_REDIS_HOST: "redis"
    }
    ports: publish: "guestbook:8080/http"
    dependsOn: ["redis", "postgres"]
  }
  postgres: {...}
  redis: {...}
}
```