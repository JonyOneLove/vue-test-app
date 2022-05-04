<template>
  <div class="create-product">
    <form @submit.prevent="handleSubmit">
      <label class="create-product__label">Наименование товара</label>
      <input
        ref="inp"
        v-model="info.name"
        type="text"
        placeholder="Введите наименование товара"
        required
      />
      <label class="create-product__label">Описание товара</label>
      <textarea
        v-model="info.description"
        placeholder="Введите описание товара"
        required
      ></textarea>
      <label class="create-product__label">Ссылка на изображение товара</label>
      <input
        v-model="info.imageUrl"
        type="text"
        placeholder="Введите ссылку"
        required
      />
      <label class="create-product__label">Цена товара</label>
      <input
        @input="onInput"
        type="number"
        placeholder="Введите цену"
        required
      />
      <button
        :disabled="!btnSucces"
        :class="{ succes: btnSucces }"
        class="create-product__btn"
      >
        Добавить товар
      </button>
    </form>
    {{ info.price }}
  </div>
  <Alert v-if="showAlert">
    <template v-slot:content>
      <h3>Добавление нового продукта</h3>
      <p class="alert__description">Вы уверены что хотите добавить продукт?</p>
      <div class="alert__buttons">
        <Button
          @click="ifConfirmTrue(true)"
          text="подвердить"
          className="btn-secondary"
        />
        <Button
          @click="showAlert = false"
          text="отменить"
          className="btn-danger"
        />
      </div>
    </template>
  </Alert>
</template>

<script>
import { v4 as uuid } from 'uuid'
import Alert from './UI/Alert'
import Button from './UI/Button'

export default {
  components: { Alert, Button },
  emits: ['create'],
  data() {
    return {
      showAlert: false,

      info: {
        name: '',
        description: '',
        imageUrl: '',
        price: '',
      },
    }
  },
  computed: {
    btnSucces() {
      return Object.values(this.info).every((field) => field !== '')
    },
  },
  mounted() {
    this.focusInput()
  },
  methods: {
    onInput(e) {
      let value = e.target.value
      this.info.price = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

      /* let formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }).format(value) */
    },
    handleSubmit() {
      this.showAlert = true
    },
    ifConfirmTrue(val) {
      const id = uuid()

      if (val) {
        let newData = { ...this.info }
        newData.id = id

        this.$emit('create', newData)

        this.info.name = ''
        this.info.description = ''
        this.info.imageUrl = ''
        this.info.price = ''

        this.showAlert = false
      }
    },
    focusInput() {
      this.$refs.inp.focus()
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';

.create-product {
  max-width: 332px;
  height: 440px;
  background: #fffefb;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  margin-right: 16px;
  @media screen and(max-width: 1200px) {
    max-width: none;
    margin-right: 0;
  }
  @media screen and(max-width: 768px) {
    margin-bottom: 15px;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 24px;
    input {
      ::placeholder {
        @include font(12px, 400, 15px, #b4b4b4);
      }
      @include font(12px, 400, 15px, #3f3f3f);
      padding: 10px 16px;
      background: #fffefb;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      margin-bottom: 16px;
    }
    textarea {
      padding: 10px 16px;
      height: 108px;
      margin-bottom: 16px;
    }
  }
  &__label {
    @include font(10px, 400, 13px, #49485e);
    margin-bottom: 4px;
  }
  &__btn {
    @include font(12px, 600, 15px, #b4b4b4);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 95px;
    min-height: 36px;
    background: #eeeeee;
    border-radius: 10px;
    white-space: nowrap;
    cursor: pointer;
  }
  .succes {
    background: #7bae73;
    color: #ffffff;
  }
}
</style>
