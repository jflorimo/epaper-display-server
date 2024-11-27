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


export function generateHtmlFromTemplate(templatePath: string, outputPath: string, data: any) {
    try {
        // Read the template file
        const template = fs.readFileSync(templatePath, 'utf-8');

        // Replace placeholders in the template
        console.log(data)
        const result = template.replace(/{{\s*([\w]+)\s*}}/g, (match, key) => {
            // if (key in data)
            console.log("match: ", match)
            console.log("key:", key)
            console.log(key in data)
            return key in data ? data[key] : match; // Replace if key exists, otherwise keep original
        });


        // Write the output to a new file
        fs.writeFileSync(outputPath, result, 'utf-8');
        console.log(`Generated HTML written to ${outputPath}`);
    } catch (error: any) {
        console.error("Error processing template:", error.message);
    }
}