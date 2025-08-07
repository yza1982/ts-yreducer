# ts-yreducer

[![npm version](https://img.shields.io/npm/v/ts-yreducer.svg)](https://www.npmjs.com/package/ts-yreducer)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strongly--typed-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-compatible-61dafb?logo=react)](https://react.dev/)

> **A type-safe, React reducer hook for scalable state management**

---

## Features

- 🛡️ **Type safety**: Strict types for state and actions, reducing bugs.
- 🧩 **Familiar API**: Works like React’s `useReducer`, but with better type inference.
- 🚀 **Scalable**: Perfect for complex state logic in large React apps.
- ⚡ **Lightweight**: Zero dependencies.

---

## Installation

```bash
npm install ts-yreducer
# or
yarn add ts-yreducer
```

---

## Usage

### 📦 Example: Counter

```tsx
import useYReducer from "ts-yreducer";

type CounterState = {
  count: number;
}

type CounterAction =
  | { key: "increment"; payload: number }
  | { key: "decrement"; payload: number }
  | { key: "reset" };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  const { key, payload } = action;
  switch (action.key) {
    case "increment":
      if(!payload) return state; 
      return { count: state.count + action.payload };
    case "decrement":
      if(!payload) return state;   
      return { count: state.count - action.payload };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
};

function CounterComponent() {
  const [state, dispatch] = useYReducer({ count: 0 }, counterReducer);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ key: "increment", payload: 1 })}>+</button>
      <button onClick={() => dispatch({ key: "decrement", payload: 1 })}>-</button>
      <button onClick={() => dispatch({ key: "reset" })}>Reset</button>
    </div>
  );
}
```

### 📦 Example: Todo List

```tsx
import useYReducer, { type ActionObject, type ReducerState, type ReducerFunc }  from "ts-yreducer";

type StateKey = "add" | "remove" | "setFilter";
type FilterKey = "all" | "completed" | "active"; 

type StateUnit<TKey extends StateKey, TPayload = unknown> = ActionObject<
  TKey,
  TPayload
>;

interface TodoState extends ReducerState {
  todos: string[];
  filter: FilterKey;
}

type TodoActions =
  | StateAction<"add", string>
  | StateAction<"remove", number>
  | StateAction<"setFilter", FilterKey>;

const reducer:ReducerFunc<TodoState, TodoActions> = (state: TodoState, action: TodoActions) => {
  const { key, payload } = action;

  switch (key) {
    case "add":
      if (!payload) throw new Error("Todo is required"); 
      return { ...state, todos: [...state.todos, payload] };

    case "remove":
      if (!payload) throw new Error("Index is required"); 
      return {
        ...state,
        todos: state.todos.filter((_, idx) => idx !== payload),
      };

    case "setFilter":
      if (!payload) throw new Error("Filter key is required");  
      return { ...state, filter: payload };

    default:
      return state;
  }
};

function TodoComponent() {

  const initialStates: TodoState = {todos: [], filter: "all"};
  const [state, dispatch] = useYReducer(initialStates,reducer);

  return (
    <div>
      <button onClick={() => dispatch({ key: "add", payload: "Learn TypeScript" })}>
        Add Todo
      </button>
      <ul>
        {state.todos.map((todo, idx) => (
          <li key={idx}>
            {todo}
            <button onClick={() => dispatch({ key: "remove", payload: idx })}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => dispatch({ key: "setFilter", payload: "all" })}>All</button>
        <button onClick={() => dispatch({ key: "setFilter", payload: "active" })}>Active</button>
        <button onClick={() => dispatch({ key: "setFilter", payload: "completed" })}>Completed</button>
      </div>
      <p>Current filter: {state.filter}</p>
    </div>
  );
}
```

---

## API

### `useYReducer<TState, TAction>(initialState, reducer)`

- **`TState`**: The shape of your state object.
- **`TAction`**: The union of possible action objects.
- **Returns**: `[state, dispatch]`

---

## Types

```typescript
/**
 * Represents the shape of the reducer state.
 * Extend this interface to define your own state structure.
 */
export interface ReducerState {
  [key: string]: unknown;
}

/**
 * Represents a single action object for the reducer.
 *
 * @template TKey - The action type identifier.
 * @template TPayload - The payload type for the action.
 */
export interface ActionObject<TKey extends string, TPayload = unknown> {
  /**
   * Action identifier
   */
  readonly key: TKey;

  /**
   * Action payload.
   */
  readonly payload?: TPayload;
}

/**
 * Type alias for a union of all possible action objects.
 */
export type ActionUnion = ActionObject<string, unknown>;

/**
 * Reducer function signature.
 *
 * @template TState - The state type.
 * @template TAction - The action union type.
 */
export type ReducerFunc<
  TState extends ReducerState,
  TAction extends ActionUnion
> = (state: TState, unit: TAction) => TState;

/**
 * Dispatch function signature for actions.
 *
 * @template TAction - The action union type.
 *
 * @param unit - The action to be dispatched.
 */
export type DispatchFunc<TAction extends ActionUnion> = (unit: TAction) => void;

/**
 * The return type of the useYReducer hook: [state, dispatch].
 *
 * @template TState - The state type.
 * @template TAction - The action union type.
 */
export type UseYReducerReturn<
  TState extends ReducerState,
  TAction extends ActionUnion
> = [TState, DispatchFunc<TAction>];
```

---

### License MIT
---
### Type-safe reducers, made easy.