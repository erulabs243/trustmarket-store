export interface UserSession {
	id: string;
	email: string;
	lastLogged: string;
	isLogged: string;
	cookieId?: string;
}
