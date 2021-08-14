import React, { useEffect } from 'react'
import { act, render } from '@testing-library/react';

import useStateRef, { SetStateRef } from './ref';

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

			act(() => {
				mockSetState('1', false);
			});
			act(() => {
				mockSetState('2', true);
			});
			act(() => {
				mockSetState('3', false);
				mockSetState('4', false);
			});
			act(() => {
				mockSetState('5', true);
				mockSetState('6', false);
			});
			act(() => {
				mockSetState('7', false);
				mockSetState('8', true);
			});
			act(() => {
				mockSetState('9', true);
				mockSetState('10', true);
			});

			expect(results).toEqual(['0', '2', '6', '8', '10']);
		});
	})
});
