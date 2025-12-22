import { createSelector } from "@reduxjs/toolkit";

const getAuth = (state => state.auth)

export const authSelector = createSelector(getAuth, (state) => state.isAuthenticated);