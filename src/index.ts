import { useState } from "react";
import type {
  ReducerState,
  ActionUnion,
  ReducerFunc,
  DispatchFunc,
  UseYReducerReturn,
} from "./types.ts";

/**
 *
 * ### useYReducer
 *
 * A strongly-typed React hook for state management using the reducer pattern.
 *
 * This hook provides a type-safe alternative to React's built-in `useReducer`,
 * allowing you to define custom state and action types for predictable, scalable state logic.
 *
 * @template TState - The shape of the state object being managed.
 * @template TAction - The union of action objects that can be dispatched to update the state.
 *
 * @param initialState - The initial state value for the reducer.
 * @param reducer - A reducer function that receives the current state and an action, returning the new state.
 *
 * @returns A tuple: `[state, dispatch]` — the current state and a dispatch function to update it.
 *
 * @example
 * ```tsx
 * interface CounterState {
 *   count: number;
 * }
 *
 * type CounterAction =
 *   | { key: 'increment'; payload: number }
 *   | { key: 'decrement'; payload: number }
 *   | { key: 'reset' };
 *
 * const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
 *   switch (action.key) {
 *     case 'increment':
 *       return { count: state.count + action.payload };
 *     case 'decrement':
 *       return { count: state.count - action.payload };
 *     case 'reset':
 *       return { count: 0 };
 *     default:
 *       return state;
 *   }
 * };
 *
 * // Usage in a React component:
 * const [state, dispatch] = useYReducer({ count: 0 }, counterReducer);
 * dispatch({ key: 'increment', payload: 1 });
 * ```
 */
export default function useYReducer<
  TState extends ReducerState,
  TAction extends ActionUnion
>(
  initialState: TState,
  reducer: ReducerFunc<TState, TAction>
): UseYReducerReturn<TState, TAction> {
  const [state, setState] = useState<TState>(initialState);

  const dispatch: DispatchFunc<TAction> = (action: TAction) => {
    setState((prevState) => reducer(prevState, action));
  };

  return [state, dispatch];
}

export * from "./types";
