export type User = {
	id: number;
	name: string;
	username: string;
	email?: string;
	avatar_url: string;
	profile_url: string;
	created_at?: Date;
	updated_at?: Date;
};
