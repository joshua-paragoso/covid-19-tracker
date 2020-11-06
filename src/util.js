export const sortData = (data) => {
    const sortedData = [...data];

    //loop through entire list then sort it
    sortedData.sort((a,b) => {
        if (a.cases > b.cases){
            return -1;
        }else{
            return 1;
        }
    });
    
    return sortedData;
}