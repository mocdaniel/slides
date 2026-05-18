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

```cue {monaco} {height:'350px'}
containers: {
  guestbook: {
    [...]
    env: {
      GUESTBOOK_DB_PASSWORD: "password"
      GUESTBOOK_DB_USER: "guestbookuser"
    }
  }
  postgres: {
    [...]
    env: {
      POSTGRES_USER: "guestbookuser"
      POSTGRES_PASSWORD: "password"
    }
  }
}
```