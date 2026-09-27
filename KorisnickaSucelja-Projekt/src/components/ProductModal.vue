<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { Product } from '../types/product'
import { formatCategory, formatPrice, formatRating } from '../utils/format'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  close: []
}>()

const activeImage = ref(props.product.images[0] ?? props.product.thumbnail)
const closeButton = ref<HTMLButtonElement | null>(null)

watch(
  () => props.product.id,
  () => {
    activeImage.value = props.product.images[0] ?? props.product.thumbnail
  },
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
  closeButton.value?.focus()
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
    <button
      type="button"
      class="absolute inset-0 bg-ink/50"
      aria-label="Zatvori detalje"
      @click="emit('close')"
    />

    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-dialog-title"
      class="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-xl sm:max-w-4xl sm:rounded-3xl"
    >
      <div class="flex items-center justify-between border-b border-stone-100 px-4 py-3 sm:px-6">
        <p class="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">Detalji proizvoda</p>
        <button
          ref="closeButton"
          type="button"
          class="rounded-full px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100"
          @click="emit('close')"
        >
          Zatvori
        </button>
      </div>

      <div class="grid overflow-y-auto md:grid-cols-2">
        <div class="bg-stone-100 p-4 sm:p-6">
          <img
            :src="activeImage"
            :alt="product.title"
            class="mx-auto aspect-square w-full max-w-md object-contain"
          />
          <div v-if="product.images.length > 1" class="mt-4 flex gap-2 overflow-x-auto">
            <button
              v-for="image in product.images"
              :key="image"
              type="button"
              class="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white ring-2"
              :class="image === activeImage ? 'ring-clay' : 'ring-transparent'"
              @click="activeImage = image"
            >
              <img :src="image" alt="" class="h-full w-full object-contain p-1" />
            </button>
          </div>
        </div>

        <div class="space-y-4 p-4 sm:p-6">
          <p class="text-sm font-medium text-clay">{{ formatCategory(product.category) }}</p>
          <h2 id="product-dialog-title" class="font-display text-2xl leading-tight sm:text-3xl">
            {{ product.title }}
          </h2>
          <p v-if="product.brand" class="text-sm text-stone-500">{{ product.brand }}</p>
          <p class="text-sm leading-6 text-stone-600">{{ product.description }}</p>

          <div class="flex flex-wrap items-end justify-between gap-3">
            <p class="font-display text-3xl text-clay">{{ formatPrice(product.price) }}</p>
            <p class="text-sm text-amber-600">★ {{ formatRating(product.rating) }} / 5</p>
          </div>

          <dl class="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div class="rounded-2xl bg-stone-50 p-3">
              <dt class="text-stone-500">Zaliha</dt>
              <dd class="font-medium">{{ product.stock }} kom</dd>
            </div>
            <div class="rounded-2xl bg-stone-50 p-3">
              <dt class="text-stone-500">Popust</dt>
              <dd class="font-medium">{{ Math.round(product.discountPercentage) }}%</dd>
            </div>
            <div v-if="product.shippingInformation" class="rounded-2xl bg-stone-50 p-3 sm:col-span-2">
              <dt class="text-stone-500">Dostava</dt>
              <dd class="font-medium">{{ product.shippingInformation }}</dd>
            </div>
            <div v-if="product.warrantyInformation" class="rounded-2xl bg-stone-50 p-3 sm:col-span-2">
              <dt class="text-stone-500">Jamstvo</dt>
              <dd class="font-medium">{{ product.warrantyInformation }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
