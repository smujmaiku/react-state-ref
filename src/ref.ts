/*!
 * React State Ref Hook <https://github.com/smujmaiku/react-state-ref>
 * Copyright(c) 2021 Michael Szmadzinski
 * MIT Licensed
 */

import {
	useRef, useCallback, useState, MutableRefObject
} from 'react';

export type SetStateRef<T> = (state: T, swap?: boolean) => void;
export type UseStateRef<T> = [ref: MutableRefObject<T>, setState: SetStateRef<T>];

export default function useStateRef<T>(init: T): UseStateRef<T> {
	const a = useRef(init);
	const b = useRef(init);
	const [active, setActive] = useState(true);

	// Use activeRef to avoid swapping too fast and missing an update cycle
	const activeRef = useRef(active);
	activeRef.current = active;

	const setState = useCallback((state: T, swap = false): void => {
		a.current = state;
		b.current = state;
		if (swap) {
			setActive(!activeRef.current);
		}
	}, []);

	const ref = active ? a : b;
	return [ref, setState];
}
