class EventBus {
  private readonly listeners: Record<string, Array<() => void>>;
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off (event, callback) {
    this.checkEvent(event);

    this.listeners[event] = this.listeners[event]
      .filter(listener => listener !== callback);
  }

  emit(event, ...args) {
    this.checkEvent(event);

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }

  checkEvent(event: string) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }
  }
}
