/* eslint-disable no-duplicate-imports */
import type { ReactElement } from 'react';

import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) =>
  render(ui, {
    wrapper: ({ children }) => <>{children}</>,
    ...options,
  });

export * from '@testing-library/react';

export { customRender as render };
export { default as userEvent } from '@testing-library/user-event';
