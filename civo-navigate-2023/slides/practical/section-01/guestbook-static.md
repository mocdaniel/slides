---
layout: two-cols
transition: fade-out
clicks: 1
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

### Last one left: Guestbook

<br />

<br />

Our guestbook needs the most configuration:

<v-click at=1>

- image
- many environment variables (to map the `command` from the `compose` file)
- a published port

</v-click>

---
layout: two-cols
---

# Defining the guestbook

### compose.yml

```yaml {2,3,4} {maxHeight:'350px'}
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

```cue {2-4} {maxHeight:'350px'}
containers: {
  guestbook: {
    image: "dbodky/guestbook-demo:v1.1.0"
  }
  postgres: {...}
  redis: {...}
}
```

---
layout: two-cols
---

# Defining the guestbook

### compose.yml

```yaml {2,5-10} {maxHeight:'350px'}
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

```cue {2,4-11} {maxHeight:'350px'}
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
  }
  postgres: {...}
  redis: {...}
}
```

---
layout: two-cols
transition: fade-out
---

# Defining the guestbook

### compose.yml

```yaml {2,19-20} {maxHeight:'350px'}
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

```cue {2,11,12} {maxHeight:'350px'}
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
  }
  postgres: {...}
  redis: {...}
}
```