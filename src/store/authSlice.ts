import { createSlice, PayloadAction, Slice, WritableDraft } from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null
}

const authSlice: Slice<AuthState> = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: WritableDraft<AuthState>, action: PayloadAction<string>) => {
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        logout: (state: WritableDraft<AuthState>) => {
            state.isLoggedIn = false;
        },
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;