import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accountType: null,
  permissions: [],
  isOwner: false,
  organization: null,
  isAuthenticated: false,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      const { user, accountType, permissions, isOwner, organization } =
        action.payload;
      state.user = user;
      state.accountType = accountType;
      state.permissions = permissions || [];
      state.isOwner = isOwner || false;
      state.organization = organization || null;
      state.isAuthenticated = true;
      state.isHydrated = true;
    },
    clearAuth(state) {
      Object.assign(state, { ...initialState, isHydrated: true });
    },
    setHydrated(state) {
      state.isHydrated = true;
    },
  },
});

export const { setAuth, clearAuth, setHydrated } = authSlice.actions;
export default authSlice.reducer;
