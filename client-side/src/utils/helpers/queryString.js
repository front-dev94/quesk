export const queryString = (data) => {
    let output = "";

    for (const [key, value] of Object.entries(data)) {
        output = output + key+"="+value+"&"
    }

    output = output.substring(0, output.length-1);
    return output;
}

