---
layout: two-cols
transition: fade-out
clicks: 4
---

# Almost there!

Deployment looks similar to the workflow on Docker

<br />

<br />

```bash {|1|3|5|7,9,10} {maxHeight:'400px'}
acorn login <registry>

acorn build -t <registry>/<user>/<image>:<tag>

acorn push <registry>/<user>/<image>:<tag>

acorn run <registry>/<user>/<image>:<tag> --help

acorn run --target-namespace demo --name demo \
<registry/user/image/tag> [OPTIONS]
```

::right::

<br />

<br />

<br />

<br />

<br />

<v-click at=1>

1. Login to your registry

<br />

</v-click>

<v-click at=2>

2. Build and tag the image/artifact

<br />

</v-click>

<v-click at=3>

3. Push the image to your repository

<br />

</v-click>

<v-click at=4>

4. Pull the image to its destination or deploy it directly

</v-click>
