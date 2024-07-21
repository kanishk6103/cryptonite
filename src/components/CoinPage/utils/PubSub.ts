type Callback = (data: any) => void;

class PubSub {
  private subscribers: { [key: string]: Callback[] } = {};

  subscribe(event: string, callback: Callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  unsubscribe(event: string, callback: Callback) {
    if (!this.subscribers[event]) return;

    this.subscribers[event] = this.subscribers[event].filter(
      (subscriber) => subscriber !== callback
    );
  }

  publish(event: string, data: any) {
    if (!this.subscribers[event]) return;

    this.subscribers[event].forEach((callback) => callback(data));
  }
}

const pubSub = new PubSub();
export default pubSub;
