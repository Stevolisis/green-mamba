
export const formatDate = (time:number, minHour:boolean):string => {
    const timestamp: number = 1723905599;
    const date: Date = new Date(time * 1000);

    const formattedDate: string = minHour ? 
        date.toLocaleDateString("en-US", {
                minute: "numeric",
                hour: "numeric",
                month: "short",
                day: "numeric",
                year: "numeric"
        }) :
        date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })

    return formattedDate;
}

export const formatDate2 = (time:string):string => {
    const timestamp:string = time.split("T")[0];
    const dateArray:string[] = timestamp.split("-");

    // const formattedDate: string = minHour ? 
    //     date.toLocaleDateString("en-US", {
    //             minute: "numeric",
    //             hour: "numeric",
    //             month: "short",
    //             day: "numeric",
    //             year: "numeric"
    //     }) :
    //     date.toLocaleDateString("en-US", {
    //         month: "short",
    //         day: "numeric",
    //         year: "numeric"
    //     })

    return timestamp;
}
