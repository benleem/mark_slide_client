
export type Slide = {
	id: string;
	show_id: number;
	user_id: number;
	content: string;
	created_at: Date;
	updated_at: Date;
};

export type SlideFormData = {
	content: string;
};
