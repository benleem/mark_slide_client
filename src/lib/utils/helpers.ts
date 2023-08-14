export const convertTime = (date: Date) => {
    let convertedDate = new Date(date).toLocaleDateString('en-us', {year:"numeric", month:"short", hour:"numeric", minute:"numeric"});
    return convertedDate
}

export const timeSince = (date: Date) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - date.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysPassed;
}





