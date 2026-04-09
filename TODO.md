# Performance Improvements & Admin Dashboard Upgrade Plan

## Approved Goals
✅ Improve frontend performance (memoization, virtualization for lists/tables).
✅ Upgrade AdminDashboard to match backend API endpoints (/admin/login, /admin/addofficer, /displaystudents etc.).
✅ Consistent theme across all dashboards (metrics cards, tables, search bars).
✅ Backend integration for real data fetching (students, employers, officers lists, delete).

## Steps (to be marked [x] when complete)

### 1. Update Context & API for Admin Endpoints [x]
✅ Updated src/context/PlacementDataContext.jsx: Added students/employers/officers state, loadAdminData with backend fetches, deleteStudent/deleteEmployer/deleteOfficer, integrated addUserByAdmin refresh.

### 2. Create Admin User Management Components [ ]
- Update src/components/admin/UserManagement.jsx → expand to AdminUsersManagement.jsx with tabs for Students/Employers/Officers.
- Add tables for all 3 types with backend fetch/delete.
- Add useMemo, React.memo for perf.

### 3. Upgrade AdminDashboard Layout & Theme [x]
✅ Updated src/components/dashboards/AdminDashboard.jsx: Tabs Overview/Users/Settings, integrated UserManagement/PlacementDataOverview/SystemSettings, consistent theme with gradient banner & icons.

### 4. Add Virtualization to Tables/Lists [ ]
- `npm i @tanstack/react-virtual lodash.debounce`
- Create src/components/common/VirtualTable.jsx.

### 5. Performance Optimizations [ ]
- useMemo/useCallback everywhere.
- Lazy routes.

### 6. Consistent Theme Across All Dashboards [ ]
- Update others.

### 7. Testing [ ]

Next step: Implement step 2 (UserManagement expansion for all user types).


