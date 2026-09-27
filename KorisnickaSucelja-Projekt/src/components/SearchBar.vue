<script setup lang="ts">
import { formatCategory } from '../utils/format'

defineProps<{
  query: string
  category: string
  categories: string[]
}>()

const emit = defineEmits<{
  'update-query': [query: string]
  'update-category': [category: string]
}>()

function onQueryInput(event: Event) {
  emit('update-query', (event.target as HTMLInputElement).value)
}

function onCategoryChange(event: Event) {
  emit('update-category', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <form class="flex w-full flex-col gap-3 sm:flex-row" @submit.prevent>
    <label class="relative min-w-0 flex-1">
      <span class="sr-only">Pretraga proizvoda</span>
      <svg
        class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" stroke-linecap="round" />
      </svg>
      <input
        :value="query"
        type="search"
        placeholder="Pretraži po nazivu..."
        class="w-full rounded-full border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-ink outline-none ring-clay/30 placeholder:text-stone-400 focus:border-clay focus:ring-2"
        @input="onQueryInput"
      />
    </label>

    <label class="sm:w-56">
      <span class="sr-only">Kategorija</span>
      <select
        :value="category"
        class="w-full rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm text-ink outline-none ring-clay/30 focus:border-clay focus:ring-2"
        @change="onCategoryChange"
      >
        <option value="">Sve kategorije</option>
        <option v-for="item in categories" :key="item" :value="item">
          {{ formatCategory(item) }}
        </option>
      </select>
    </label>
  </form>
</template>
