<template>
  <div v-if="items" class="toasts">
    <the-toaster-alert
      v-for="(item, index) in items"
      :key="index"
      :alertType="item.type"
      :messenge="item.messenge"
      @closeToaster="deleteToster(index)"
    />
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import TheToasterAlert from './TheToasterAlert.vue';

export default {
  name: 'TheToaster',

  components: {
    UiIcon,
    TheToasterAlert,
  },

  props: {
    mSeconds: {
      type: Number,
      required: false,
      default: 5000,
    },
  },

  data() {
    return {
      items: [],
    };
  },

  methods: {
    error(mes) {
      this.addToster(mes, 'error');
      this.autoDeleteToster(this.mSeconds);
    },

    success(mes) {
      this.addToster(mes, 'success');
      this.autoDeleteToster(this.mSeconds);
    },

    addToster(mes, type) {
      this.items.push({
        messenge: mes,
        type,
      });
    },

    autoDeleteToster(ms) {
      setTimeout(() => {
        this.items.shift();
      }, ms);
    },

    deleteToster(indedx) {
      this.items.splice(indedx, 1);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
