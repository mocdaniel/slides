---
theme: default
title: Run Cloud-Native Workshops the Cloud-Native Way With Educates
info: A talk about Educates, a workshop and training platform based on Kubernetes.
date: 2025-07-10
event: CNCF Meetup Nuremberg
location: Nuremberg, Germany
tags: ["Kubernetes", "Talk"]
class: text-center
transition: slide-left
mdc: true
---

# Educates

Run Cloud-Native Workshops the Cloud-Native Way

<div class="mt-12 py-1">
  CNCF Meetup Nürnberg <br/>
  July 10, 2025
</div>


---
layout: two-cols
class: text-2xl
---

# Agenda

Our plans today

- ❓ What is Educates
- 🏗️ Architecture of Educates
- 🕹️ Features of Educates
- 🚀 Getting Started with Educates
- 💻 Authoring Workshops with Educates
- 🎨 Customizing Educates
- 🏭 Educates in Production
 

::right::

<div class="flex h-full flex-col justify-center items-center">
  <img src="./public/educates.svg" alt="Educates logo" class="w-60" />
</div>

---
layout: two-cols
---

# About Me

Who's this guy?

<br />

- DevRel and CNCF Kubestronaut from Germany 🇩🇪
- **@ NETWAYS Web Services**, an MSP and Cloud Provider
- Especially interested in GitOps and Infrastructure as Code
- In my free time, I...
  - ...build small web apps
  - ...tinker with my homelab
  - ...learn about OpenTelemetry

::right::

<div class="h-full flex flex-col justify-center">
  <img src="./public/daniel-bodky.jpg" alt="Headshot of Daniel Bodky" class="w-64 rounded-full m-x-auto "/>
</div>

---
layout: section
---

# ❓ What is Educates

A short introduction

---

# Educates

An interactive training platform

- System for hosting **interactive workshop environments** in **Kubernetes** or a local **container runtime**
- Useful for both, **self paced** and **supervised** workshops
- Many **available features**, e.g.
  - Docker support
  - Kubernetes support
  - IDE integration
  - Interactive instructions and slides
- Open Source and community driven

