import { createSlice, PayloadAction, Slice, WritableDraft } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { User } from "../services/auth-api";

interface AuthState {
    isLoggedIn: boolean;
    userId: number;
    token: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    userId: 0,
    token: null
}

const authSlice: Slice<AuthState> = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: WritableDraft<AuthState>, action: PayloadAction<string>) => {
            if (state.token) {
                const token = jwtDecode<User>(state.token);
                state.userId = token.id!;
                state.isLoggedIn = true;
                state.token = action.payload;
            }
        },
        logout: (state: WritableDraft<AuthState>) => {
            state.isLoggedIn = false;
        },
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;