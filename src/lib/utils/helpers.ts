export const convertTime = (date: Date, options?: object): string => {
	const convertedDate = new Date(date).toLocaleDateString(
		"en-us",
		options
			? options
			: {
					year: "numeric",
					month: "short",
					hour: "numeric",
					minute: "numeric"
			  }
	);
	return convertedDate;
};
