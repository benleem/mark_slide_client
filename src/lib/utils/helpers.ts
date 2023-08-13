export const convertTime = (date: Date) => {
    let convertedDate = new Date(date).toLocaleDateString('en-us', {year:"numeric", month:"short", hour:"numeric", minute:"numeric"});
    return convertedDate
}





