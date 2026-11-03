---
theme: "@netways-managed-services/slidev-theme-nws"
title: Vom Policy-Enforcement zum Minecraft-Server
info: Kubernetes als "Promise-Engine"
date: 2026-11-04
event: S2N 2026
location: Berlin, Germany
tags: ["Kubernetes", "Grafana", "Prometheus", "Kyverno"]
---

# Vom Policy-Enforcement zum Minecraft-Server

## Kubernetes als "Promise-Engine"

<p>4. November 2026<br/>S2N - Storage Server Network</p>

---
layout: image
image: ./letsplay.png
---

---
layout: two-cols
---

# Über mich

::left::

- Senior Platform Advocate bei **NETWAYS Web Services**, einem souveränen deutschen MSP
- Ich arbeite hauptsächlich mit...
  - Kubernetes
  - Observability
  - GitOps
- Meetup-Organisator und Open Source Contributor

::right::

<div class="h-full flex flex-col justify-center">
  <img src="./public/daniel-bodky.jpg" alt="Headshot of Daniel Bodky" class="w-64 rounded-full m-x-auto "/>
</div>

---
layout: section
---

# Warum ist Kubernetes so beliebt?

---

# Kubernetes im Überblick

## Eine glorifizierte While-Schleife

- Von Google entwickelt und vor 11 Jahren veröffentlicht
- Projekt zur Orchestrierung von Containern
- Arbeitet _deklarativ_ und mit _Eventual Consistency_:
  1. Definition des _gewünschten_ Zustands in YAML oder JSON
  2. Speichern der Definition in _etcd_
  3. Auslesen der Definition durch Kubernetes-Komponenten
  4. Abbildung des Zustands im Cluster
- Bringt Bordmittel zur Selbstheilung und Skalierung mit

---

# Kubernetes als "Promise Engine"

## Arbeiten mit Versprechen

Selbstheilung, Skalierung und deklarative Konfiguration haben zahlreiche _Cloud Native_ Praktiken geprägt:

