export const sortData = (data) => {
    const sortedData = [...data];

    //loop through entire list then sort it
    sortedData.sort((a,b) => {
        //if a is greater than b
        if (a.cases > b.cases){
            //return false
            return -1;
        }else{
            return 1;
        }
    });
    
    return sortedData;
}