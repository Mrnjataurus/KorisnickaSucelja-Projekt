<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import Navbar from './components/Navbar.vue'
import ProductCard from './components/ProductCard.vue'
import ProductModal from './components/ProductModal.vue'
import StatsSummary from './components/StatsSummary.vue'
import type { Product, ProductsResponse } from './types/product'

const CATEGORY_STORAGE_KEY = 'polica:lastCategory'

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref('')
function readStoredCategory() {
  try {
    return localStorage.getItem(CATEGORY_STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

const searchQuery = ref('')
const selectedCategory = ref(readStoredCategory())
const selectedProduct = ref<Product | null>(null)

const categories = computed(() => {
  return [...new Set(products.value.map((product) => product.category))].sort((a, b) =>
    a.localeCompare(b, 'hr'),
  )
})

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return products.value.filter((product) => {
    const matchesName = product.title.toLowerCase().includes(query)
    const matchesCategory = selectedCategory.value === '' || product.category === selectedCategory.value
    return matchesName && matchesCategory
  })
})

const averagePrice = computed(() => {
  if (filteredProducts.value.length === 0) return 0
  const sum = filteredProducts.value.reduce((total, product) => total + product.price, 0)
  return sum / filteredProducts.value.length
})

watch(selectedCategory, (category) => {
  console.log('Odabrana kategorija:', category || 'sve kategorije')
  try {
    localStorage.setItem(CATEGORY_STORAGE_KEY, category)
  } catch {
    // Preglednik može blokirati spremanje, pretraga i dalje radi.
  }
})

async function loadProducts() {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch('https://dummyjson.com/products?limit=100')
    if (!response.ok) {
      throw new Error('Proizvodi se trenutno ne mogu učitati.')
    }

    const data = (await response.json()) as ProductsResponse
    products.value = data.products

    const storedCategoryStillExists = data.products.some(
      (product) => product.category === selectedCategory.value,
    )
    if (selectedCategory.value && !storedCategoryStillExists) {
      selectedCategory.value = ''
    }
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'Proizvodi se trenutno ne mogu učitati.'
  } finally {
    loading.value = false
  }
}

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = ''
}

onMounted(loadProducts)
</script>

<template>
  <div class="min-h-screen bg-paper text-ink">
    <Navbar
      :query="searchQuery"
      :category="selectedCategory"
      :categories="categories"
      @update-query="searchQuery = $event"
      @update-category="selectedCategory = $event"
    />

    <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <StatsSummary
        v-if="!loading && !error"
        :total="filteredProducts.length"
        :average-price="averagePrice"
      />

      <p v-if="loading" class="sr-only" role="status">Učitavanje proizvoda...</p>
      <div v-if="loading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-hidden="true">
        <div v-for="item in 8" :key="item" class="h-80 animate-pulse rounded-3xl bg-white ring-1 ring-stone-200" />
      </div>

      <div v-else-if="error" class="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-stone-200">
        <p class="font-display text-2xl">Katalog nije dostupan</p>
        <p class="mt-2 text-sm text-stone-500">{{ error }}</p>
        <button
          type="button"
          class="mt-5 rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-white"
          @click="loadProducts"
        >
          Pokušaj ponovo
        </button>
      </div>

      <template v-else>
        <p v-if="filteredProducts.length === 0" class="mt-8 rounded-3xl bg-white p-8 text-center ring-1 ring-stone-200">
          <span class="font-display text-2xl">Nema rezultata</span>
          <span class="mt-2 block text-sm text-stone-500">Pokušaj s drugim nazivom ili kategorijom.</span>
          <button
            type="button"
            class="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper"
            @click="clearFilters"
          >
            Poništi filtere
          </button>
        </p>

        <section v-else class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Popis proizvoda">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @select-product="selectedProduct = $event"
          />
        </section>
      </template>
    </main>

    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="selectedProduct = null"
    />
  </div>
</template>
