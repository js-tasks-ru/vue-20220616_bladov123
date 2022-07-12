<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': loading }" :style="imgObj">
      <span class="image-uploader__text"> {{ currentText }}</span>
      <input
        v-bind="$attrs"
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="selectEmit"
        @click="remove"
        :disabled="loading"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      required: false,
    },

    uploader: {
      type: Function,
    },
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      loading: false,
      loaded: false,
      selectedImg: this.preview,
      prevImg: null,
      isPreviw: this.preview,
    };
  },

  computed: {
    imgObj() {
      if (!this.selectedImg || !this.preview) return new Object();

      return {
        '--bg-url': `url('${this.selectedImg}')`,
      };
    },

    currentText() {
      if (this.loading) return 'Загрузка...';

      if (this.loaded || this.isPreviw) return 'Удалить изображение.';

      return 'Загрузить изображение';
    },
  },

  methods: {
    async selectEmit(e) {
      this.loading = true;
      let file = this.$refs['input'].files[0];

      this.$emit('select', file);

      if (this.uploader) {
        try {
          let response = await this.uploader(file);
          this.$emit('upload', response);
          this.selectedImg = response.image;
          this.prevImg = response.image;
          this.loading = false;
          this.loaded = true;

          return;
        } catch (error) {
          this.$emit('error', error);
          this.$refs['input'].value = '';
          this.loading = false;

          if (this.prevImg) {
            this.selectedImg = this.prevImg;
          }

          return;
        }
      }

      this.loading = false;
      this.loaded = true;
    },

    remove(e) {
      this.isPreviw = false;
      this.loaded = false;
      this.$refs['input'].value = '';
      this.$emit('remove');
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
