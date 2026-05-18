---
layout: two-cols
transition: fade-out
---

# Add runtime arguments

```json {6,21|7,10,17,28|8,9,19,20,38,39} {maxHeight:'350px'}
containers: {
  guestbook: {
    image: "dbodky/guestbook-demo:v1.1.0"
    ports: publish: "guestbook:8080/http"
    env: {
      GUESTBOOK_DB_NAME: "guestbookdb"
      GUESTBOOK_DB_HOST: "postgres"
      GUESTBOOK_DB_PASSWORD: "secret://db-credentials/password"
      GUESTBOOK_DB_USER: "secret://db-credentials/username"
      GUESTBOOK_REDIS_HOST: "redis"
    }
    dependsOn: ["postgres", "redis"]
    probes: readiness: http: url: "http://localhost:8080"
  }
  postgres: {
    image: "postgres:12"
    ports: "postgres:5432/tcp"
    env: {
      POSTGRES_USER: "secret://db-credentials/username"
      POSTGRES_PASSWORD: "secret://db-credentials/password"
      POSTGRES_DB: "guestbookdb"
    }
    probes: readiness: tcp: url: "tcp://localhost:5432"
    dirs: "/var/lib/postgresql/data": "volume://db-data"
  }
  redis: {
    image: "redis:7"
    ports: "redis:6379/tcp"
    probes: readiness: tcp: url: "tcp://localhost:6379"
    dirs: "/data": "volume://redis-data"
  }
}

secrets: {
  "db-credentials": {
    type: "basic"
    data: {
      username: ""
      password: ""
    }
  }
}

volumes: {
  "db-data": {}
  "redis-data": {}
}
```

::right::

<br />

<br />

```cue {monaco} {height:'350px'}
containers: {
  guestbook: {
    [...]
    env: {
      GUESTBOOK_DB_NAME: "guestbookdb"
      GUESTBOOK_DB_HOST: "postgres"
      GUESTBOOK_DB_PASSWORD: "secret://db-credentials/password"
      GUESTBOOK_DB_USER: "secret://db-credentials/username"
      GUESTBOOK_REDIS_HOST: "redis"
    }
  }
  postgres: {
    [...]
    env: {
      POSTGRES_USER: "secret://db-credentials/username"
      POSTGRES_PASSWORD: "secret://db-credentials/password"
      POSTGRES_DB: "guestbookdb"
    }
  }
  [...]
}
secrets: {
  "db-auth": {
    type: "basic"
    data: {
      username: ""
      password: ""
    }
  }
}
[...]
```