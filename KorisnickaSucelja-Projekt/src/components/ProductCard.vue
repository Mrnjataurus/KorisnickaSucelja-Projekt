<script setup lang="ts">
import type { Product } from '../types/product'
import { formatCategory, formatPrice, formatRating } from '../utils/format'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  'select-product': [product: Product]
}>()

function stockLabel(product: Product) {
  if (product.availabilityStatus === 'Low Stock' || product.stock < 10) return 'Mala zaliha'
  if (product.stock <= 0) return 'Nema na zalihi'
  return 'Na zalihi'
}
</script>

<template>
  <article class="h-full">
    <button
      type="button"
      class="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
      @click="emit('select-product', product)"
    >
      <div class="relative aspect-square overflow-hidden bg-stone-100">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          loading="lazy"
        />
      </div>

      <div class="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div class="flex items-center justify-between gap-3 text-xs">
          <span class="flex min-w-0 items-center gap-2">
            <span class="rounded-full bg-stone-100 px-2.5 py-1 font-medium text-stone-600">
              {{ formatCategory(product.category) }}
            </span>
            <span
              v-if="product.discountPercentage > 0"
              class="rounded-full bg-clay px-2 py-1 font-semibold text-white"
            >
              -{{ Math.round(product.discountPercentage) }}%
            </span>
          </span>
          <span class="text-amber-600" :aria-label="`Ocjena ${formatRating(product.rating)} od 5`">
            ★ {{ formatRating(product.rating) }}
          </span>
        </div>

        <h2 class="line-clamp-2 font-display text-lg leading-snug text-ink">
          {{ product.title }}
        </h2>
        <p v-if="product.brand" class="text-sm text-stone-500">{{ product.brand }}</p>

        <div class="mt-auto flex items-end justify-between gap-3 pt-2">
          <p class="font-semibold text-clay">{{ formatPrice(product.price) }}</p>
          <p
            class="text-xs font-medium"
            :class="product.stock < 10 ? 'text-amber-700' : 'text-moss'"
          >
            {{ stockLabel(product) }}
          </p>
        </div>
      </div>
    </button>
  </article>
</template>
