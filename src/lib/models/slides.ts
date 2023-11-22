export type Slide = {
	id: string;
	show_id: string;
	user_id: number;
	index_number: number;
	content: string;
	created_at: Date;
	updated_at: Date;
};

export type TestSlide = {
	id: string;
	content: string;
	index_number: number;
};

export type UpdateSlideData = {
	index_number: number;
	content: string;
};

export type CreateSlideData = {
	show_id: string;
	content: string;
	index_number: number;
};

export type DeleteSlideBody = {
	slide_index: number;
	show_id: string;
};
