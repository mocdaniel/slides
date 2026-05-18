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

### Dependencies need Probes

<br />

<br />

Without **probes**, dependencies are registered as met once the workloads get started - regardless of their actual states.

We will need to add some probes!

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

```cue {4,8,12} {maxHeight:'350px'}
containers: {
  guestbook: {
    // omitted content
    probe: readiness: http: url: "http://localhost:8080"
  }
  postgres: {
    // omitted content
    probe: readiness: tcp: url: "tcp://localhost:5432"
  }
  redis: {
    // omitted content
    probe: readiness: tcp: url: "tcp://localhost:6379"
  }
}
```

<v-click>

The probe for `guestbook` isn't needed for our dependencies to work, but it will help Kubernetes to determine its state!

</v-click>