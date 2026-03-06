import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Badge } from '../index'

describe('badge', () => {
  it('renders standalone badge with count', () => {
    const { container } = render(<Badge count={5} />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveTextContent('5')
  })

  it('wraps children with badge', () => {
    render(
      <Badge count={3}>
        <button>Button</button>
      </Badge>,
    )
    expect(screen.getByRole('button')).toHaveTextContent('Button')
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('shows overflow indicator when count exceeds overflowCount', () => {
    const { container } = render(<Badge count={100} overflowCount={99} />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveTextContent('99+')
  })

  it('uses default overflowCount of 99', () => {
    const { container } = render(<Badge count={100} />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveTextContent('99+')
  })

  it('hides badge when count is 0 by default', () => {
    const { container } = render(<Badge count={0} />)
    expect(container.querySelector('.mining-sdk-badge')).not.toBeInTheDocument()
  })

  it('shows badge when count is 0 and showZero is true', () => {
    const { container } = render(<Badge count={0} showZero />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveTextContent('0')
  })

  it('renders dot badge', () => {
    const { container } = render(<Badge dot />)
    expect(container.querySelector('.mining-sdk-badge--dot')).toBeInTheDocument()
  })

  it('renders text content when text prop is provided', () => {
    const { container } = render(<Badge text="NEW" />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveTextContent('NEW')
  })

  it('text prop overrides count', () => {
    const { container } = render(<Badge count={5} text="HOT" />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveTextContent('HOT')
    expect(container.querySelector('.mining-sdk-badge')).not.toHaveTextContent('5')
  })

  it('applies color variants correctly', () => {
    const { container, rerender } = render(<Badge count={1} color="primary" />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveClass('mining-sdk-badge--primary')

    rerender(<Badge count={1} color="success" />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveClass('mining-sdk-badge--success')

    rerender(<Badge count={1} color="error" />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveClass('mining-sdk-badge--error')

    rerender(<Badge count={1} color="warning" />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveClass('mining-sdk-badge--warning')
  })

  it('defaults to primary color', () => {
    const { container } = render(<Badge count={1} />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveClass('mining-sdk-badge--primary')
  })

  it('applies size variants correctly', () => {
    const { container, rerender } = render(<Badge count={1} size="sm" />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveClass('mining-sdk-badge--sm')

    rerender(<Badge count={1} size="md" />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveClass('mining-sdk-badge--md')

    rerender(<Badge count={1} size="lg" />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveClass('mining-sdk-badge--lg')
  })

  it('defaults to md size', () => {
    const { container } = render(<Badge count={1} />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveClass('mining-sdk-badge--md')
  })

  it('applies offset transform when children and offset provided', () => {
    const { container } = render(
      <Badge count={5} offset={[10, -5]}>
        <button>Button</button>
      </Badge>,
    )
    const badge = container.querySelector('.mining-sdk-badge')
    expect(badge).toHaveStyle({ transform: 'translate(calc(50% + 10px), calc(-50% + -5px))' })
  })

  it('does not apply offset transform for standalone badge', () => {
    const { container } = render(<Badge count={5} offset={[10, -5]} />)
    const badge = container.querySelector('.mining-sdk-badge')
    expect(badge).not.toHaveStyle({ transform: 'translate(calc(50% + 10px), calc(-50% + -5px))' })
  })

  it('applies standalone class when no children', () => {
    const { container } = render(<Badge count={5} />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveClass('mining-sdk-badge--standalone')
  })

  it('does not apply standalone class when children present', () => {
    const { container } = render(
      <Badge count={5}>
        <button>Button</button>
      </Badge>,
    )
    expect(container.querySelector('.mining-sdk-badge')).not.toHaveClass(
      'mining-sdk-badge--standalone',
    )
  })

  it('renders status badge', () => {
    const { container } = render(<Badge status="success" text="Online" />)
    expect(container.querySelector('.mining-sdk-badge--status')).toBeInTheDocument()
    expect(container.querySelector('.mining-sdk-badge--status-success')).toBeInTheDocument()
    expect(container.querySelector('.mining-sdk-badge')).toHaveTextContent('Online')
  })

  it('renders all status variants', () => {
    const { container, rerender } = render(<Badge status="success" />)
    expect(container.querySelector('.mining-sdk-badge--status-success')).toBeInTheDocument()

    rerender(<Badge status="processing" />)
    expect(container.querySelector('.mining-sdk-badge--status-processing')).toBeInTheDocument()

    rerender(<Badge status="error" />)
    expect(container.querySelector('.mining-sdk-badge--status-error')).toBeInTheDocument()

    rerender(<Badge status="warning" />)
    expect(container.querySelector('.mining-sdk-badge--status-warning')).toBeInTheDocument()

    rerender(<Badge status="default" />)
    expect(container.querySelector('.mining-sdk-badge--status-default')).toBeInTheDocument()
  })

  it('shows status badge even when count is 0', () => {
    const { container } = render(<Badge status="success" count={0} />)
    expect(container.querySelector('.mining-sdk-badge')).toBeInTheDocument()
  })

  it('applies custom className to badge', () => {
    const { container } = render(<Badge count={1} className="custom-badge" />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveClass('custom-badge')
  })

  it('applies wrapperClassName when children present', () => {
    const { container } = render(
      <Badge count={1} wrapperClassName="custom-wrapper">
        <button>Button</button>
      </Badge>,
    )
    expect(container.querySelector('.mining-sdk-badge-wrapper')).toHaveClass('custom-wrapper')
  })

  it('sets title attribute for accessibility', () => {
    const { container } = render(<Badge count={5} title="5 notifications" />)
    expect(container.querySelector('.mining-sdk-badge')).toHaveAttribute('title', '5 notifications')
  })

  it('adds data-has-offset attribute when offset is provided with children', () => {
    const { container } = render(
      <Badge count={5} offset={[10, -5]}>
        <button>Button</button>
      </Badge>,
    )
    expect(container.querySelector('.mining-sdk-badge-wrapper')).toHaveAttribute(
      'data-has-offset',
      'true',
    )
  })

  it('forwards ref to wrapper when children present', () => {
    const ref = vi.fn()
    render(
      <Badge count={5} ref={ref}>
        <button>Button</button>
      </Badge>,
    )
    expect(ref).toHaveBeenCalled()
  })

  it('forwards ref to badge when standalone', () => {
    const ref = vi.fn()
    render(<Badge count={5} ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('dot badge shows even with count 0', () => {
    const { container } = render(<Badge dot count={0} />)
    expect(container.querySelector('.mining-sdk-badge')).toBeInTheDocument()
  })
})
