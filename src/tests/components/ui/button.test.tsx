import { describe, expect, test } from 'vitest';

import { Button } from '@/components/ui/button';
import { render, screen } from '@/tests/react-test-utils';

describe('Button', () => {
  test('given no props: renders a text', () => {
    render(<Button>Click Me</Button>);

    // Check if the text "Click Me" is rendered within the Button component
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('renders with correct class names when using default variant', () => {
    render(<Button>Click Me</Button>);

    // Check if the button has the default classes based on the default variant
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass(
      'bg-primary text-primary-foreground shadow hover:bg-primary/90'
    );
  });

  test('renders with correct size class for "sm"', () => {
    render(<Button size='sm'>Click Me</Button>);

    // Check if the button has the correct class for small size
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('h-8 rounded-md px-3 text-xs');
  });

  test('renders with "outline" variant', () => {
    render(<Button variant='outline'>Click Me</Button>);

    // Check if the button has the correct class for "outline" variant
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass(
      'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'
    );
  });

  test('renders with "asChild" prop correctly', () => {
    render(
      <Button asChild>
        <span>Click Me</span>
      </Button>
    );

    // The button should render as a span element because of the asChild prop
    const button = screen.getByText('Click Me');
    expect(button.tagName).toBe('SPAN');
  });
});
