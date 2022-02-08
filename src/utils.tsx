
/* 

Returns the input fields defined in the algorithm description.

*/
export const parseAlgoInputs = (body: any) => {
    body = JSON.parse(body)
    let inputs: any[] = body["wps:ProcessOfferings"]["wps:ProcessOffering"]["wps:Process"]["wps:Input"]
    return inputs
}


/*

Returns the description for a given algorithm

*/
export const parseAlgoDesc = (body: any) => {
    body = JSON.parse(body)
    let description: String = body["wps:ProcessOfferings"]["wps:ProcessOffering"]["wps:Process"]["ows:Title"]
    return description
}


/*

Returns status for given job id

*/
export const parseJobStatus = (body: any) => {
    body = JSON.parse(body)
    let status: String = body["wps:StatusInfo"]["wps:Status"]
    return status
}


/* Recursively retrieves all unique science keywords */
export const parseScienceKeywords = (keywords: any) => {
    var scienceKeywords: string[] = []
    console.log("Parsing science keywords...")
    console.log(keywords["ScienceKeyword"])

    _getAllValues(keywords, scienceKeywords)
    return scienceKeywords
}

const _getAllValues = (keywords: any, scienceKeywords : string[]) => {
    for (let k in keywords) {
        if (typeof keywords[k] === "object") {
            _getAllValues(keywords[k], scienceKeywords)
        } else {
            // base case, stop recurring
            if (!scienceKeywords.includes(keywords[k]))
                scienceKeywords.push(keywords[k])
        }
    }
}