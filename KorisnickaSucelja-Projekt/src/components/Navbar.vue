<script setup lang="ts">
import SearchBar from './SearchBar.vue'

defineProps<{
  query: string
  category: string
  categories: string[]
}>()

const emit = defineEmits<{
  'update-query': [query: string]
  'update-category': [category: string]
}>()
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-stone-200/80 bg-paper/90 backdrop-blur">
    <div
      class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"
    >
      <button
        type="button"
        class="flex items-center gap-3 text-left"
        @click="emit('update-query', ''); emit('update-category', '')"
      >
        <span
          class="grid h-11 w-11 place-items-center rounded-2xl bg-clay text-white shadow-sm"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 9h16M6 9v9h12V9" stroke-linejoin="round" />
            <path d="M9 9V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V9" />
          </svg>
        </span>
        <span>
          <span class="block font-display text-2xl leading-none tracking-tight">Polica</span>
          <span class="mt-1 block text-xs uppercase tracking-[0.16em] text-stone-500">Katalog proizvoda</span>
        </span>
      </button>

      <SearchBar
        class="lg:max-w-2xl"
        :query="query"
        :category="category"
        :categories="categories"
        @update-query="emit('update-query', $event)"
        @update-category="emit('update-category', $event)"
      />
    </div>
  </header>
</template>
