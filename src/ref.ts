/*!
 * React State Ref Hook <https://github.com/smujmaiku/react-state-ref>
 * Copyright(c) 2021 Michael Szmadzinski
 * MIT Licensed
 */

import {
	useRef, useCallback, MutableRefObject, useMemo, useReducer
} from 'react';

export type SetStateRef<T> = (state: T, swap?: boolean) => void;
export type UseStateRef<T> = [ref: MutableRefObject<T>, setState: SetStateRef<T>];

export default function useStateRef<T>(init: T): UseStateRef<T> {
	const stateRef = useRef<T>(init);

	const [refresh, doRefresh] = useReducer((s) => s + 1, 0);

	const ref = useMemo<MutableRefObject<T>>(
		() => ({ current: stateRef.current }),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[refresh],
	);

	const setStateRef = useCallback((state: T, swap = false): void => {
		stateRef.current = state;
		if (swap) {
			doRefresh();
		}
	}, [doRefresh]);

	ref.current = stateRef.current;

	return [ref, setStateRef];
}
