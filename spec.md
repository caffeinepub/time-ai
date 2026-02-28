# Specification

## Summary
**Goal:** Fix the blank-screen issue on the `/operations/user-management` page by replacing silent loading states with visible feedback and adding safeguards to prevent stuck loaders.

**Planned changes:**
- Remove all `return null` and blank/early returns that occur while `roleLoading` or `backendLoading` are true in `UserManagement.tsx`
- Render a centered loading state (with page layout and nav visible) showing the title "User Management" and message "Loading permissions & users..." with a spinner during loading
- Add an 8-second hard timeout failsafe that forcibly sets both loading flags to false and displays an error box with the message "Still loading role/backend after 8s. Please refresh." plus debug output of the current boolean values
- Wrap every async load path in `try/finally` blocks to guarantee `setRoleLoading(false)` and `setBackendLoading(false)` are always called, preventing permanently stuck loading states

**User-visible outcome:** The User Management page no longer shows a blank screen while loading; users see a spinner with a status message, and if loading takes too long, a clear error message prompts them to refresh.
