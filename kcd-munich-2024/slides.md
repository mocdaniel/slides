---
theme: ./
title: Towards Standardized Platforms
info: How the CNOE project can help.
event: KCD Munich 2024
date: 2024-07-02
location: Munich, Germany
tags: ["Kubernetes", "Platform Engineering", "Talk"]
twitter: d_bodky
github: mocdaniel
linkedin: in/daniel-bodky
author: Daniel Bodky | Platform Advocate
---

# Towards Standardized Platforms

How the CNOE Project Can Help

---
layout: section
transition: slide-up
---

# Who is Using Internal Platforms at Work?

---
layout: section
transition: slide-left
---

# 80% of Engineering Organizations

will establish Platform Engineering teams by 2026, according to Gartner<sup>[1](https://www.gartner.com/en/articles/what-is-platform-engineering)</sup>

---
layout: speaker
transition: slide-left
---

# ~ $ whois daniel-bodky

- Platform Advocate at [NWS](https://nws.netways.de)
- Ex Systems Engineer, Consultant
- Focus on Kubernetes, Platforms, and GitOps

---
layout: default
clicks: 3
---

# So What _is_ a Platform?

<div class="flex flex-row justify-between w-full h-4/5 my-auto items-center">
  <v-switch at="1" tag="h3">
    <template #1> Some product I buy off the shelf? </template>
    <template #2> Some fever dream I built myself? </template>
    <template #3> This? </template>
  </v-switch>
  <v-switch at="1">
    <template #1> <img class="h-96" src="./public/idps.png" alt="commercial IDPs" /> </template>
    <template #2> <img class="h-96 ml-8" src="./public/cncfmeme.png" alt="the CNCF landscape meme" /> </template>
    <template #3> <img class="h-96" src="./public/links.png" alt="a collection of links" /> </template>
  </v-switch>
</div>

---
layout: default
transition: slide-up
---

# So What _is_ a Platform?

<div class="flex flex-col justify-around w-full h-9/10 items-center">
    <div class="flex flex-row justify-between w-full">
      <img class="w-64" src="./public/idps.png" alt="commercial IDPs" />
      <img class="w-64" src="./public/cncfmeme.png" alt="the CNCF landscape meme" />
      <img class="w-64" src="./public/links.png" alt="a collection of links" />
    </div>
    <h1>Any of these!</h1>
</div>

---
layout: quote
transition: slide-left
---

# A platform [...] is an <span v-mark="{ at: 1, color: '#ff00ff', type: 'highlight'}">integrated collection</span> of <span v-mark="{ at: 1, color: '#ff00ff', type: 'highlight'}">capabilities</span> defined and presented according to the <span v-mark="{ at: 2, color: '#ff00ff', type: 'highlight'}">needs</span> of the <span v-mark="{ at: 2, color: '#ff00ff', type: 'highlight'}">platform's users.</span>

\- CNCF Platforms White Paper <sup>[2](https://tag-app-delivery.cncf.io/whitepapers/platforms/#what-is-a-platform)</sup>

---
layout: default
transition: slide-up
---

# In Other Words...

<h3>Platforms need to...</h3>

<v-clicks class="mt-8">
  
  - ...help solve **common challenges**...
  - ...provide **golden paths** for processes...
  - ...establish a **consistent look and feel** for multiple technologies...
  - ...cater to a **variety** of autonomous teams...

</v-clicks>

<h3 class="mt-8" v-click>...throughout your engineering organization <span v-mark="{ at: 5, color: '#ff00ff', type: 'highlight'}">as a whole!</span></h3>

---
layout: section
transition: slide-left
---

# But Why Would You Want a Platform?

---
layout: default
clicks: 2
transition: slide-left
---

# Remember DevOps?

<div class="h-3/4 flex flex-col justify-end items-center">
  <v-switch>
    <template #1> <img class="mx-auto w-200" alt="Dev/QA/Ops with walls of confusion between them" src="./public/devops.png" /> </template>
    <template #2> <img class="mx-auto w-200" alt="Dev/QA/Ops with walls torn down" src="./public/devops-new.png" /> </template>
  </v-switch>
</div>

---
layout: default
clicks: 2
transition: slide-left
---

# Platform Engineering Is Similar!

<div class="h-3/4 flex flex-col justify-center items-center">
  <v-switch>
    <template #1> <img class="mx-auto w-200" alt="Multiple teams, each with their own tools" src="./public/platformeng.png" /> </template>
    <template #2> <img class="mx-auto pb-12 pt-12 h-100" alt="Multiple teams with shared tooling on a platform" src="./public/platformeng-new.png" /> </template>
  </v-switch>
</div>

---
layout: default
transition: slide-up
---

# Platforms Can Help Your Engineering Teams

- <h3>Improved productivity and efficiency</h3><p>through curated self-service(s)</p>
- <h3>Reduced operational overhead</h3><p>through centralized infrastructure capabilities</p>
- <h3>Faster TTM for products, features, and patches</h3><p>through streamlined procedures</p>
- <h3>Consistency and standards across your organization</h3><p>through consistent look and feel on the platform</p>

<style>
  p {
    @apply pl-4;
  }
</style>

---
layout: section
transition: slide-up
---

# So How Do I Build A Platform?

---
layout: image
transition: slide-up
image: /landscape.png
---

---
layout: quote
transition: slide-up
---

# Internal Developer Platforms are a strategic commitment. Share learnings & build in the open.

\- from the CNOE project's website <sup><a href="https://cnoe.io">3</a></sup>

---
layout: quote
transition: slide-left
---

# Don't Reinvent When You Can Reuse and Adapt

[@horovits](https://x.com/horovits), KCD Munich 2024

---
layout: default
transition: slide-left
---

# CNOE (Cloud Native Operational Excellence)

<div class="flex h-4/5 my-auto flex-row justify-between items-center">

  <div>

### A framework for bringing together enterprises to...

  <br />
  
  - ...navigate their operational technology decisions
  - ...de-risk their tooling bets
  - ...coordinate contributions
  - ...offer guidance on available technologies
  </div>
  <img class="w-100" src="./public/cnoe-logo.png" alt="the CNOE logo"/>
</div>

---
layout: two-cols
transition: slide-up
---

# CNOE Tenets

<div class="h-4/5 flex flex-col pt-8">
  <v-switch>
  <template #1>

## 1 - Open Source First

_Open Source technologies are prioritized over proprietary technologies to allow alignment and coordination of contributions from many different participants._

  </template>
  <template #2>

## 2 - Community Driven

_Decisions on technologies, level of commitment and contributions are driven by the community and its governing body._

  </template>
  <template #3>

## 3 - Tools and not Practices

_The CNOE project offers suggestions on which tooling and configurations to use, not which practices to build._

  </template>
  <template #4>

## 4 - Powered by, but not Limited to Kubernetes

_CNOE tooling builds on top of Kubernetes and CNCF technologies while providing solutions to target virtually any compute platform._

  </template>
  <template #5>

## 5 - Standardized Infrastructure, Customizable by Users

_CNOE tries to ensure best possible usability to its stakeholders by allowing customizations and reducing complexity of integrated tooling._

  </template>

<template #6>

## 6 - Built to be Shared

_All CNOE development, e.g. its reference architecture and deployable packages, are developed out in the open and made available for anyone to use._

  </template>
  </v-switch>
</div>

<p class="text-size-sm text-gray">summarized, from the CNOE project page <sup><a href=https://cnoe.io/docs/intro#tenets>4</a></sup></p>

<style>
  h2 {
    background: var(--header-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent
  }
</style>

---
layout: section
transition: slide-left
---

# idpbuilder CLI

---
layout: image-right
image: idpbuilder-github.png
transition: slide-left
---

# idpbuilder CLI

A command line tool for...

- ...bootstrapping...
- ...extending...
- ...developing...

...internal developer portals

<style>
  h1 {
    margin-bottom: 3rem;
  }
</style>

---
layout: default
transition: slide-up
---

# idpbuilder - Core Packages

<div class="flex flex-row justify-around w-full h-4/5 my-auto items-center">
  <v-switch at="1">
    <template #1> <h3>ArgoCD</h3> Cloud-Native GitOps Engine </template>
    <template #2> <h3>Gitea</h3> Lightweight SCM </template>
    <template #3> <h3>Backstage</h3> Service Catalog & IDP Framework </template>
    <template #4> <h3>Crossplane</h3> Cloud-Native Controlplane Framework </template>
    <template #5> <h3>Keycloak</h3> Cloud-Native IAM Platform </template>
    <template #6> <h3>External Secrets Operator</h3> External Secret Management for Kubernetes </template>
  </v-switch>
  <v-switch at="1">
    <template #1> <img class="h-96" src="./public/argocd.png" alt="ArgoCD logo" /> </template>
    <template #2> <img class="h-96 ml-8" src="./public/gitea.svg" alt="Gitea logo" /> </template>
    <template #3> <img class="h-96" src="./public/backstage.svg" alt="Backstage logo" /> </template>
    <template #4> <img class="h-96" src="./public/crossplane.png" alt="Crossplane logo" /> </template>
    <template #5> <img class="h-64" src="./public/keycloak.png" alt="Keycloak logo" /> </template>
    <template #6> <img class="h-96" src="./public/eso.svg" alt="ExternalSecretsOperator logo" /> </template>
  </v-switch>
</div>

---
layout: section
transition: slide-left
---

# Demo

---
layout: section
transition: slide-left
---

# Summing It Up...

---
layout: default
transition: slide-left
---

# Summing It Up...

<div class="flex flex-col justify-center h-4/5">

- ...**platforms can enable** standardized, streamlined processes throughout your engineering organization
- ...**building platforms is about empathy** with your team(s) and strategic decisions regarding integrated technologies
- ...**the CNOE project defines and promotes** feasible, proven standard tooling for building customizable platforms
- ...**idpbuilder can help** by bootstrapping portable, demo-able, and customizable platforms

</div>

---
layout: default
---

# Thank you

for your time and interest!

<div class="flex flex-col justify-center h-4/5">

<div>

Learn more here:

- [CNCF Platforms White Paper](https://tag-app-delivery.cncf.io/whitepapers/platforms/)
- [CNOE Project](https://cnoe.io)
- [idpbuilder GitHub repository](https://github.com/cnoe-io/idpbuilder)
- [idpbuilder Reference Implementation](https://github.com/cnoe-io/idpbuilder/tree/main/examples/ref-implementation)
</div>

<div class="gap-2">

\[slides.dbodky.me/kcd-munich-2024\]

</div>
</div>
