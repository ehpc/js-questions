interface Listeners {
  once: Set<Function>;
  on: Set<Function>;
}

class EventEmitter {
  #listeners: Map<string, Listeners> = new Map();

  on(event: string, listener: Function) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, { once: new Set(), on: new Set() });
    }
    this.#listeners.get(event)?.on.add(listener);
    return this;
  }

  once(event: string, listener: Function) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, { once: new Set(), on: new Set() });
    }
    this.#listeners.get(event)?.once.add(listener);
    return this;
  }

  off(event: string, listener?: Function) {
    const listeners = this.#listeners.get(event);
    if (!listeners) return;
    if (listener) {
      listeners.once.delete(listener);
      listeners.on.delete(listener);
    } else {
      this.#listeners.delete(event);
    }
  }

  emit(event: string, ...args) {
    const listeners = this.#listeners.get(event);
    if (!listeners) return;
    listeners.once.forEach(listener => listener(...args));
    listeners.once.clear();
    listeners.on.forEach(listener => listener(...args));
  }
}

const ee = new EventEmitter();

ee.once('foo', console.log); // Сработает только один раз

ee.emit('foo', 1);
ee.emit('foo', 2);

ee.off('foo', console.log); // Отмена конкретного обработчика события по ссылке

ee.on('foo', console.log); // Сработает много раз
ee.emit('foo', 3);
ee.emit('foo', 4);

ee.off('foo');              // Отмена всех обработчиков этого события

ee.emit('foo', 5);