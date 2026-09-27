<script setup lang="ts">
import { formatPrice } from '../utils/format'

defineProps<{
  total: number
  averagePrice: number
}>()
</script>

<template>
  <section class="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Statistika proizvoda">
    <article class="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
      <p class="text-sm text-stone-500">Ukupno proizvoda</p>
      <p class="mt-2 font-display text-4xl tracking-tight">{{ total }}</p>
      <p class="mt-2 text-xs text-stone-400">U trenutnoj pretrazi i kategoriji</p>
    </article>
    <article class="rounded-3xl bg-ink p-5 text-paper shadow-sm">
      <p class="text-sm text-stone-300">Prosječna cijena</p>
      <p class="mt-2 font-display text-4xl tracking-tight">
        {{ total === 0 ? '—' : formatPrice(averagePrice) }}
      </p>
      <p class="mt-2 text-xs text-stone-300">Aritmetička sredina prikazanih cijena</p>
    </article>
  </section>
</template>
