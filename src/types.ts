/**
 * #### Represents the shape of the reducer state.
 *
 * Extend this interface to define your own state structure.
 */
export interface ReducerState {
  [key: string]: unknown;
}

/**
 * #### Represents a single action object for the reducer.
 *
 * @template TKey - The action type identifier.
 * @template TPayload - The payload type for the action.
 */
export interface ActionObject<TKey extends string, TPayload = unknown> {
  /**
   * #### Action identifier
   */
  readonly key: TKey;

  /**
   * #### Action payload.
   */
  readonly payload?: TPayload;
}

/**
 * #### Type alias for a union of all possible action objects.
 */
export type ActionUnion = ActionObject<string, unknown>;

/**
 * #### Reducer function signature.
 *
 * @template TState - The state type.
 * @template TAction - The action union type.
 */
export type ReducerFunc<
  TState extends ReducerState,
  TAction extends ActionUnion
> = (state: TState, unit: TAction) => TState;

/**
 * #### Dispatch function signature for actions.
 *
 * @template TAction - The action union type.
 *
 * @param unit - The action to be dispatched.
 */
export type DispatchFunc<TAction extends ActionUnion> = (unit: TAction) => void;

/**
 * #### The return type of the useYReducer hook: [state, dispatch].
 *
 * @template TState - The state type.
 * @template TAction - The action union type.
 */
export type UseYReducerReturn<
  TState extends ReducerState,
  TAction extends ActionUnion
> = [TState, DispatchFunc<TAction>];
