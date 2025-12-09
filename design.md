# Design Style Guide - Stretch It Out! Math Learning App

## Design Philosophy

### Visual Language
**Modern Educational Aesthetic**: Clean, professional, and approachable design that builds confidence in mathematical learning. The visual language emphasizes clarity, accessibility, and engagement through thoughtful use of color, typography, and interactive elements.

**Mathematical Precision**: Every visual element reflects the precision and logic of mathematics while maintaining warmth and approachability for student learners.

### Color Palette

#### Primary Colors
- **Deep Blue (#1976D2)**: Primary interactive elements, headers, navigation
- **Light Blue (#64B5F6)**: Hover states, secondary buttons, slider tracks
- **Accent Blue (#1E88E5)**: Gradients, highlights, active states

#### Secondary Colors
- **Forest Green (#43A047)**: Horizontal transformations, success states, correct answers
- **Light Green (#A5D6A7)**: Green slider tracks, success backgrounds
- **Warm Yellow (#FFCA28)**: Warning states, rapid fire mode, highlights
- **Deep Yellow (#FBC02D)**: Yellow hover states

#### Neutral Colors
- **Pure White (#FFFFFF)**: Card backgrounds, content areas
- **Light Gray (#FAFAFA)**: Page backgrounds, inactive areas
- **Medium Gray (#757575)**: Secondary text, disabled buttons
- **Dark Gray (#424242)**: Primary text, headers
- **Border Gray (#E0E0E0)**: Grid lines, borders, dividers

#### Accent Colors
- **Orange (#FF9800)**: Challenge mode, power-ups, warnings
- **Purple (#9C27B0)**: Achievement badges, special elements
- **Red (#F44336)**: Error states, incorrect answers
- **Pink (#E91E63)**: Special highlights, fun elements

### Typography

#### Primary Font: Poppins (Sans-serif)
- **Headers**: Bold weights (600-800), large sizes (24px-48px)
- **Body Text**: Regular weight (400), medium sizes (14px-18px)
- **UI Elements**: Medium weight (500), consistent sizing

#### Secondary Font: Courier New (Monospace)
- **Mathematical Equations**: `y = a·f(b·x)` format
- **Code-like Elements**: Technical specifications
- **Variable Names**: Mathematical notation

#### Font Hierarchy
- **Page Titles**: 36px-48px, bold, centered
- **Section Headers**: 24px-32px, bold, left-aligned
- **Body Text**: 16px-18px, regular, optimal line-height (1.6)
- **Captions**: 14px, medium, muted color
- **Button Text**: 16px-18px, medium, white or high contrast

## Visual Effects & Animations

### Core Animation Library: Anime.js
- **Smooth Transitions**: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- **Elastic Effects**: For success states and celebrations
- **Morphing Animations**: Function graph transformations
- **Stagger Effects**: For card reveals and list animations

### Interactive Effects
- **Hover States**: Scale 1.05, shadow increase, color shifts
- **Button Press**: Scale 0.98, slight shadow reduction
- **Card Interactions**: Lift effect with increased shadow
- **Slider Interactions**: Thumb scale 1.2, track glow

### Mathematical Visualizations
- **Graph Plotting Library**: ECharts.js for all mathematical graphs
- **Real-time Updates**: 60fps smooth transitions
- **Color Coding**: Blue for vertical, green for horizontal transformations
- **Grid Systems**: Subtle gray grids (#E0E0E0) for coordinate planes

### Background Effects
- **Gradient Flows**: Subtle animated gradients for hero sections
- **Particle Systems**: Confetti for success celebrations using p5.js
- **Shader Effects**: Subtle mathematical patterns in backgrounds

## Component Specifications

### Buttons
**Primary Button**:
- Background: Linear gradient (135deg, #1976D2, #1565C0)
- Text: White, 16px medium weight
- Padding: 12px 24px
- Border-radius: 25px
- Hover: Scale 1.05, deeper shadow
- Active: Scale 0.98

**Secondary Button**:
- Background: White or light gray
- Border: 2px solid #1976D2
- Text: #1976D2, 16px medium weight
- Same padding and radius as primary

### Cards
**Standard Card**:
- Background: White
- Border-radius: 16px-24px
- Shadow: 0 4px 12px rgba(0,0,0,0.1)
- Padding: 20px-30px
- Hover: Shadow increases to 0 8px 24px rgba(0,0,0,0.15)

**Interactive Card**:
- Same as standard plus
- Cursor: pointer
- Hover: Transform translateY(-5px)

### Sliders
**Vertical Slider (Blue)**:
- Track: Linear-gradient(90deg, #64B5F6, #1E88E5)
- Track height: 12px, border-radius: 6px
- Thumb: White circle, 28px diameter, 4px border #1976D2
- Range: 0.1 to 5.0, step 0.1

**Horizontal Slider (Green)**:
- Track: Linear-gradient(90deg, #A5D6A7, #43A047)
- Same dimensions as vertical
- Thumb border: #43A047

### Graph Components
**Coordinate Plane**:
- Grid color: #E0E0E0
- Axis color: #666666
- Background: White or very light gray
- Function colors: Black (base), #2196F3 (vertical), #43A047 (horizontal)

**Interactive Elements**:
- Hover tooltips with coordinate display
- Point tracers following mouse movement
- Real-time equation updates

## Layout & Spacing

### Grid System
- **Desktop**: 12-column grid, 1200px max-width
- **Margins**: 20px-40px on page edges
- **Gutters**: 20px-30px between columns
- **Vertical Rhythm**: 24px base line-height

### Spacing Scale
- **xs**: 4px (fine details)
- **sm**: 8px (tight spacing)
- **md**: 16px (standard spacing)
- **lg**: 24px (section spacing)
- **xl**: 32px (major sections)
- **2xl**: 48px (page sections)

### Responsive Behavior
- **Fixed Layout**: Optimized for desktop (1920x1080)
- **Centered Content**: All pages centered with max-width
- **Flexible Heights**: Content areas expand to fit
- **Scroll Areas**: Long content areas with internal scrolling

## Interactive States

### Default States
- **Clean, minimal appearance**
- **Subtle shadows and borders**
- **Clear typography hierarchy**

### Hover States
- **Visual elevation**: Increased shadows
- **Scale effects**: 1.05x for buttons, 1.02x for cards
- **Color shifts**: Slight saturation increase
- **Cursor changes**: Pointer for clickable elements

### Active/Focus States
- **Scale reduction**: 0.98x for pressed buttons
- **Outline effects**: 2px outline for keyboard navigation
- **Color intensification**: Deeper colors for active states

### Success States
- **Green color scheme**: #4CAF50 backgrounds
- **Checkmark icons**: ✅ for completion
- **Celebration animations**: Confetti, bounce effects
- **Positive messaging**: "Correct!", "Well done!"

### Error States
- **Red color scheme**: #F44336 backgrounds
- **X icons**: ❌ for incorrect
- **Shake animations**: Subtle error indication
- **Helpful messaging**: "Try again!", "Hint: ..."

## Accessibility Features

### Color Accessibility
- **High contrast ratios**: Minimum 4.5:1 for all text
- **Color-blind friendly**: Patterns and icons supplement colors
- **Alternative indicators**: Shapes and text labels

### Interactive Accessibility
- **Keyboard navigation**: Tab order for all interactive elements
- **Screen reader support**: Proper ARIA labels
- **Focus indicators**: Clear visual focus states
- **Alternative text**: Descriptive alt text for images

### Cognitive Accessibility
- **Clear language**: Simple, direct instructions
- **Consistent patterns**: Repeated interaction patterns
- **Progress indicators**: Always show current state
- **Error prevention**: Clear validation and confirmation

## Implementation Notes

### Technology Stack
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript ES6+**: Modern syntax, modules
- **External Libraries**: 
  - Anime.js for animations
  - ECharts.js for graphing
  - p5.js for creative effects

### Performance Considerations
- **Optimized images**: WebP format where possible
- **Efficient animations**: GPU-accelerated transforms
- **Lazy loading**: Load content as needed
- **Minimal dependencies**: Only essential libraries

### Browser Support
- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **Desktop optimized**: Primary target platform
- **Mobile considerations**: Touch-friendly sizing

This design system ensures a cohesive, engaging, and educational experience that transforms mathematical learning into an interactive journey of discovery.