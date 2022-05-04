<template>
  <div class="sort">
    <div @click="showPopup = !showPopup" class="sort__label">
      <b>{{ sortItems[activeItem.id].name }}</b>
      <svg
        :class="{ active: showPopup }"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
          fill="#2C2C2C"
        />
      </svg>
    </div>
    <div v-if="showPopup" class="sort__popup">
      <ul>
        <li
          @click="handleActiveItem(index)"
          v-for="(item, index) in sortItems"
          :key="item.name"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['sort'],
  data() {
    return {
      showPopup: false,
      activeItem: { id: 0, name: 'по умолчанию', sortBy: 'default' },

      sortItems: [
        { id: 0, name: 'по умолчанию', sortBy: 'default' },
        { id: 1, name: 'по возрастанию цены', sortBy: 'priceMax' },
        { id: 2, name: 'по убыванию цены', sortBy: 'priceMin' },
        { id: 3, name: 'алфавиту', sortBy: 'name' },
      ],
    }
  },
  methods: {
    handleActiveItem(i) {
      this.showPopup = false
      let sortItem = this.sortItems[i]
      this.$emit('sort', sortItem)
      this.activeItem = sortItem
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';

.sort {
  position: relative;
  background: #fffefb;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px 16px;
  &__label {
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
      transform: rotate(180deg);
      &.active {
        transform: rotate(0);
      }
    }

    b {
      @include font(12px, 400, 15px, #b4b4b4);
      margin-right: 8px;
    }

    span {
      color: #b4b4b4;
      border-bottom: 1px dashed red;
      cursor: pointer;
    }
  }

  &__popup {
    position: absolute;
    right: 0;
    margin-top: 15px;
    background: #ffffff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    padding: 10px 0;
    width: 135px;
    z-index: 5;

    ul {
      overflow: hidden;
      li {
        @include font(12px, 400, 15px, #b4b4b4);
        padding: 10px 16px;
        cursor: pointer;

        &.active,
        &:hover {
          background: rgba(254, 95, 30, 0.05);
        }

        &.active {
          font-weight: bold;
          color: red;
        }
      }
    }
  }
}
</style>
