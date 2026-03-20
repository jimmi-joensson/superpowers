# Design Review Checklists

Detailed evaluation criteria for Foundation and Refinement modes.

## Foundation Mode Checklist

Use early in project to establish direction.

### Typography Audit
- [ ] Font family chosen and applied consistently
- [ ] Type scale defined (sizes for each level)
- [ ] Weight system established (when to use each)
- [ ] Line heights set appropriately
- [ ] Hierarchy reads clearly on key screens

### Spacing Audit
- [ ] Base unit chosen (4px or 8px grid)
- [ ] Component internal padding consistent
- [ ] Screen margins defined
- [ ] Section spacing establishes rhythm
- [ ] Touch targets meet minimums

### Color Audit
- [ ] Palette defined with clear roles
- [ ] Primary accent chosen
- [ ] Text colors meet contrast requirements
- [ ] Semantic colors assigned (success, error, warning)
- [ ] Dark/light mode considered

### Layout Audit
- [ ] Grid or alignment system visible
- [ ] Safe areas respected
- [ ] Responsive behavior planned
- [ ] Key screens have clear visual hierarchy

### Output Format

```markdown
## Foundation Review: [Screen Name]

### Strengths
- [What's working well]

### Recommendations
1. **Typography**: [Specific suggestion]
2. **Spacing**: [Specific suggestion]
3. **Color**: [Specific suggestion]

### Inspiration Reference
- [Link or description of relevant examples]
```

## Refinement Mode Checklist

Use before shipping to polish details.

### Pixel-Level Review
- [ ] All text aligned to baseline grid
- [ ] Icons optically centered
- [ ] Spacing mathematically consistent
- [ ] Border radius uniform
- [ ] Shadows/glows consistent

### Consistency Review
- [ ] Same components look identical across screens
- [ ] Color tokens used (no hardcoded values)
- [ ] Typography tokens used
- [ ] Spacing tokens used
- [ ] States styled consistently (hover, active, disabled)

### State Review
- [ ] Loading states polished
- [ ] Empty states designed (not just text)
- [ ] Error states helpful and styled
- [ ] Disabled states visible but muted
- [ ] Selected/active states clear

### Motion Review
- [ ] Transitions feel smooth
- [ ] Duration appropriate (not too slow)
- [ ] Easing curves consistent
- [ ] Reduced motion respected

### Platform Polish
- [ ] iOS conventions followed (if iOS)
- [ ] Android conventions followed (if Android)
- [ ] Web responsive breakpoints handled correctly (if web)
- [ ] Safe areas properly handled
- [ ] System UI integration correct

### Accessibility Review
- [ ] Contrast ratios pass WCAG AA
- [ ] Touch targets adequate
- [ ] Focus states visible
- [ ] Screen reader labels present
- [ ] Keyboard navigation works correctly (web)

### Output Format

```markdown
## Refinement Review: [Screen Name]

### Issues Found

#### Critical (Must Fix)
1. [Issue]: [Location] — [How to fix]

#### Polish (Should Fix)
1. [Issue]: [Location] — [How to fix]

#### Minor (Nice to Have)
1. [Issue]: [Location] — [How to fix]

### Token Deviations
- [Element] uses [actual] but system defines [expected]
```

## Comparison Template

When comparing against inspiration or design system:

```markdown
## Comparison: [Your Screen] vs [Reference]

| Aspect | Reference | Current | Gap |
|--------|-----------|---------|-----|
| Typography scale | 12/14/18/24 | 12/16/20/28 | Inconsistent ratios |
| Primary spacing | 8px base | Mixed | Not on grid |
| ... | ... | ... | ... |

### Recommendations
1. [Specific actionable change]
```
