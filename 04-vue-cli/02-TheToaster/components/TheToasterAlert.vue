<template>
  <div class="toast" :class="toasterClass">
    <ui-icon class="toast__icon" :icon="circle" />
    <span>{{ messenge }}</span>
    <div class="toast__close" @click="$emit('closeToaster')">
      <span>+</span>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'TheToasterAlert',

  components: { UiIcon },

  props: {
    alertType: {
      type: String,
      required: true,
    },

    messenge: {
      type: String,
      required: true,
    },
  },

  emits: ['closeToaster'],

  computed: {
    toasterClass() {
      return {
        toast_error: this.alertType === 'error',
        toast_success: this.alertType === 'success',
      };
    },

    circle() {
      if (this.alertType === 'error') {
        return 'alert-circle';
      }
      return 'check-circle';
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  position: relative;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}
.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}
.toast.toast_error {
  color: var(--red);
}

.toast.toast_success {
  color: var(--green);
}

.toast__close {
  position: absolute;
  cursor: pointer;
  user-select: none;
  top: -5px;
  right: 2px;
  transform: rotate(45deg);
}
</style>
