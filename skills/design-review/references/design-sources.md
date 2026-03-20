# Design Sources

How to obtain, extract, and compare against various design sources during review.

## Design Source Types

### 1. Figma MCP

Use Figma MCP to pull design specs directly from Figma files when available.

**When to use**: The project has Figma designs and Figma MCP is configured.

**How to use**:
- Check if Figma MCP is available in the current environment
- Use it to inspect specific components, frames, or pages
- Extract exact values: colors (hex/rgba), spacing (px), typography (font, size, weight, line-height)
- Pull design tokens if defined in the Figma file
- Compare extracted values against implementation

**What to extract**:
- Component dimensions and padding
- Color values for backgrounds, text, borders
- Typography specs: font family, size, weight, line-height, letter-spacing
- Spacing between elements
- Border radius, shadow values, opacity

**Fallback**: If Figma MCP is not available, ask for exported design specs or screenshots.

### 2. Screenshot / Mockup Images

Compare against exported design images when Figma access is unavailable.

**When to use**: Designer provides PNG/JPG mockups, or you need to compare visual output.

**How to use**:
- Place reference image and current implementation side by side
- Work systematically: layout structure first, then details
- Use browser DevTools or screenshot tools to capture current state at matching viewport size
- Compare element by element, section by section

**Comparison approach**:
1. **Structure**: Does the overall layout match? Column count, section order, grouping
2. **Typography**: Do headings, body text, and labels match in size, weight, and color?
3. **Color**: Are background colors, text colors, and accents correct?
4. **Spacing**: Do margins, padding, and gaps between elements match?
5. **Details**: Border radius, shadows, icons, images, dividers

**Fallback**: If mockups are low resolution, focus on structural and proportional accuracy rather than pixel-perfect matching.

### 3. Design Spec Documents

Projects may include structured design specifications in code or documentation.

**When to use**: The project has `design-tokens.json`, `PLAN.md`, style guides, or similar spec docs.

**How to use**:
- Locate spec files in the project (check root, `/docs`, `/design`, or config directories)
- Parse design tokens: map token names to CSS properties or style values
- Cross-reference implementation against documented specs
- Flag any deviations between spec and implementation

**Common spec formats**:
- `design-tokens.json` — structured color, spacing, typography tokens
- `PLAN.md` or `DESIGN.md` — prose descriptions of intended design
- CSS custom properties files — `:root` variable definitions
- Tailwind/theme config — design system encoded in framework config
- Style dictionary files — platform-agnostic design tokens

**Extraction pattern**:
```
Spec token → Expected value → Actual value in code → Match/Deviation
```

**Fallback**: If no formal spec exists, infer intended design from the most polished or recently updated screens.

### 4. Reference Implementations

Use an existing page or component within the project as the design reference.

**When to use**: No external design exists, but one screen/component is the "gold standard."

**How to use**:
- Identify the reference screen or component (ask the user if unclear)
- Capture or inspect the reference: screenshot it, inspect its styles, note its patterns
- Extract the implicit design system: spacing values, colors, typography, component patterns
- Apply those patterns as the standard for reviewing other screens

**What to document from reference**:
- Typography scale (what sizes and weights are used, and where)
- Color palette (what colors appear and their roles)
- Spacing rhythm (what gaps are used between elements)
- Component patterns (how cards, buttons, lists, etc. are styled)

**Fallback**: If no single reference is clearly superior, identify the most consistent patterns across multiple screens.

### 5. Browser / App MCP

Use browser MCP or device automation to capture and inspect the current state of the application.

**When to use**: You need to see the live rendered output, not just the code.

**How to use**:
- **Browser MCP**: Navigate to the target URL, capture screenshots at specific viewport sizes, inspect computed styles
- **Maestro MCP**: For native mobile apps, automate navigation to specific screens and capture screenshots
- Compare captured state against design source (Figma, mockups, or specs)

**Capture checklist**:
- Screenshot at standard viewports (mobile: 375px, tablet: 768px, desktop: 1440px)
- Capture interactive states if possible (hover, focus, active, error)
- Note any differences between dev environment and production rendering

**Fallback**: If no browser/app MCP is available, ask the user to provide screenshots or use local development server with manual inspection.

## Comparison Methodology

### Systematic Comparison Order

Always compare in this priority order — structural issues matter more than pixel details:

1. **Layout & Structure** — Is the overall page structure correct? Grid, sections, ordering
2. **Typography** — Are fonts, sizes, weights, and line-heights correct?
3. **Color** — Are all colors accurate? Backgrounds, text, borders, accents
4. **Spacing** — Are margins, padding, and gaps between elements correct?
5. **Component Details** — Border radius, shadows, icons, images, dividers
6. **Interactive States** — Hover, focus, active, disabled, error states
7. **Responsive Behavior** — Does it adapt correctly across viewport sizes?

### Prioritization

| Priority | Category | Example |
|----------|----------|---------|
| **Critical** | Structural issues | Wrong layout, missing sections, broken flow |
| **High** | Typography errors | Wrong font, significantly wrong sizes |
| **High** | Color errors | Wrong brand colors, contrast failures |
| **Medium** | Spacing issues | Inconsistent padding, wrong margins |
| **Low** | Micro-details | 1px shadow differences, slight radius mismatch |

### When to Accept "Close Enough"

Accept minor deviations when:
- The difference is less than 2px on spacing
- Color values are within a few shades (e.g., `#333` vs `#2d2d2d`)
- The visual result is perceptually identical at normal viewing distance
- Platform rendering differences cause sub-pixel variations

Iterate further when:
- The visual rhythm or balance is noticeably off
- Brand colors are clearly wrong
- Typography hierarchy doesn't read correctly
- Layout structure deviates from the design intent
- Accessibility standards are not met

## Extraction Patterns

### From Figma
```
Component → Inspect panel → Properties
├── Fill → background-color / color
├── Stroke → border
├── Effects → box-shadow, filter
├── Text → font-family, font-size, font-weight, line-height, letter-spacing
├── Auto Layout → display: flex, gap, padding
└── Constraints → positioning, responsiveness
```

### From Mockup Images
```
Visual Inspection → Identify patterns
├── Alignment edges → grid columns, margins
├── Repeating gaps → spacing unit (likely 4px or 8px based)
├── Text sizes → estimate relative scale (compare to known elements)
├── Colors → use color picker tool or eyedropper
└── Proportions → aspect ratios of images, cards, containers
```

### From Spec Documents
```
Token file → Map to implementation
├── color.primary → --color-primary / theme.colors.primary
├── spacing.md → --spacing-md / theme.spacing.md
├── font.body.size → --font-size-body / theme.fontSize.body
├── radius.default → --radius-default / theme.borderRadius.default
└── shadow.card → --shadow-card / theme.boxShadow.card
```

### From Reference Implementations
```
Inspect reference → Document implicit system
├── Computed styles → actual CSS values in use
├── Recurring values → the implicit design tokens
├── Component patterns → reusable structure and styling
├── State treatments → how hover, focus, error are handled
└── Responsive behavior → how layout shifts across breakpoints
```
