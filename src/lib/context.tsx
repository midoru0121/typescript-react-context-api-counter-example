import * as React from "react";
import { Store } from "src/lib/store";

export function buildContext<T>(initialVal: T) {
  const store = new Store<T>(initialVal);
  const Context = React.createContext(initialVal);

  return {
    withConsumer: <OuterProps extends {}>(
      WrappedComponent: React.ComponentType<OuterProps>
    ) => {
      return class Consumer extends React.Component<any, {}> {
        public render() {
          return (
            <Context.Consumer>
              {context => <WrappedComponent {...this.props} {...context} />}
            </Context.Consumer>
          );
        }
      };
    },

    // tslint:disable-next-line:max-classes-per-file
    Provider: class Provider extends React.Component<{}, T> {
      constructor(props: {}) {
        super(props);
        this.state = initialVal;
      }

      public componentWillMount() {
        store.subscribe(this.subscribeCounter);
      }

      /* end the subscription when the container is unmounted. */
      public componentWillUnmount() {
        store.unsubscribe(this.subscribeCounter);
      }

      public render() {
        return (
          <Context.Provider value={this.state}>
            {this.props.children}
          </Context.Provider>
        );
      }

      private subscribeCounter = (val: T) => {
        this.setState(val);
      };
    },
    getState: store.getState,
    reduce: store.reduce
  };
}
