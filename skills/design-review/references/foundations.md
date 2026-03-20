# Design Foundations

Universal principles for evaluating UI design. Apply regardless of specific design system.

## Typography

### Hierarchy
- **One dominant element** per screen (usually title or key action)
- Clear size steps: ~1.25× ratio between levels (e.g., 12→15→19→24)
- Weight reinforces hierarchy: heavier = more important

### Consistency
- Same size/weight for same-level elements across screens
- Body text: one size, one weight throughout app
- Headers: predictable pattern (screen title, section title, subsection)

### Readability
- Body text: 16px minimum for web and mobile
- Line height: 1.4-1.6× font size for body text
- Measure: 45-75 characters per line ideal

### Red Flags
- Multiple font sizes that serve same purpose
- Weights used inconsistently (bold sometimes, semibold others)
- Text too small for comfortable reading
- No clear visual priority

## Spacing

### Rhythm
- Use consistent base unit (4px or 8px increments)
- Related items: smaller gaps (8-12px)
- Unrelated sections: larger gaps (24-32px)
- Space communicates grouping

### Breathing Room
- Don't crowd edges — minimum 16px from screen edge
- Content should feel "contained" not "cramped"
- Empty space is intentional, not leftover

### Density
- Touch targets: minimum 44×44pt (iOS) / 48×48dp (Android)
- Web: clickable areas should be minimum 44×44px for touch devices, links should have adequate padding
- List items: enough height for comfortable tapping
- Match density to use case (glanceable vs detailed)

### Red Flags
- Inconsistent padding between similar components
- Elements touching or nearly touching
- Cramped layouts with no breathing room
- Gaps that don't follow a pattern

## Color

### Contrast
- WCAG AA minimum: 4.5:1 for body text, 3:1 for large text
- Test against actual background colors used
- Consider reduced transparency overlays

### Semantic Usage
- Primary action = primary color (one per screen ideally)
- Destructive = red/danger consistently
- Interactive elements distinguishable from static

### Hierarchy Through Color
- Most important = highest contrast or accent color
- Secondary = muted or lower contrast
- Disabled = clearly reduced (but still readable)

### Red Flags
- Low contrast text (especially on images/gradients)
- Multiple competing accent colors
- Inconsistent semantic meaning (red sometimes danger, sometimes accent)
- Color alone conveying meaning (accessibility issue)

## Layout

### Alignment
- Establish clear vertical edges (usually left-aligned in LTR)
- Elements should align to invisible grid
- Intentional breaks from alignment draw attention

### Balance
- Visual weight distributed appropriately
- Heavy elements (images, buttons) balanced by space or other elements
- Avoid lopsided compositions

### Visual Flow
- Eye should move naturally through content
- Most important → supporting details → actions
- F-pattern or Z-pattern for scanning

### Red Flags
- Ragged alignments (elements slightly off)
- All content pushed to one side
- No clear reading order
- Competing focal points
