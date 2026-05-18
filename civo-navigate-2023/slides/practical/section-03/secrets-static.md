---
layout: two-cols
transition: fade-out
---

# Add secret management

### We're still relying on...

<br />

- hardcoded passwords (uh-oh)

<br />

- hardcoded database names

<br />

- our services to never go down/restart (or else data will get lost)

<br />

**Let's fix this! 🩹**

::right::

<br />

<br />

### Acornfile

```cue {5,6,12,13} {height:'350px'}
containers: {
  guestbook: {
    // omitted content
    env: {
      GUESTBOOK_DB_PASSWORD: "password"
      GUESTBOOK_DB_USER: "guestbookuser"
    }
  }
  postgres: {
    // omitted content
    env: {
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

# Add secret management

### We're still relying on...

<br />

- hardcoded passwords (uh-oh)

<br />

- hardcoded database names

<br />

- our services to never go down/restart (or else data will get lost)

<br />

**Let's fix this! 🩹**

::right::

<br />

<br />

### Acornfile

```cue {1-7,13,14,20,21} {maxHeight:'350px'}
secrets: "db-auth": {
  type: "basic"
  data: {
    username: ""
    password: ""
  }
}

containers: {
  guestbook: {
    // omitted content
    env: {
      GUESTBOOK_DB_PASSWORD: "secret://db-auth/password"
      GUESTBOOK_DB_USER: "secret://db-auth/username"
    }
  }
  postgres: {
    // omitted content
    env: {
      POSTGRES_USER: "secret://db-auth/username"
      POSTGRES_PASSWORD: "secret://db-auth/password"
    }
  }
  redis: {
    // omitted content
  }
}
```