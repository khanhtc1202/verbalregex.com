const initialState: number = 0;

import {IncreaseAction} from "../actions/CounterAction"

export default (state: number = initialState, action: IncreaseAction): number => {
  switch (action.type) {
    case "INCREASE": {
      return action.count + 1
    }
    default: {
      return state;
    }
  }
};
