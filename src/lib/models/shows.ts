export type Show = {
	id: string;
	user_id: number;
	title: string;
	description: string;
	view_code: string;
	public: boolean;
	created_at: Date;
	updated_at: Date;
};

export type ShowFormData = {
	title: string;
	description: string;
	view_code: string;
	public: boolean;
};
