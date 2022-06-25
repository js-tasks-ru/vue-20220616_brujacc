<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': isLoading }" :style="style">
      <span class="image-uploader__text">{{ uploaderText }}</span>
      <input
        v-bind="$attrs"
        ref="input"
        :value="$attrs.modelValue"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="handleFileChange"
        @click="handleClick"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: String,
    uploader: Function,
  },
  emits: ['remove', 'select', 'upload', 'error'],
  data() {
    return {
      isLoading: false,
      selectedImage: this.preview,
    };
  },
  computed: {
    style() {
      return this.selectedImage ? `--bg-url: url(${this.selectedImage})` : null;
    },
    uploaderText() {
      if (this.isLoading) {
        return 'Загрузка...';
      } else if (!this.hasImage) {
        return 'Загрузить изображение';
      } else {
        return 'Удалить изображение';
      }
    },
    hasImage() {
      return !!this.selectedImage || false;
    },
  },
  watch: {
    preview(newPreview) {
      this.selectedImage = newPreview;
    },
  },
  methods: {
    handleClick(event) {
      if (this.hasImage && !this.isLoading) {
        event.preventDefault();
        this.$emit('remove');
        this.selectedImage = '';
        this.$refs.input.value = '';
      }
    },
    handleFileChange(event) {
      if (this.uploader) {
        this.isLoading = true;
        this.uploader(event.target.files[0])
          .then((response) => this.$emit('upload', response))
          .catch((error) => {
            this.$emit('error', error);
            this.selectedImage = '';
          })
          .finally(() => (this.isLoading = false));
      }
      this.selectedImage = URL.createObjectURL(event.target.files[0]);
      this.$emit('select', event.target.files[0]);
    },
  },
};
</script>

<style scoped>
/* .image-uploader {
} */

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
