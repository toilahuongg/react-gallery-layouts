# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.1] - 2025-04-18

### Added
- Alignment options for StackGallery component (flex-start, center, flex-end)

### Changed
- Converted StackGallery from CSS Grid to Flexbox for better layout control
- Updated alignment in StackGallery to apply to the entire container instead of individual items
- Improved responsive behavior for items that span multiple columns

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

## [0.1.0] - 2025-04-17

### Added
- Initial release of the gallery library

### Changed
- Completely rewrote the `MasonryGallery` component to use CSS Grid instead of Flexbox
- Improved support for items that span multiple columns horizontally
- Enhanced the algorithm for optimal item placement in the masonry layout
- Better handling of aspect ratios for gallery items

### Fixed
- Fixed issues with horizontally expanding items in the masonry layout
- Improved item positioning and alignment in the gallery
- Fixed spacing calculations between items in masonry layout 