- GitOps
- Zustandslose Anwendungen
- ["12-Factor Apps"](https://12factor.net/)
- "Scale to Zero"

Anwender bekommen von Kubernetes nur ein Versprechen, dass _versucht_ wird, den gewünschten Zustand zu erreichen.

Mit **Controllern** und **Operatoren** lässt sich diese Arbeitsweise (fast) beliebig erweitern.

---
layout: section
---

# Was ist ein Controller?

---

# Controller im Überblick

## Kubernetes' integrierte While-Schleifen

- Controller laufen in Dauerschleife:
  - _Was ist der Ist-Zustand?_
  - _Was ist der Wunschzustand?_
  - _Was kann ich tun, um den Wunschzustand dem Ist-Zustand anzugleichen?_
- Kubernetes bringt zahlreiche Controller von Haus aus mit:
  - `kube-controller-manager` für `Deployments`, `StatefulSets`, `Jobs`, etc.
  - `cloud-controller-manager` für Loadbalancer, Nodes, etc. in der Cloud
  - **~40 Controller** in einem üblichen Kubernetes-Cluster

---

# Wie Controller arbeiten

## Skalierung eines Deployments

<DeploymentReconcile/>

---
layout: section
---

# Und was ist ein Operator?

---

# Operatoren im Überblick

## Controller für Prozesse über Kubernetes hinaus

Controller bilden _clusterinterne_ Abläufe ab.<br/>Operatoren bilden _anwendunsspezifische Prozesse_  ab:

- Konfiguration und Upgrades von Anwendungen
- Provisionierung von (Cloud-)Ressourcen
- Erstellung und Sicherung von Backups

<br/>

<span v-click class="text-2xl" style="color: #1EFBD0; font-weight: 700;">Operator = Controller + eigene Abläufe</span>

---

# Operatoren in der Kubernetes-Landschaft

## Was gibt es bereits?

Über die Jahre haben sich viele beliebte Operatoren in der Kubernetes-Landschaft etabliert:

- [cert-manager](https://cert-manager.io) provisioniert und rotiert Zertifikate
- [external-dns](https://kubernetes-sigs.github.io/external-dns/latest/) verwaltet DNS-Einträge
- [Rook](https://rook.io) provisioniert und managt Ceph-Cluster
- [CNPG](https://cloudnative-pg.io) provisioniert und managt PostgreSQL-Setups
- [velero](https://velero.io) erstellt und verwaltet Backups
- [Crossplane](https://crossplane.io) provisioniert Infrastruktur uvm. bei mehr als 150 Providern

---

# Operatoren in der Kubernetes-Landschaft

## Heute im Fokus

Diese Operatoren schauen wir uns heute an:

- [grafana-operator](https://grafana.github.io/grafana-operator/docs/) provisioniert und managt Grafana-Setups
- [prometheus-operator](https://prometheus-operator.dev/) provisioniert und managt Prometheus-Setups
- [Kyverno](https://kyverno.io) erweitert die Kubernetes API mit _Policy as Code_
- ein Demo-Operator für Minecraft-Server

---

# Wie arbeiten Operatoren?

## ...und wie wissen sie, was zu tun ist?

Operatoren arbeiten auf die gleiche Weise wie Controller:

- Auslesen von Ist-/Soll-Zustand aus der Kubernetes-API
- Reconciliation der Objekte (optional inkl. Interaktion mit anderen Kubernetes-Ressourcen)
- Schreiben der Änderungen und des Status

<v-click>

Hinzu kommen oft Interaktionen mit Drittsystemen:

- Datenbanken
- Anwendungen
- APIs

</v-click>

<span class="text-2xl" style="font-weight: 700;" v-click>Aber _was_ lesen Operatoren aus der Kubernetes-API aus?</span>

---
layout: section
---

# Custom Resource Definitions

## Erweiterungen der Kubernetes-API

---

# Die Kubernetes-API

## OpenAPI-konform und erweiterbar

- Jede Interaktion mit Kubernetes läuft über die Kubernetes-API
- Jede Anfrage an die API durchläuft vier Phasen:
  1. Authentifizierung
  2. Authorisierung
  3. Admission
  4. Persistierung
- Die Kubernetes-API kann durch _CustomResourceDefinitions_ (CRDs) erweitert werden.<br/>Für jede CRD erstellt der API-Server neue _RESTful resource paths_.
- CRDs ermöglichen die Darstellung beliebiger Ressourcen innerhalb von Kubernetes (inkl. Interaktion via `kubectl` oder anderen Controllern und Operatoren)

---
layout: two-cols
---

# CustomResourceDefinitions als Rezepte

## Wie sind sie aufgebaut?

::left::

Jede CRD besteht aus folgenden Abschnitten:

<ul>
<li v-click="1">Name der API-Gruppe</li>
<li v-click="2">Scope (Namespace oder Cluster)</li>
<li v-click="3">Name(n) (Ein-/Mehrzahl, _Kind_, Abkürzungen)</li>
<li v-click="4">Von der API angebotene Version(en)<br/>inklusive ihrer OpenAPI-Spezifikation</li>
</ul>

::right::

```yaml {none|4|16|17-20|7-15}
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: minecraftservers.minecraft.dbodky.me
spec:
  group: minecraft.dbodky.me
  versions:
    - name: v1
      schema:
        openAPIV3Schema:
          # ...
    - name: v1alpha1
      schema:
        openAPIV3Schema:
          # ...
  scope: Namespaced
  names:
    plural: minecraftservers
    singular: minecraftserver
    kind: MinecraftServer
```

<style>
  .slidev-code-wrapper {
    margin-top: -20px !important;
  }
</style>

---
layout: two-cols
---

# CustomResourceDefinitions als Rezepte

## Wie werden sie in Kubernetes verwendet?

::left::

### In der Kubernetes-API

- _Definition_ durch CRDs
- _Erstellung_ durch _CustomResources_ (CRs)
- _Darstellung_ über die API

::right::

### Im Operator

- Auslesen der CRs aus der API
- Abgleich von Status und Spezifikation
- Interaktion mit den eigentlichen Systemen, APIs, Kubernetes, etc.
- Schreiben des neuen Status

---

# Das bedeutet...

## Operatoren _ohne CRDs_ sind selten, aber existieren.

Die meisten Operatoren stellen aus mehreren Gründen CRDs bereit:

- **Abstraktion**: Entkopplung von Implementierung und Umgebung
- **Validierung**: Die Kubernetes-API kann CRDs zum Zeitpunkt der Erstellung validieren und ungültige Konfiguration verhindern
- **Deklarativ vs. Imperativ**: CRDs dienen als deklarative "Wrapper" für imperative Vorgänge (z.B. Backups)
- **Kompatibilität**: CRDs können von beliebigen API-Clients genutzt werden - auch von anderen Controllern und Operatoren

---

# Weitere Use-Cases für Operatoren

## Nicht jeder Operator betreibt Anwendungen im Cluster:

- Crossplane verwaltet externe Infrastruktur bei Hyperscalern oder in SaaS-Produkten
- cert-manager stellt TLS-Zertifikate als Kubernetes-Secrets bereit
- external-secrets-operator spielt Secrets ins Cluster ein
- Kyverno erweitert die Admission der Kubernetes-API

<br/>
<br/>

<span v-click class="text-xl" style="color: #1EFBD0; font-weight: 700;">In vielen Clustern arbeiten Operatoren im Hintergrund oder<br/>werden von _anderen_ Operatoren vorausgesetzt</span>

---

# Zusammengefasst...

## Was Ihr aus diesem Vortrag mitnehmen könnt

- Kubernetes setzt von Haus aus auf mehr als 40 Controller
- _Controller_ betrachten und reconcilen Kubernetes-Objekte (Deployments, Services, Jobs, etc.)
- _Operatoren_ nutzen _Controller_ und _CRDs_, um Ressourcen zu verwalten, die _nicht_ Bestandteil von Kubernetes sind
- Operatoren bauen oft auf Kubernetes-Objekten auf, um definierte Zustände zu realisieren
- Operatoren können auf externe Systeme einwirken und mit ihnen interagieren

---
layout: two-cols
---

# BONUS: Operatoren selbst entwickeln

## Welche Möglichkeiten gibt es?

::left::

### Low-Level

Eigene Implementierung der benötigten Funktionen, z.B. auf Basis von `k8s.io-client-go` in Golang:

1. CRD-Definition
2. Client inkl. Authentifizierung
3. List + Watch der relevanten Objekte
4. Caching und Workqueue
5. Reconciliation
6. Hochverfügbarkeit, Events, und Observability

::right::

### High-Level

Bestehende Frameworks und SDKs nehmen einem Entwicklungsaufwand ab (Controller-Registrierung, CRD-Definition, Testing, etc.):

- [kubebuilder](https://github.com/kubernetes-sigs/kubebuilder) (Golang)
- [kube.rs](https://kube.rs/) (Rust)
- [kopf](https://kopf.dev/) (Python)

---

# Danke für eure Aufmerksamkeit

## Offene Fragen? Jetzt stellen! 😉

<br/>

<br/>

- **Slides**: [slides.dbodky.me/s2n-berlin-2026](https://slides.dbodky.me/s2n-berlin-2026)
- **Doku**: [Kubernetes Operator Pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)
- **Hintergrund**: [CNCF Operator White Paper](https://tag-app-delivery.cncf.io/whitepapers/operator/)
- **Lesestoff**: [Kubebuilder Buch](https://kubebuilder.io/introduction.html)

<br/>

<br/>

<fa6-brands-linkedin/> [linkedin.com/in/daniel-bodky](https://linkedin.com/in/daniel-bodky)<br/>
<fa6-brands-square-bluesky/> [@dbodky.me](https://linkedin.com/in/daniel-bodky)
