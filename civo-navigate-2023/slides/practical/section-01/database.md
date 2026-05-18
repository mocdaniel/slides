---
layout: two-cols
transition: fade-out
clicks: 4
---

# Defining our Database

### compose.yml

```yaml {all|3-9|3,4,9|3,5,6|3,7,8} {maxHeight: '400px'}
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

<v-click at=1>

<br />

<br />

### Acornfile

```cue {monaco} {height:'350px'}
containers: {
  postgres: {
    
  }
}
```

</v-click>
