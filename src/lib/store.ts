export class Store<T> {
  private state: T;
  private callbacks: Array<(val: T) => void> = [];

  constructor(state: T) {
    this.state = state;
  }

  public subscribe = (callback: (val: T) => void) => {
    this.callbacks.push(callback);
  };

  public unsubscribe = (callback: (val: T) => void) => {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
  };

  public getState = () => this.state;

  public reduce = (state: T) => {
    this.state = state;
    this.notify(this.state);
  };

  /* Private */

  private notify = (val: T) => {
    this.callbacks.forEach(cb => {
      cb(val);
    });
  };
}
