---
layout: default
transition: fade-out
clicks: 1
---

# Preparing our dev environment

Time to fetch our repository!

```bash {1-5|6}
git clone https://github.com/mocdaniel/acorn-workshop.git && cd acorn-workshop

git checkout section-01

ls
Acornfile  compose.yml  LICENSE  README.md
```

<v-click at=1>

<br />

<br />

<br />

**Acornfile** contains our configuration for Acorn to take, parse, and deploy.

**compose.yml** contains the same application, but as compose Stack to be deployed with Docker.

</v-click>
