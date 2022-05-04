<template>
  <div v-if="pr" class="col">
    <div class="product-item">
      <a class="product-item__image">
        <img :src="pr.imageUrl" alt="" />
      </a>
      <button
        @click.prevent="handleClick(i, pr.id)"
        class="product-item__delete"
      >
        <img src="@/assets/img/remove-icon.svg" alt="remove" />
      </button>
      <div class="product-item__body">
        <h4 class="product-item__title">
          <a class="product-item__link-title">{{ pr.name }}</a>
        </h4>
        <p class="product-item__text">
          {{ pr.description }}
        </p>
        <div class="product-item__prices">
          <span class="product-item__price"
            >{{ formatPrice(pr.price) }} руб.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pr: Object,
  },
  data() {
    return {}
  },
  methods: {
    handleClick(i, id) {
      this.$emit('remove', i, id)
    },
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';

.product-item {
  position: relative;
  &__delete {
    position: absolute;
    top: -10px;
    right: -7px;
    display: flex;
    justify-content: center;
    padding: 8px 10px;
    width: 32px;
    height: 32px;
    background: #ff8484;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    opacity: 0;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fffefb;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    width: 100%;
    height: 160px;
    margin: 0 auto;
    cursor: pointer;
    &:hover + .product-item__delete {
      opacity: 1;
    }
    img {
      max-width: 100%;
      height: auto;
      max-height: 100%;
      object-fit: contain;
    }
  }
  &__body {
    padding: 16px;
  }
  &__title {
    @include font(20px, 600, 25px, #3f3f3f);
    margin-bottom: 16px;
    cursor: pointer;
  }
  &__link-title {
    @include font(20px, 600, 25px, #3f3f3f);
  }
  &__text {
    @include font(16px, 400, 20px, #3f3f3f);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 56px;
    margin-bottom: 30px;
  }
  &__price {
    @include font(24px, 600, 30px, #3f3f3f);
  }
}
</style>