**Website**: [educates.dev](https://educates.dev)

**GitHub**: [educates/educates-training-platform](https://github.com/educates/educates-training-platform)

---
layout: section
---

# 🏗️ Architecture of Educates

Workloads, CRDs, and more

---

# Educates Workloads

Three controllers in a trenchcoat

The Educates Platform consists of **three controllers**:

- `secrets-manager`:
   
  `Deployment` taking care of **syncing secrets** to workshop sessions etc.

- `session-manager`:

  `Deployment` **managing** and **provisioning** workshop **sessions** and **training portals**

- `image-puller`:

  `DaemonSet`, ensuring **images** needed for training portals and workshop environments
   are **available on each cluster node**

<br />

In order to work, these controllers require **certain dependencies** running in the cluster.

---

# Educates Workloads

Required Dependencies

The following dependencies are required by the Educates platform to run properly. Some of them get installed by default upon cluster creation along with Educates:

<br />

- [Contour](https://projectcontour.io) as **Ingress Controller** for proper connectivity of workshop environments

- [Kyverno](https://kyverno.io) as **Policy Engine** for sandboxing workshop environments

- **\[Optional\]** [CertManager](https://cert-manager.io) for automatically creating needed TLS certificates

- **\[Optional\]** [ExternalDNS](https://kubernetes-sigs.github.io/external-dns/latest/) for automatically creating needed DNS entries

---

# Educates CRDs

How to Interact with the Platform

The following CRDs are the most interesting ones for interacting with Educates:

- `Workshops`: Define a workshop to be made available in Educates, including
  - **Feature Set** (e.g. Docker, Kubernetes, Terminals)
  - **Content Source** (OCI Registry)
  - **Metadata** (Author, Tags, Workshop Source)

- `TrainingPortals`: Define a web portal for browsing and launching workshops, including
  - **Authentication** (None, Anonymous, User-Based)
  - **Custom Themes** (HTML, CSS, JS)
  - **Default Session Settings** (How many concurrent sessions? Preprovisioning? etc.)

---
layout: section
---

# 🕹️ Features of Educates

What's in the box?

---

# General Features

<br />
<br />

- Integrated **VSCode IDE**
- Interactive workshop instructions including **actions, checks**,<br/>and **templating** using session data
- Optional **embedding** of **slides**
- Optional embedding of **3rd party services** in the workshop UI,<br />both **internal** and **external** to the workshop
- Optional **extension** and **configuration** of startup logic,<br />e.g. for **installing** additional tooling
- **Preinstalled tools** in the session environments:<br />`git`,`gpg`,`node`,`python`,`npm`,`jq`,`yq`, etc.

---

# Kubernetes Features

<br />

<br />

- Dedicated **session namespace(s)** in the host cluster
- Dedicated **virtual clusters** powered by [vCluster](https://vcluster.com)
- **Sandboxing** of sessions with [Kyverno](https://kyverno.io)
- **Provisioning** of additional resources on session start
- Shared OCI **image cache**
- Embedded **Kubernetes Console**
- **Preinstalled tools** in the session environments:<br />`kubectl`, `helm`, `k9s`, `kustomize`, etc.

---

# Docker Features

<br />

<br />

- Dedicated **Docker daemon** for sessions in the host cluster
- Dedicated **Docker registry** for pushing/pulling container<br />images in the host cluster
- Passthrough of published container ports to the **workshop UI**
- **Preinstalled tools** in the session environments:<br />`docker`, `docker compose`, `ctr`, `skopeo`

---
layout: section
---

# 🚀 Getting Started with Educates

Your workshop platform is 5 minutes away

---

# Getting Started

<br />

Bootstrapping a local Educates platform and running your first workshop takes **four CLI commands**:

```sh
# Bootstrap the Educates platform using KinD
educates create-cluster

# Scaffold a new workshop
educates new-workshop cncf-meetup-demo

# Publish the workshop to a (local) registry
educates publish-workshop

# Deploy the workshop to the cluster
educates deploy-workshop
```

---
layout: center
preload: false
---

<img src="./public/bootstrap.gif" alt="GIF showing the Educates bootstrap process" class="w-200" />

---
layout: section
---

# 💻 Authoring Workshops

Markdown all the way

---

# About Workshops in Educates

<br />

- Workshops in Educates are written in **Markdown** and rendered by [Hugo](https://gohugo.io)
- Educates comes with multiple custom **short codes** for
  - Action Boxes
  - Admonitions
  - Exercises/Tests
- Workshops get packaged as **OCI images** and **downloaded** on session start

---

# Workshop Scaffolding

All done for you

A new workshop can be scaffolded like this:

```sh
educates new-workshop cncf-meetup-demo

tree cncf-meetup-demo
cncf-meetup-demo
├── .gitignore # ----------------------------> Git repo gets initialized
├── README.md # -----------------------------> README.md for VCS
├── resources # -----------------------------> Kubernetes manifests
│   └── workshop.yaml # ---------------------> Workshop CRD
└── workshop # ------------------------------> Workshop instructions
    ├── config.yaml # -----------------------> Hugo config
    └── content # ---------------------------> Instruction contents
        ├── 00-workshop-overview.md
        ├── 01-workshop-instructions.md
        └── 99-workshop-summary.md
```

---

# The Default Workshop

What's it like?

<br />

By default, the following features are configured:

- A **split terminal** to interact with the session
- **VSCode IDE**

Additional settings provide **metadata** and **packaging information** for Educates.

---
layout: two-cols
---

# The Authoring Loop

How to write instructions efficiently

1. Create/Update workshop instructions in `workshop/content`
2. Publish updated instructions:<br />`educates publish-workshop`
3. Deploy the new workshop version:<br />`educates deploy-workshop`
4. Start a new session

➡️ Not very efficient, requires multiple commands and wait-time

::right::

<div v-click class="right-content">

1. Spin up a local [Hugo](https://gohugo.io) server and configure Educates to fetch workshop instructions from it:<br />
`educates serve-workshop --patch-workshop`
2. Start a new session
3. Create/Update workshop instructions in `workshop/content`
4. Enjoy **hot reloading** in your session

➡️ Way more efficient, faster feedback

</div>

<style>
.right-content {
  @apply b-l-1;
  @apply p-l-4;
  @apply h-full;
  @apply flex flex-col justify-center;
}
</style>

---
layout: section
---

# 🎆 Demo Time

Let's see this in action

---
layout: section
---

# 🎨 Customizing Educates

What else can you do?

---

# Customizing Educates

<br />

Apart from authoring workshops, Educates is very versatile regarding its overall appearance:

- Inject **custom themes** (HTML, CSS, JS) for...
  - Training Portals
  - Workshop Instructions
  - Splash Screens
- Add **Google Analytics** to the platform, including predefined **custom events**
- Run Educates **headless** and interact with it via API

---
layout: section
---

# 🏭 Educates in Production

How to run Educates at scale

---

# Deploying Educates to Production

<br />

Educates can be deployed to multiple infrastructure providers using either the CLI or [Carvel](https://carvel.dev):

- **Hyperscalers**: `aws`, `gke`
- **Local environments**: `kind`, `minikube`
- **Miscellaneous**: `openshift`, `vcluster`

<br />

Depending on the target platform, a subset of (optional) requirements, e.g. [Kyverno](https://kyverno.io)<br />or [CertManager](https://cert-manager.io) gets installed.

<br />

`TrainingPortals` and `Workshops` can then be managed **imperatively** (via CLI/`kubectl`)<br />or **declaratively** (e.g. via GitOps).

---

# Educates at NETWAYS

<br />

At NETWAYS, we use Educates for...

- **...our public playground: [playground.nws.netways.de](https://playground.nws.netways.de)** (free, sessions on demand)
- **...an internal learning platform** (behind authentication, sessions on demand)
- **...event and conference workshops/booth activities**<br />(peaked at 50 concurrent sessions, ~100 Cores/300GB RAM)

<br />

We deploy Educates on **NETWAYS Managed Kubernetes®** with [ArgoCD](https://argoproj.github.io) for...

- **...resilient setup** (cluster creation to active session in ~10 minutes)
- **...reconciliation of status-quo** (useful for CTFs/Hackathons)
- **...real-time updates of `Workshops` and `TrainingPortals`** (useful for scaling up/down)

---
layout: two-cols
---

# Thank You

I hope it was interesting

<br />
<br />

📊 **Slides**: [slides.dbodky.me/cncf-nbg-2025](https://slides.dbodky.me/cncf-nbg-2025)

🌐 **Educates Website**: [educates.dev](https://educates.dev)

📚 **Educates Docs**: [docs.educates.dev](https://docs.educates.dev)

🌐 **Website**: [dbodky.me/#contact](https://dbodky.me/#contact)

👍 **Feedback**: [feedback.dbodky.me](https://feedback.dbodky.me) 

<div class="m-l-6 m-t--2" >

  Code: `CNCF-NUER`

</div>

::right::

<div class="h-full flex flex-col items-center m-x-auto">

## Slides

<img src="./public/slides-qr.svg" alt="QR code for slides.dbodky.me/kcd-cz-sk-2025" class="h-40 w-40 m-b-10"/>

## Feedback

<img src="./public/feedback-qr.svg" alt="QR code for feedback.dbodky.me" class="h-40 w-40 m-b-10" />

</div>
