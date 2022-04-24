function queryObject(q, data){
    if (!q) {
        return data;
    } else {
    var results = [];
    console.log(q)
    for (const [key, value] of Object.entries(data)) {
        for (const xyz of Object.entries(data[key])) {
        let found = JSON.stringify(data[key]).toLowerCase().includes(String(q).toLowerCase())
        if (found) {
            const index = results.findIndex(object => object.id === data[key].id);
            if (index === -1) { results.push(data[key]) }
        }
        console.log("Found ", results.length>0?results.length:0, " Results")
        // console.log(results)
        }
    }
    if (results.length>=1) {
        return results
    }
    else {
        return [{Name: "No Matches"}];
    }
    }
}

module.exports = { queryObject }