// @ts-nocheck
export interface AuthState {
	authLoading: boolean;
	isAuthenticated: boolean;
	accessToken: string | null;
	error: boolean;
	userData: any;
}
