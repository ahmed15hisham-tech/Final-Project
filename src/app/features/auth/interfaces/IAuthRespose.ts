export interface User {
	name: string;
	email: string;
	role: string;
}

export interface IAuthRespose {
	message: string;
	user: User;
	token: string;
}