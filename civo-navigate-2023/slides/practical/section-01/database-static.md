---
layout: two-cols
transition: fade-out
clicks: 1
---

# Defining our Database

### compose.yml

```yaml {all|3-9} {maxHeight: '400px'}
services:
  [...]
  postgres:
    container_name: postgres
    environment:
    - POSTGRES_PASSWORD=password
    ports:
    - 5432:5432
    image: postgres:12
    networks:
    - guestbook-network
    restart: unless-stopped
    volumes:
    - db-data:/data
  [...]
```


::right::

<br />

<br /> 

<br />

First, we will define the database:

<v-click at=1>

- container image
- exposed port(s)
- environment variables
  - database name
  - database user
  - database password

</v-click>

---
layout: two-cols
transition: fade-out
clicks:
---

# Defining our Database

### compose.yml

```yaml {3,4,9} {maxHeight: '400px'}
services:
  [...]
  postgres:
    container_name: postgres
    environment:
    - POSTGRES_PASSWORD=password
    ports:
    - 5432:5432
    image: postgres:12
    networks:
    - guestbook-network
    restart: unless-stopped
    volumes:
    - db-data:/data
  [...]
```

::right::

<br />

<br />

### Acornfile

```cue {2-4} {maxHeight:'400px'}
containers: {
  postgres: {
    image: "postgres:12"
  }
}
```

---
layout: two-cols
transition: fade-out
---

# Defining our Database

### compose.yml

```yaml {3,5,6} {maxHeight: '400px'}
services:
  [...]
  postgres:
    container_name: postgres
    environment:
    - POSTGRES_PASSWORD=password
    ports:
    - 5432:5432
    image: postgres:12
    networks:
    - guestbook-network
    restart: unless-stopped
    volumes:
    - db-data:/data
  [...]
```

::right::

<br />

<br />

### Acornfile

```cue {2,4-9} {maxHeight:'400px'}
containers: {
  postgres: {
    image: "postgres:12"
    env: {
      POSTGRES_DB: "guestbookdb"
      POSTGRES_USER: "guestbookuser"
      POSTGRES_PASSWORD: "password"
    }
  }
}
```

---
layout: two-cols
transition: fade-out
---

# Defining our Database

### compose.yml

```yaml {3,7,8} {maxHeight: '400px'}
services:
  [...]
  postgres:
    container_name: postgres
    environment:
    - POSTGRES_PASSWORD=password
    ports:
    - 5432:5432
    image: postgres:12
    networks:
    - guestbook-network
    restart: unless-stopped
    volumes:
    - db-data:/data
  [...]
```

::right::

<br />

<br />

### Acornfile

```cue {2,9,10} {maxHeight:'400px'}
containers: {
  postgres: {
    image: "postgres:12"
    env: {
      POSTGRES_DB: "guestbookdb"
      POSTGRES_USER: "guestbookuser"
      POSTGRES_PASSWORD: "password"
    }
    ports: "postgres:5432/tcp"
  }
}
```