<script setup lang="ts">
// dates are given as 'YYYY-MM'
const props = withDefaults(
  defineProps<{
    entries: { date: string; label: string }[]
    // number of entries to uncover, starting from the top; defaults to all
    visible?: number
  }>(),
  { visible: Infinity },
)

const formatDate = (date: string) =>
  new Date(`${date}-01`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
</script>

<template>
  <div class="timeline" :style="{ gridTemplateRows: `repeat(${entries.length}, 1fr)` }">
    <div class="timeline-line" :style="{ top: `${50 / entries.length}%`, bottom: `${50 / entries.length}%` }" />
    <div
      v-for="(entry, i) in entries"
      :key="`${entry.date}-${entry.label}`"
      class="timeline-entry"
      :class="{ 'timeline-entry-hidden': i >= props.visible }"
    >
      <div class="timeline-date">{{ formatDate(entry.date) }}</div>
      <div class="timeline-marker">
        <div class="timeline-dot" />
      </div>
      <div class="timeline-label">{{ entry.label }}</div>
    </div>
  </div>
</template>

<style scoped>
/* all rows always take up their space, so entries never move when more are uncovered */
.timeline {
  position: relative;
  display: grid;
  height: 100%;
  width: fit-content;
  margin: 0 auto;
}

.timeline-entry {
  display: grid;
  grid-template-columns: 9rem 2rem auto;
  column-gap: 1.5rem;
  align-items: center;
}

.timeline-entry-hidden {
  visibility: hidden;
}

.timeline-date {
  text-align: right;
  font-family: var(--font-heading);
  font-size: 1.6rem;
  color: var(--color-primary);
}

.timeline-marker {
  position: relative;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* one line spanning the whole timeline, so it is always fully shown and never overlaps a dot;
   it sits in the centre of the marker column (date column + gap + half the marker column) */
.timeline-line {
  position: absolute;
  left: calc(9rem + 1.5rem + 1rem - 3px);
  width: 6px;
  background: var(--color-foreground);
}

.timeline-dot {
  position: relative;
  z-index: 1;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 0 5px var(--color-background);
}

.timeline-label {
  max-width: 28rem;
  padding: 0.5rem 1rem;
  border-radius: 14px;
  background: var(--color-accent);
  color: #fff;
  box-shadow: 0 4px 0 #004f87;
}
</style>
