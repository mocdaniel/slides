---
layout: two-cols
transition: fade-out
clicks: 4
---

# Demo 

Let's deploy a workshop guestbook!

<br />

<br />


```bash
acorn install \
--ingress-class-name=nginx \
--lets-encrypt=enabled \
--lets-encrypt-email=dbodky@gmail.com \
--lets-encrypt-tos-agree=true \
--cluster-domain=dbodky.me \
--http-endpoint-pattern="{{.Container}}.{{.ClusterDomain}}"
```

<v-click>

<div class="bg-red absolute left-2 top-43 h-4 w-48 opacity-50 rounded-md"></div>

</v-click>

<v-click>

<div class="bg-green absolute left-2 top-47.5 h-4 w-41 opacity-50 rounded-md"></div>

<div class="bg-green absolute left-2 top-52 h-4 w-68 opacity-50 rounded-md"></div>

<div class="bg-green absolute left-2 top-56.5 h-4 w-53 opacity-50 rounded-md"></div>

</v-click>

<v-click>

<div class="bg-blue absolute left-2 top-61.5 h-4 w-48 opacity-50 rounded-md"></div>

</v-click>

<v-click>

<div class="bg-pink absolute left-2 top-66 h-4 w-106.5 opacity-50 rounded-md"></div>

</v-click>

::right::

<br />

<br />

<br />

<br />

<br />

<ul>

<v-click at=1>

<li class="text-red">Define the installed <code>IngressClass</code></li>

</v-click>

<v-click at=2>

<li class="text-green">Configure TLS certificate generation via <b>Let's Encrypt</b></li>

</v-click>

<v-click at=3>

<li class="text-blue">Configure the cluster domain to use for <code>Ingress</code> generation by Acorn</li>

</v-click>

<v-click at=4>

<li class="text-pink">Configure the HTTP endpoint pattern to use for <code>Ingress</code> generation by Acorn</li>

</v-click>

</ul>

---
layout: two-cols
transition: fade-out
clicks: 5
---

# Demo

Let's deploy a workshop guestbook!

<br />

<br />

```bash
acorn run \
--name=demo \
--target-namespace=guestbook \
--link=ext-db:postgres \
--secret=db-credentials:db-auth \
index.docker.io/dbodky/guestbook-acorn:v1.0.0
```

<v-click>

<div class="bg-red absolute left-2 top-43 h-4 w-21 opacity-50 rounded-md"></div>

</v-click>

<v-click>

<div class="bg-green absolute left-2 top-47.5 h-4 w-51.5 opacity-50 rounded-md"></div>

</v-click>

<v-click>

<div class="bg-pink absolute left-2 top-52 h-4 w-40 opacity-50 rounded-md"></div>

</v-click>

<v-click>

<div class="bg-purple absolute left-2 top-56.5 h-4 w-56.5 opacity-50 rounded-md"></div>

</v-click>

<v-click>

<div class="bg-blue absolute left-2 top-61.5 h-4 w-82 opacity-50 rounded-md"></div>

</v-click>

::right::

<br />

<br />

<br />

<br />

<br />

<ul>

<v-click at=1>

<li class="text-red">Define the name of the Acorn <code>App</code></li>

</v-click>

<v-click at=2>

<li class="text-green">Define the <code>Namespace</code> the <code>App</code> will live in</li>

</v-click>

<v-click at=3>

<li class="text-pink">Link an external Database instead of the <code>postgres</code> service defined in our Acorn</li>

</v-click>

<v-click at=4>

<li class="text-purple">Reference a <code>Secret</code> with our database's credentials instead of providing/generating one</li>

</v-click>

<v-click at=5>

<li class="text-blue">State the <code>Image</code> you want to deploy</li>

</v-click>

</ul>

---
layout: center
class: text-center
transition: fade-out
---

# 🏡👩🏼‍💻🧑🏿‍💻 DO try it at home!
