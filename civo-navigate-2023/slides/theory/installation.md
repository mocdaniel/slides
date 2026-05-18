---
layout: default
transition: fade-out
clicks: 4
---

# Installing Acorn

```bash {1|1,2|1,3-5|1,6-9|1,10,11}
acorn install
  ✔  Running Pre-install Checks
  ✔  Installing ClusterRoles
  ✔  Installing APIServer and Controller
      (image ghcr.io/acorn-io/acorn:v0.5.0)
  ✔  Waiting for controller deployment to be available
  ✔  Waiting for API server deployment to be available
  ✔  Waiting for registry server deployment to be
      available
  ✔  Running Post-install Checks
  ✔  Installation done
```

The installation takes many parameters, e.g. for configuring **Let's encrypt**

<v-click at=1>

1. acorn checks some prerequisites (e.g. existing IngressController).

</v-click>

<v-click at=2>

2. ClusterRoles, followed by the workloads and CRDs get installed.

</v-click>

<v-click at=3>

3. waits for its workloads to be up and running.

</v-click>

<v-click at=4>

4. if all checks succeed, we can start! 🎉

</v-click>
