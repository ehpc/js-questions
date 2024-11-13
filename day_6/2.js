         // ÐÑÐ¼ÐµÐ½Ð° Ð²ÑÐµÑ Ð¾Ð±ÑÐ°Ð±Ð¾ÑÑÐ¸ÐºÐ¾Ð² ÑÑÐ¾Ð³Ð¾ ÑÐ¾Ð±ÑÑÐ¸Ñ

class EventEmitter {

  #handlers = new Map();

  on(event, cb) {
    const store = this.#getHandlersStore(event);
    store.add(cb);

    return cb;
  }

  #getHandlersStore(event) {
    let store = this.#handlers.get(event);

    if (store == null) {
      store = new Set();
      this.#handlers.set(event, store);
    }

    return store;
  }

  once(event, cb) {
    const wrapper = (...args) => {
      try {
        cb(...args);
      } finally {
        this.off(event, wrapper);
      }
    }

    return this.on(event, wrapper);
  }

  emit(event, ...payload) {
    const store = this.#getHandlersStore(event);

    store.forEach((cb) => cb(...payload));
  }

  off(event, cb) {
    if (event == null) {
      this.#handlers.clear();
      return;
    }

    const store = this.#getHandlersStore(event);

    if (cb == null) {
      store.clear();
      return;
    }

    store.delete(cb);
  }
}

const ee = new EventEmitter();

ee.once('foo', console.log); // Ð¡ÑÐ°Ð±Ð¾ÑÐ°ÐµÑ ÑÐ¾Ð»ÑÐºÐ¾ Ð¾Ð´Ð¸Ð½ ÑÐ°Ð·

ee.emit('foo', 1);
ee.emit('foo', 2);

ee.off('foo', console.log); // ÐÑÐ¼ÐµÐ½Ð° ÐºÐ¾Ð½ÐºÑÐµÑÐ½Ð¾Ð³Ð¾ Ð¾Ð±ÑÐ°Ð±Ð¾ÑÑÐ¸ÐºÐ° ÑÐ¾Ð±ÑÑÐ¸Ñ Ð¿Ð¾ ÑÑÑÐ»ÐºÐµ
ee.off('foo');