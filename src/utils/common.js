export const truncateString = (str, length) => {
    const nextIndex = str.indexOf(' ', length);
    return nextIndex !== -1 ? `${str.slice(0, nextIndex)}...` : str;
}