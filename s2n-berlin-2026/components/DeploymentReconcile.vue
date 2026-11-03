<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// Click-driven walkthrough of a Deployment's reconciliation.
// Usage in slides.md:  <DeploymentReconcile />
// Each click advances one step; elements appear once reached, the current one is highlighted.

type Node = { id: string; x: number; y: number; w: number; h: number; title: string; sub: string; kind: 'ctrl' | 'comp'; step: number }
type Edge = { id: string; d: string; step: number; dashed?: boolean; label?: { x: number; y: number; text: string; anchor?: string } }

const nodes: Node[] = [
  { id: 'api', x: 355, y: 33, w: 558, h: 112, title: 'kube-apiserver', sub: 'Deployments, ReplicaSets, Pods', kind: 'comp', step: 0 },
  { id: 'observe', x: 53, y: 253, w: 260, h: 110, title: 'Observe', sub: 'Informer-Cache', kind: 'ctrl', step: 2 },
  { id: 'enqueue', x: 353, y: 253, w: 260, h: 110, title: 'Enqueue', sub: 'Key: ns/name', kind: 'ctrl', step: 3 },
  { id: 'reconcile', x: 653, y: 253, w: 260, h: 110, title: 'Reconcile', sub: 'Spec vs. Status', kind: 'ctrl', step: 4 },
  { id: 'act', x: 953, y: 253, w: 260, h: 110, title: 'Act', sub: 'Schreiben via API', kind: 'ctrl', step: 6 },
  { id: 'deploy', x: 63, y: 593, w: 250, h: 110, title: 'Deployment', sub: 'Erzeugt RS', kind: 'ctrl', step: 7 },
  { id: 'rs', x: 363, y: 593, w: 250, h: 110, title: 'ReplicaSet', sub: 'Erzeugt Pods', kind: 'ctrl', step: 7 },
  { id: 'sched', x: 693, y: 593, w: 250, h: 110, title: 'Scheduler', sub: 'Bindet Pods', kind: 'comp', step: 8 },
  { id: 'kubelet', x: 993, y: 593, w: 250, h: 110, title: 'kubelet', sub: 'Startet Pods', kind: 'comp', step: 9 },
]

const edges: Edge[] = [
  { id: 'watch', d: 'M355 89 H183 V248', step: 2, label: { x: 200, y: 182, text: 'Watch-Events' } },
  { id: 'o-e', d: 'M313 308 H351', step: 3 },
  { id: 'e-r', d: 'M613 308 H651', step: 4 },
  { id: 'requeue', d: 'M783 365 V415 H483 V367', step: 5, dashed: true, label: { x: 633, y: 452, text: 'Requeue bei Fehler', anchor: 'middle' } },
  { id: 'r-a', d: 'M913 308 H951', step: 6 },
  { id: 'create', d: 'M1083 253 V89 H917', step: 6, label: { x: 1067, y: 182, text: 'RS erstellen / skalieren', anchor: 'end' } },
  { id: 'd-rs', d: 'M313 648 H361', step: 7 },
  { id: 'rs-s', d: 'M613 648 H691', step: 8 },
  { id: 's-k', d: 'M943 648 H991', step: 9 },
]

const captions = [
  'Der API-Server verwaltet den definierten Zustand des gesamten Clusters.',
  'Ein Deployment wird von 3 auf 5 Repliken skaliert. Der API-Server akzeptiert die Anfrage.',
  'Observe: Der Controller erhält das Watch-Event und aktualisiert seinen Informer-Cache.',
  'Enqueue: Der Objektschlüssel aus Namespace/Name landet in der Workqueue.',
  'Reconcile: Der gewünschte Zustand (Spec) wird mit dem Ist-Zustand (Status) verglichen.',
  'Schlägt etwas fehl, wird der Key erneut eingereiht.',
  'Act: Der Controller schreibt die Differenz über die API, hier ein neues bzw. skaliertes ReplicaSet.',
  'Im kube-controller-manager erzeugt das Deployment ein ReplicaSet, das ReplicaSet die Pods.',
  'Der kube-scheduler weist jedem neuen Pod einen Node zu.',
  'Der kubelet auf dem Node startet den Pod. Ist-Zustand = Soll-Zustand.',
]
const LAST = captions.length - 1

const { $clicks } = useSlideContext()
const step = computed(() => Math.min(Math.max($clicks.value ?? 0, 0), LAST))

const visible = (s: number) => step.value >= s
const active = (n: Node) => step.value === n.step || (n.id === 'api' && [1, 6].includes(step.value))
const activeEdge = (e: Edge) => step.value === e.step
</script>

