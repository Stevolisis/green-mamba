
export const formatDate = (time:number):string => {
    const timestamp: number = 1723905599;
    const date: Date = new Date(timestamp * 1000);

    const formattedDate: string = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
    });

    return formattedDate;
}
