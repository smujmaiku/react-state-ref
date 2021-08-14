import React, { useEffect } from 'react'
import { act, render } from '@testing-library/react';

import useStateRef, { SetStateRef } from './ref';
import { MutableRefObject } from 'react';

function performActs(setState: SetStateRef<string>): string[] {
	act(() => {
		setState('1', false);
	});
	act(() => {
		setState('2', true);
	});
	act(() => {
		setState('3', false);
		setState('4', false);
	});
	act(() => {
		setState('5', true);
		setState('6', false);
	});
	act(() => {
		setState('7', false);
		setState('8', true);
	});
	act(() => {
		setState('9', true);
		setState('10', true);
	});

	return ['2', '6', '8', '10'];
}

describe('ref', () => {
	describe('useStateRef', () => {
		it('should change ref Object when swap is set', () => {
			const results: string[] = [];

			let mockSetState: SetStateRef<string> | undefined;
			function Mock() {
				const [ref, setState] = useStateRef('0');
				mockSetState = setState;

				useEffect(() => {
					results.push(ref.current);
				}, [ref]);

				return null;
			}

			render(<Mock />);

			const expected = performActs(mockSetState);

			expect(results).toEqual(['0', ...expected]);
		});

		it('should preserve discarded refs', () => {
			const results: MutableRefObject<string>[] = [];

			let mockSetState: SetStateRef<string> | undefined;
			function Mock() {
				const [ref, setState] = useStateRef('0');
				mockSetState = setState;

				useEffect(() => {
					results.push(ref);
				}, [ref]);

				return null;
			}

			render(<Mock />);

			const expected = performActs(mockSetState);

			expect(results.map(({ current }) => current)).toEqual(['0', ...expected]);
		})
	})
});
