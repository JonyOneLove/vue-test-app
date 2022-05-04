<template>
  <button
    class="btn"
    :class="{ [className]: className, ['btn-primary']: !className }"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    className: String,
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';
.btn {
  border: none;
  border-radius: 5px;
  outline: none;
  min-width: 104px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  cursor: pointer;
  transition: 0.2s;
  color: $white;
  text-transform: uppercase;
}
.btn-primary {
  background-color: blue;
  &:hover {
    background-color: $white;
  }
}
.btn-danger {
  background-color: $soft-red;
  &:hover {
    background-color: $pale-red;
  }
}
.btn-secondary {
  background-color: $dark-blue;
  &:hover {
    background-color: $grayish-blue;
  }
}
</style>
