
export type Slide = {
	id: string;
	show_id: number;
	user_id: number;
    index_number: number;
	content: string;
	created_at: Date;
	updated_at: Date;
};

export type SlideFormData = {
    id: string;
    index_number: number;
    content: string;
}

export type CreateSlideData = {
    show_id: number;
	content: string;
    index_number: number;
};


export type DeleteSlideParams = {
    id: string;
    user_id: number;
	show_id: number;
};
