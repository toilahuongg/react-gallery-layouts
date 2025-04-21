import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HoverDir from './hover-dir';

describe('HoverDir Component', () => {
  it('renders children correctly', () => {
    render(
      <HoverDir>
        <div data-testid="test-content">Test Content</div>
      </HoverDir>
    );
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <HoverDir className="custom-class">
        <div>Test</div>
      </HoverDir>
    );
    expect(screen.getByTestId('hover-dir-container')).toHaveClass('custom-class');
  });

  it('detects hover direction correctly', () => {
    const { container } = render(
      <HoverDir>
        <div>Test</div>
      </HoverDir>
    );

    const element = container.firstChild as HTMLElement;
    
    // Mock getBoundingClientRect
    const mockRect = {
      width: 200,
      height: 200,
      left: 0,
      top: 0,
      right: 200,
      bottom: 200,
    };
    element.getBoundingClientRect = jest.fn().mockReturnValue(mockRect);

    // Test hover from left
    fireEvent.mouseEnter(element, { clientX: 10, clientY: 100 });
    expect(element).toHaveClass('left');

    // Test hover from right
    fireEvent.mouseEnter(element, { clientX: 190, clientY: 100 });
    expect(element).toHaveClass('right');

    // Test hover from top
    fireEvent.mouseEnter(element, { clientX: 100, clientY: 10 });
    expect(element).toHaveClass('top');

    // Test hover from bottom
    fireEvent.mouseEnter(element, { clientX: 100, clientY: 190 });
    expect(element).toHaveClass('bottom');

    // Test mouse leave
    fireEvent.mouseLeave(element);
    expect(element).not.toHaveClass('left');
    expect(element).not.toHaveClass('right');
    expect(element).not.toHaveClass('top');
    expect(element).not.toHaveClass('bottom');
  });
}); 