<template>
  <div class="reconcile">
    <!-- Registers the total click count with Slidev (absolute v-click on an empty element). -->
    <div v-click="LAST" class="absolute" />

    <svg viewBox="0 0 1300 770" role="img" aria-label="Reconciliation eines Deployments in Kubernetes">
      <defs>
        <marker id="rc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0 1 L9 5 L0 9" fill="none" stroke="context-stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </marker>
      </defs>

      <!-- groups -->
      <g class="group" :class="{ on: visible(2) }">
        <rect x="33" y="200" width="1240" height="275" rx="14" />
        <text x="1245" y="448" text-anchor="end">Deployment-Controller</text>
      </g>
      <g class="group" :class="{ on: visible(7) }">
        <rect x="33" y="533" width="610" height="200" rx="14" />
        <text x="63" y="568">kube-controller-manager</text>
      </g>

      <!-- edges -->
      <g v-for="e in edges" :key="e.id" class="edge" :class="{ on: visible(e.step), active: activeEdge(e), dashed: e.dashed }">
        <path :d="e.d" marker-end="url(#rc-arrow)" />
        <text v-if="e.label" :x="e.label.x" :y="e.label.y" :text-anchor="e.label.anchor ?? 'start'">{{ e.label.text }}</text>
      </g>

      <!-- nodes -->
      <g v-for="n in nodes" :key="n.id" class="node" :class="[n.kind, { on: visible(n.step), active: active(n) }]">
        <rect :x="n.x" :y="n.y" :width="n.w" :height="n.h" rx="10" />
        <text class="title" :x="n.x + n.w / 2" :y="n.y + n.h / 2 - 4" text-anchor="middle">{{ n.title }}</text>
        <text class="sub" :x="n.x + n.w / 2" :y="n.y + n.h / 2 + 34" text-anchor="middle">{{ n.sub }}</text>
      </g>
    </svg>

    <Transition name="cap" mode="out-in">
      <p :key="step" class="caption">
        <span class="num">{{ step + 1 }}/{{ captions.length }}</span>{{ captions[step] }}
      </p>
    </Transition>
  </div>
</template>

<style scoped>
.reconcile {
  --rc-brand: #1efbd0;
  --rc-on-brand: #04312a;
  --rc-ctrl-fill: #e3fff9;
  --rc-ctrl-stroke: #0b9c80;
  --rc-ctrl-text: #05473b;
  --rc-comp-fill: #f1f4f4;
  --rc-comp-stroke: #6b7776;
  --rc-comp-text: #2f3a39;
  --rc-line: #8a9594;
  --rc-active: #0b9c80;
  --rc-text: #4a5654;
  width: 60%;
  @apply m-x-auto;
  margin-top: -24px;
}
.dark .reconcile {
  --rc-ctrl-fill: #0c3b34;
  --rc-ctrl-stroke: #1efbd0;
  --rc-ctrl-text: #c9fff3;
  --rc-comp-fill: #26302f;
  --rc-comp-stroke: #9aa8a6;
  --rc-comp-text: #e8f0ef;
  --rc-line: #9aa8a6;
  --rc-active: #1efbd0;
  --rc-text: #c4cfcd;
}

svg { width: 100%; height: auto; max-height: 440px; display: block; }
text { font-family: inherit; fill: var(--rc-text); font-size: 26px; }

/* everything not yet reached stays hidden, reached elements fade in */
.node, .edge, .group { opacity: 0; transition: opacity 0.4s ease; }
.node.on, .edge.on, .group.on { opacity: 1; }

.group rect { fill: none; stroke: var(--rc-line); stroke-width: 1.5; stroke-dasharray: 8 6; opacity: 0.6; }
.group text { font-size: 26px; }

.node rect { stroke-width: 2.5; transition: stroke 0.3s, stroke-width 0.3s, filter 0.3s; }
.node.ctrl rect { fill: var(--rc-ctrl-fill); stroke: var(--rc-ctrl-stroke); }
.node.comp rect { fill: var(--rc-comp-fill); stroke: var(--rc-comp-stroke); }
.node .title { font-size: 34px; font-weight: 600; }
.node .sub { font-size: 28px; }
.node.ctrl text.title, .node.ctrl text.sub { fill: var(--rc-ctrl-text); }
.node.comp text.title, .node.comp text.sub { fill: var(--rc-comp-text); }
.node.active text { fill: var(--rc-on-brand) !important; }
.node.active rect { fill: var(--rc-brand); stroke: var(--rc-ctrl-stroke); stroke-width: 5; filter: drop-shadow(0 0 14px color-mix(in srgb, var(--rc-brand) 70%, transparent)); animation: rc-pulse 1.4s ease-in-out infinite; }

.edge path { fill: none; stroke: var(--rc-line); stroke-width: 3; transition: stroke 0.3s; }
.edge.dashed path { stroke-dasharray: 9 7; }
.edge text { font-size: 26px; }
.edge.active path { stroke: var(--rc-active); stroke-width: 4; stroke-dasharray: 14 10; animation: rc-flow 0.8s linear infinite; }
.edge.active text { fill: var(--rc-active); }

.caption {
  margin: 0.6rem 0 0;
  min-height: 3.2em;
  font-size: 1.05rem;
  line-height: 1.5;
  text-align: center;
}
.caption .num {
  display: inline-block;
  margin-right: 0.7em;
  padding: 0 0.5em;
  border-radius: 999px;
  font-size: 0.8em;
  font-weight: 600;
  color: var(--rc-on-brand);
  background: var(--rc-brand);
}
.cap-enter-active, .cap-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.cap-enter-from { opacity: 0; transform: translateY(6px); }
.cap-leave-to { opacity: 0; }

@keyframes rc-flow { to { stroke-dashoffset: -24; } }
@keyframes rc-pulse { 50% { stroke-width: 3.5; } }

@media (prefers-reduced-motion: reduce) {
  .edge.active path, .node.active rect { animation: none; }
}
</style>
