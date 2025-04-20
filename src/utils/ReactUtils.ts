import type { DependencyList, Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type GetStateAction<S> = () => S;

export function useGetState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];

export function useGetState<S = undefined>(): [
    S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>,
];
export function useGetState<S>(initialState?: S) {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  });

  const getState = useCallback(() => stateRef.current, []);

  return [state, setState, getState];
}

export function useGetMemo<T>(factory: () => T, deps: DependencyList | undefined): [T, () => T] {
  const memoState = useMemo(factory, deps);
  const stateRef = useRef(memoState);

  useEffect(() => {
    stateRef.current = memoState;
  });

  const getMemoState = useCallback(() => stateRef.current, []);

  return [memoState, getMemoState];
}
