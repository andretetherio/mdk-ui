import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DeviceExplorerToolbar } from '../device-explorer-toolbar'

describe('deviceExplorerToolbar', () => {
  const mockProps = {
    filters: {},
    filterOptions: [],
    onFiltersChange: vi.fn(),
    searchOptions: [],
    searchTags: [],
    onSearchTagsChange: vi.fn(),
    deviceType: 'container' as const,
    onDeviceTypeChange: vi.fn(),
  }

  it('should render toolbar', () => {
    const { container } = render(<DeviceExplorerToolbar {...mockProps} />)
    expect(container.querySelector('.mining-sdk-device-explorer__toolbar')).toBeInTheDocument()
  })

  it('should render all device type tabs', () => {
    render(<DeviceExplorerToolbar {...mockProps} />)
    expect(screen.getByText('Containers')).toBeInTheDocument()
    expect(screen.getByText('Miners')).toBeInTheDocument()
    expect(screen.getByText('Cabinets')).toBeInTheDocument()
  })

  it('should not render filter when filterOptions is empty', () => {
    const { container } = render(<DeviceExplorerToolbar {...mockProps} />)
    expect(
      container.querySelector('.mining-sdk-device-explorer__toolbar__filter'),
    ).not.toBeInTheDocument()
  })

  it('should render filter when filterOptions are provided', () => {
    const propsWithFilters = {
      ...mockProps,
      filterOptions: [{ label: 'Status', value: 'status', children: [] }],
    }
    const { container } = render(<DeviceExplorerToolbar {...propsWithFilters} />)
    expect(
      container.querySelector('.mining-sdk-device-explorer__toolbar__filter'),
    ).toBeInTheDocument()
  })

  it('should render search input', () => {
    const { container } = render(<DeviceExplorerToolbar {...mockProps} />)
    expect(
      container.querySelector('.mining-sdk-device-explorer__toolbar__search'),
    ).toBeInTheDocument()
  })

  it('should render tabs container', () => {
    const { container } = render(<DeviceExplorerToolbar {...mockProps} />)
    expect(
      container.querySelector('.mining-sdk-device-explorer__toolbar__tabs'),
    ).toBeInTheDocument()
  })

  it('should render with miner device type', () => {
    render(<DeviceExplorerToolbar {...mockProps} deviceType="miner" />)
    expect(screen.getByText('Miners')).toBeInTheDocument()
  })

  it('should render with cabinet device type', () => {
    render(<DeviceExplorerToolbar {...mockProps} deviceType="cabinet" />)
    expect(screen.getByText('Cabinets')).toBeInTheDocument()
  })

  it('should render with search tags', () => {
    const searchTags = ['tag1', 'tag2']
    const { container } = render(<DeviceExplorerToolbar {...mockProps} searchTags={searchTags} />)
    expect(
      container.querySelector('.mining-sdk-device-explorer__toolbar__search'),
    ).toBeInTheDocument()
  })

  it('should render with filters when provided', () => {
    const filters = { status: 'active' }
    const filterOptions = [{ label: 'Status', value: 'status', children: [] }]
    const { container } = render(
      <DeviceExplorerToolbar {...mockProps} filters={filters} filterOptions={filterOptions} />,
    )
    expect(
      container.querySelector('.mining-sdk-device-explorer__toolbar__filter'),
    ).toBeInTheDocument()
  })
})
