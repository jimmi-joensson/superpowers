# Platform Conventions

Key patterns for iOS, Android, and Web. For detailed specs, fetch Apple HIG or Material docs.

## iOS (Human Interface Guidelines)

### Navigation
- Tab bar at bottom (max 5 items)
- Navigation bar at top with back arrow (left)
- Large titles collapse on scroll
- Swipe from left edge = back

### Components
- Rounded rectangles (not sharp corners)
- SF Symbols for icons
- Segmented controls for switching views
- Action sheets slide from bottom

### Spacing
- Safe areas: respect notch, home indicator
- Standard margins: 16px (compact), 20px (regular)
- Touch targets: 44×44pt minimum

### Motion
- Spring animations (bouncy, not linear)
- Interactive dismissal (swipe down modals)
- Haptic feedback on key actions

### Typography
- SF Pro (system font)
- Dynamic Type support expected
- Text styles: largeTitle, title1-3, headline, body, callout, footnote, caption

### Red Flags (iOS)
- Android-style components (FAB, hamburger menu)
- Sharp corners on interactive elements
- Missing safe area handling
- Non-standard back navigation

## Android (Material Design 3)

### Navigation
- Bottom navigation or nav drawer
- Top app bar with optional FAB
- Back via system gesture or button
- Tabs below top app bar

### Components
- FAB for primary action
- Cards with subtle elevation
- Chips for filters/selections
- Bottom sheets for contextual actions

### Spacing
- 4dp grid baseline
- Standard margins: 16dp
- Touch targets: 48×48dp minimum

### Motion
- Emphasized easing (not linear)
- Container transforms for navigation
- Shared element transitions

### Typography
- Roboto or custom (via Google Fonts)
- Type scale: display, headline, title, body, label

### Red Flags (Android)
- iOS-style tab bar at bottom with labels always visible
- Swipe-to-go-back as primary navigation
- Missing Material components (using custom when standard exists)

## Web

### Navigation
- Top navigation bar for primary sections
- Sidebar navigation for complex apps or dashboards
- Breadcrumbs for deep hierarchies
- Responsive hamburger menu for mobile viewports
- Footer navigation for secondary links and site maps

### Components
- Buttons: clear primary/secondary/tertiary hierarchy
- Cards: consistent elevation and border treatment
- Modals: centered overlay with backdrop, trap focus inside
- Dropdowns: consistent trigger styling, keyboard navigable
- Forms: clear labels, inline validation, logical tab order

### Responsive
- Mobile-first approach: design for smallest viewport, enhance upward
- Common breakpoints: mobile (<768px), tablet (768–1024px), desktop (>1024px)
- Fluid layouts between breakpoints, not just snapping at thresholds
- Images and media scale appropriately (max-width: 100%)
- Navigation collapses gracefully at smaller viewports

### Spacing
- CSS Grid and Flexbox for layout structure
- Consistent use of rem/em units for scalability
- Body text minimum 16px (1rem) to prevent mobile zoom
- Container max-width for readability on wide screens (typically 1200–1440px)
- Consistent spacing scale using CSS custom properties or utility classes

### Typography
- System font stacks for performance: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Web fonts via Google Fonts or `@font-face` with proper fallbacks
- Responsive font sizing using clamp() or media queries
- Ensure `font-display: swap` to avoid invisible text during load
- Respect user font-size preferences (use rem, not px for body text)

### Red Flags (Web)
- Not responsive — layout breaks at common viewport widths
- No hover states on interactive elements
- No focus indicators for keyboard navigation
- Broken layout at standard breakpoints (320px, 768px, 1024px, 1440px)
- Horizontal scroll on mobile viewports
- Text unreadable on mobile without zooming
- Missing skip-to-content link for accessibility

## Cross-Platform Considerations

### Acceptable Differences
- Navigation patterns (tab bar vs nav drawer vs top nav bar)
- System fonts
- Platform-specific gestures
- Component styling details
- Web-specific hover states not present on mobile
- Responsive layout shifts on web that don't apply to native

### Should Be Consistent
- Brand colors and identity
- Core user experience and flows
- Content and information architecture
- Iconography meaning (even if style differs)
- Accessibility standards across all platforms

### Common Pitfalls
- Forcing iOS patterns on Android (or vice versa)
- Porting native mobile patterns directly to web without adaptation
- Ignoring platform-specific accessibility features
- Different feature sets between platforms
- Inconsistent terminology
- Web version missing responsive design for mobile browsers
- Native app ignoring web conventions when using WebViews
