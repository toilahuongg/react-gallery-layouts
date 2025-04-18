# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.9] - 2025-04-18

### Updated
- Added style file to package

## [0.2.8] - 2025-04-18

### Updated
- Added containerWidth prop to MasonryGallery component
- Added aspectRatio support to GridGallery component
  - Support for global aspectRatio prop
  - Support for individual item aspectRatio
  - Automatic height calculation based on aspect ratio
  - Fallback to fixed height when aspect ratio is not specified 

### Changed
- Rewrote MasonryGallery layout algorithm to use absolute positioning
- Improved MasonryGallery performance with pixel-based calculations
- Enhanced MasonryGallery responsive behavior
- Optimized MasonryGallery gutter handling

## [0.2.7] - 2025-04-18

### Added
- Added lazyLoad prop to renderItem function in MasonryGallery component
- Added lazyLoad prop to renderItem function in GridGallery component
- Added lazyLoad prop to renderItem function in JustifiedGallery component
- Added lazyLoad prop to renderItem function in StackGallery component

## [0.2.6] - 2025-04-18

### Added
- Added containerWidth prop to GridGallery component

## [0.2.5] - 2025-04-18

### Fixed
- Fixed MasonryGallery layout issues

## [0.2.2] - 2025-04-18

### Added
- Zustand integration for state management
- Custom renderer example in ExampleGallery
- Added `useWindowResize` hook with debounce functionality
- Added TypeScript type definitions
- Added grid cell dimensions state management
- Added debounced window resize handling
- Added CSS modules for better style organization

### Changed
- Converted StackGallery from CSS Grid to Flexbox for better layout control
- Updated alignment in StackGallery to apply to the entire container
- Improved responsive behavior for items
- Optimized calculations with memoized dimensions
- Improved hover effects with combined style updates
- Enhanced type safety with explicit types
- Refactored logic to use state-based dimensions
- Improved performance by reducing DOM operations
- Moved inline styles to separate CSS file
- Optimized component performance with useMemo
- Improved code organization and maintainability
- Enhanced type safety with proper TypeScript types

## [0.2.1] - 2025-04-18

### Added
- Alignment options for StackGallery component (flex-start, center, flex-end)

### Changed
- Completely rewrote the `MasonryGallery` component to use CSS Grid
- Improved support for items that span multiple columns
- Enhanced the algorithm for optimal item placement
- Better handling of aspect ratios for gallery items

### Fixed
- Fixed grid snapping issues
- Fixed memory leaks in event listeners
- Fixed type safety issues in handlers
- Fixed linter errors
- Fixed style inconsistencies
- Fixed hover state transitions

## [0.2.0] - 2025-04-17

### Added
- Comprehensive documentation for all component props
- Added GitHub Actions workflow for automated npm publishing
- Improved TypeScript type definitions with detailed JSDoc comments

### Changed
- Updated README with default values for all component props
- Enhanced documentation for the GalleryItem interface
- Improved MasonryGallery responsive handling

### Fixed
- Fixed TypeScript type definitions accuracy
- Added missing documentation for containerWidth property

## [0.1.0] - 2024-03-20

### Added
- Initial release
- Basic gallery layout functionality
- Support for different layout types (grid, masonry, etc.)
- Lazy loading support
- Responsive design
- Touch device support
- Customizable item rendering
- TypeScript support
- Example implementation
- Documentation

## [Unreleased]

### Added
- Added aspectRatio support to GridGallery component
  - Support for global aspectRatio prop
  - Support for individual item aspectRatio
  - Automatic height calculation based on aspect ratio
  - Fallback to fixed height when aspect ratio is not specified 