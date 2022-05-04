<template>
  <div class="container">
    <main>
      <section class="home">
        <div class="home__header">
          <h1 class="title">Добавление товара</h1>
          <Sort @sort="sortProduct" />
        </div>
        <div class="home__content">
          <Create @create="createProduct" />
          <transition-group tag="div" name="fade" mode="out-in" class="row">
            <ProductItem
              v-for="pr in products"
              :key="pr.id"
              :pr="pr"
              @remove="remove"
            />
          </transition-group>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Create from '@/components/CreateProduct'
import ProductItem from '@/components/ProductItem'
import Sort from '@/components/Sort'
import Preloader from './components/Preloader'
import * as Server from '@/services/articles'

export default {
  name: 'App',
  components: { Create, ProductItem, Sort },
  data() {
    return {
      products: [],
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    async getAll() {
      try {
        const response = await Server.getProducts()
        console.log(response)
        this.products = response
      } catch (e) {
        console.log(e)
      }
    },
    async createProduct(data) {
      try {
        const response = await Server.addProduct(data)
        console.log(response)
        this.products.push(data)
        console.log(this.products)
      } catch (e) {
        console.log(e)
      }
    },
    async remove(i, id) {
      console.log(i)
      console.log(id)
      try {
        const response = await Server.removeProduct(id)
        this.products = this.products.filter((pr) => pr.id !== id)
      } catch (e) {
        console.log(e)
      }
    },
    sortProduct(sortItem) {
      switch (sortItem.sortBy) {
        case 'default':
          this.getAll()
        case 'priceMax':
          return this.products.sort((a, b) => {
            return parseInt(a.price) - parseInt(b.price)
          })
        case 'priceMin':
          return this.products.sort((a, b) => {
            return parseInt(b.price) - parseInt(a.price)
          })
        case 'name':
          return this.products.sort((a, b) => (a.name > b.name ? 1 : -1))
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';

.fade-enter-active {
  animation: fadeIn 0.4s;
}

.fade-leave-active {
  animation: fadeOut 0.4s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.6);
  }
}

.home {
  &__content {
    display: flex;
    @media screen and(max-width: 768px) {
      display: block;
      width: auto;
    }
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
}

.row {
  width: 100%;
  @media screen and(max-width: 1200px) {
    width: auto;
  }
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  @media screen and(max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
