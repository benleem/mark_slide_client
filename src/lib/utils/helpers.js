export const convertTime = (date, options) => {
    const convertedDate = new Date(date).toLocaleDateString("en-us", options
        ? options
        : {
            year: "numeric",
            month: "short",
            hour: "numeric",
            minute: "numeric"
        });
    return convertedDate;
};
//# sourceMappingURL=helpers.js.map