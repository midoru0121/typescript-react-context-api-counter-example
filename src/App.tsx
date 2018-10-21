import * as React from "react";

import { buildContext } from "src/lib/context";

interface IFirstCounterState {
  count1: number;
}

const FirstCounterContext = buildContext<IFirstCounterState>({ count1: 1 });

interface ISecondCounterState {
  count2: number;
}

const SecondCounterContext = buildContext<ISecondCounterState>({ count2: 100 });

const SecondBaseComponent = (props: any) => (
  <div>
    <h2>Second: {props.count2}</h2>
    <button
      // tslint:disable-next-line:jsx-no-lambda
      onClick={() => {
        FirstCounterContext.reduce({
          count1: (FirstCounterContext.getState().count1 += 1)
        });
      }}
    >
      Increment First
    </button>
    <button
      // tslint:disable-next-line:jsx-no-lambda
      onClick={() => {
        SecondCounterContext.reduce({
          count2: (SecondCounterContext.getState().count2 += 1)
        });
      }}
    >
      Increment Second
    </button>
  </div>
);

const ConnectedWithCounter2 = SecondCounterContext.withConsumer(
  SecondBaseComponent
);

interface IFirstCounterConnected extends IFirstCounterState {
  appName: string;
}

const FirstBaseComponent = (props: IFirstCounterConnected) => (
  <div>
    <h1>{props.appName}</h1>
    <h2>First: {props.count1}</h2>
    <ConnectedWithCounter2 />
  </div>
);

const ConnectedWithCounter1 = FirstCounterContext.withConsumer(
  FirstBaseComponent
);

const App = () => (
  <FirstCounterContext.Provider>
    <SecondCounterContext.Provider>
      <ConnectedWithCounter1 appName={"Simple Counter App"} />
    </SecondCounterContext.Provider>
  </FirstCounterContext.Provider>
);

export default App;
