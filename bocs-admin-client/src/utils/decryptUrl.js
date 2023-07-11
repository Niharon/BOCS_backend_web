import { Buffer } from 'buffer';
function hexToString(hex) {
    const buffer = Buffer.from(hex, "hex");
    return buffer.toString("utf8");
}

const decryptUrl = (encryptedURL) => {

    // const hexString = encryptedURL.substring(8, encryptedURL.length - 16);
    
    const url = hexToString(encryptedURL.substring(8, 36) + encryptedURL.substring(52, 80));

    return url;
};


// import crypto from "crypto"

// const decryptUrl = (encryptedURL, key) => {
//     const algorithm = 'aes-256-cbc';
//     const iv = Buffer.from(encryptedURL.substring(0, 32), 'hex');
//     const encrypted = encryptedURL.substring(32);

//     const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
//     let decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');

//     return decrypted;
// };

// // Example usage:
// const encryptedURL = '6d62ce6e1c8948b2e464294825b5f37e7a76ca5404beb4eefad1c5218efba9bc26ac1e4cb53d9c9e33c305ecafb98887f663d9a215cc4ed49d67a1b9249d86ed';
// const key = 'b958d3dc070be0764ab4d7d45ea466164c41b99f8d19ed46cc92d6a9c8b2be4f';
// const decryptedURL = decryptUrl(encryptedURL, key);
// console.log('Decrypted URL:', decryptedURL);


export default decryptUrl