---
layout: two-cols
transition: fade-out
---

# Add runtime arguments

```cue {6,21,7,10,17,28,8,9,19,20,38,39} {maxHeight:'350px'}
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

### Press any key

<br />

<br />

...to see nothing changed! We still rely on many hardcoded values in our Acornfile.

Let's allow users to have a say *what* they actually deploy!

---
layout: two-cols
transition: fade-out
---

# Add runtime arguments

```cue {6,21} {maxHeight:'350px'}
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

```cue {1-4,9,15} {maxHeight:'350px'}
args: {
  // Name of the database to connect to
  dbName: "guestbookdb"
}
containers: {
  guestbook: {
    // omitted content
    env: {
      GUESTBOOK_DB_NAME: args.dbName
    }
  }
  postgres: {
    // omitted content
    env: {
      POSGRES_DB: args.dbName
    }
  }
  redis: {
    // omitted content
  }
}

secrets: {
  // omitted content
}

volumes: {
  // omitted content
}
```

---
layout: two-cols
transition: fade-out
---

# Add runtime arguments

```cue {7,10,17,28} {maxHeight:'350px'}
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

```cue {4-7,15,16} {maxHeight:'350px'}
args: {
  // Name of the database to connect to
  dbName: "guestbookdb"
  // FQDN/IP of the database to connect to
  dbHost: "postgres"
  // FQDN/IP of the redis instance to connect to
  redisHost: "redis"
}

containers: {
  guestbook: {
    // omitted content
    env: {
      GUESTBOOK_DB_NAME: args.dbName
      GUESTBOOK_DB_HOST: args.dbHost
      GUESTBOOK_REDIS_HOST: args.redisHost
    }
  }
  postgres: {
    // omitted content
    env: {
      POSGRES_DB: args.dbName
    }
  }
  redis: {
    // omitted content
  }
}

secrets: {
  // omitted content
}

volumes: {
  // omitted content
}
```

---
layout: two-cols
transition: fade-out
---

# Add runtime arguments

```cue {8,9,19,20,38,39} {maxHeight:'350px'}
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

```cue {8-11,18,19} {maxHeight:'350px'}
args: {
  // Name of the database to connect to
  dbName: "guestbookdb"
  // FQDN/IP of the database to connect to
  dbHost: "postgres"
  // FQDN/IP of the redis instance to connect to
  redisHost: "redis"
  // Database password to use
  dbPassword: ""
  // Database user to use
  dbUser: ""
}

secrets: {
  "db-auth": {
    type: "basic"
    data: {
      username: args.dbUser
      password: args.dbPassword
    }
  }
}

containers: {
  guestbook: {
    // omitted content
    env: {
      GUESTBOOK_DB_NAME: args.dbName
      GUESTBOOK_DB_HOST: args.dbHost
      GUESTBOOK_REDIS_HOST: args.redisHost
    }
  }
  postgres: {
    // omitted content
    env: {
      POSGRES_DB: args.dbName
    }
  }
  redis: {
    // omitted content
  }
}

volumes: {
  // omitted content
}
```

---
layout: two-cols
transition: fade-out
---

# Add runtime arguments

<br />

<br />

<br />

<br />

As we will deploy this Acorn to Kubernetes, let's utilize its scaling features and and make our frontend scalable!

::right::

<br />

<br />

```cue {12,13,18-20} {maxHeight:'350px'}
args: {
  // Name of the database to connect to
  dbName: "guestbookdb"
  // FQDN/IP of the database to connect to
  dbHost: "postgres"
  // FQDN/IP of the redis instance to connect to
  redisHost: "redis"
  // Database password to use
  dbPassword: ""
  // Database user to use
  dbUser: ""
  // amount of replicas to run for our frontend
  replicas: 3
}

containers: {
  guestbook: {
    if !args.dev {
      scale: args.replicas
    }
    // omitted content
    env: {
      GUESTBOOK_DB_NAME: args.dbName
      GUESTBOOK_DB_HOST: args.dbHost
      GUESTBOOK_REDIS_HOST: args.redisHost
    }
  }
  postgres: {
    // omitted content
    env: {
      POSGRES_DB: args.dbName
    }
  }
  redis: {
    // omitted content
  }
}

secrets: {
  // omitted content
}

volumes: {
  // omitted content
}
```

---
layout: default
transition: fade-out
---

# Why the comments?

Because they help Acorn's CLI to parse nice output for end users!

```bash
acorn run . --help
Usage of Acornfile:
      --db-host string       FQDN/IP of our PostgreSQL database
      --db-name string       name of the database provisioned for our application
      --db-password string   database password provisioned for our application
      --db-user string       database user provisioned for our application
      --redis-host string    FQDN/IP of our Redis cache
      --replicas int         amount of replicas to run