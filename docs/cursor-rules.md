# Cursor Rules for Battery Dashboard Project

## Rule 1: KISS (Keep It Simple, Stupid)

**ALWAYS follow the KISS principle:**

- ✅ **DO**: Use simple, static implementations
- ✅ **DO**: Use inline styles instead of complex CSS frameworks
- ✅ **DO**: Avoid complex imports and dependencies
- ✅ **DO**: Use basic React components without external libraries
- ✅ **DO**: Keep the code readable and straightforward

- ❌ **DON'T**: Add complex state management
- ❌ **DON'T**: Use external CSS frameworks that cause blank pages
- ❌ **DON'T**: Import complex SDKs or libraries
- ❌ **DON'T**: Over-engineer solutions
- ❌ **DON'T**: Add unnecessary abstractions

**When in doubt, choose the simplest solution that works.**

## Rule 2: Minimal Markup

**Keep markup minimal and clean:**

- ✅ **DO**: Use simple HTML elements
- ✅ **DO**: Use inline styles for styling
- ✅ **DO**: Keep component structure flat and simple
- ✅ **DO**: Use basic div, p, h1, h2, img elements
- ✅ **DO**: Avoid complex nested structures

- ❌ **DON'T**: Use complex CSS classes or frameworks
- ❌ **DON'T**: Create deeply nested component hierarchies
- ❌ **DON'T**: Use complex layout systems
- ❌ **DON'T**: Add unnecessary wrapper elements
- ❌ **DON'T**: Over-complicate the DOM structure

**Example of good minimal markup:**
```jsx
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'blue', fontSize: '24px' }}>Battery Dashboard</h1>
      <p>Simple content here</p>
    </div>
  );
}
```

## Project Context

This is a **Battery Dashboard** project that displays battery information with:
- Battery image visualization
- Battery details panel
- Simple, clean interface
- No complex dependencies

**Remember: If it causes a blank page, it's too complex. Revert to simple.**
