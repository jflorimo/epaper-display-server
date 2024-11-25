import fs from 'fs'

/**
 * Writes Base64 binary data to a file.
 * @param base64Data - The Base64-encoded string.
 * @param outputPath - The path where the file will be saved.
 */
function writeBase64ToFile(base64Data: string, outputPath: string): void {
    try {
        // Decode the Base64 string into a Buffer
        const binaryData = Buffer.from(base64Data, 'base64');

        // Write the binary data to the file
        fs.writeFileSync(outputPath, binaryData);

        console.log(`File written successfully to ${outputPath}`);
    } catch (error) {
        console.error('Error writing Base64 data to file:', error);
    }
}