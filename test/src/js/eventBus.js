// src/eventBus.js
import { ref } from 'vue';

const eventBus = {
  cartCount: ref(0),
  emit(event, ...args) {
    this[event]?.forEach(callback => callback(...args));
  },
  on(event, callback) {
    if (!this[event]) {
      this[event] = [];
    }
    this[event].push(callback);
  },
  off(event, callback) {
    this[event] = this[event]?.filter(cb => cb !== callback);
  }
};

export default eventBus;
