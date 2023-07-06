const crypto = require("crypto");

function stringToHex(str) {
    const buffer = Buffer.from(str, "utf8");
    return buffer.toString("hex");
}


const encryptUrl = (url) => {
    // console.log(url)
    const randomHexBefore = crypto.randomBytes(4).toString("hex");
    const randomHexAfter = crypto.randomBytes(8).toString("hex");

    // const inputString = "https://youtu.be/9FMcX8Lqu1g";
    const hexString = stringToHex(url);
    // console.log("hexString ",hexString);
    // console.log(hexString.length);
    // console.log(hexString.substring(0, 28));
    // console.log(hexString.substring(28, 56));

    // return the below string
    const encryptedURL = randomHexBefore + hexString.substring(0, 28) + randomHexAfter + hexString.substring(28, 56)
    return encryptedURL;

}

module.exports = encryptUrl