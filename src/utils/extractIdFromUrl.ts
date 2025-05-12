const extractIdFromUrl = (url: string): number => {
    const parts = Number(url.split("/")[6]);
    return parts;
}

export default extractIdFromUrl;