import Tesseract from "tesseract.js"

export async function verifyID(req, res) {
    try{
        if(!req.file) return res.status(400).send('No ID image uploaded')
        //tesseract needs the path to the img to read the image
        const idImage = req.file.path
        console.log('Received ID image for verification')
        // Perform OCR using Tesseract.js
        const ocrResult = await Tesseract.recognize(
            idImage,
            'eng'
        )
        const text = ocrResult.data.text
        function extractStudentData(text) {
            const data = {};
            //gpteed the regex
            //made some tweaks to name regex only
            // Name
            const nameMatch = text.match(/Name[\s:‘'’!`~@#$%^*)(_+="';><?/.,-]*([A-Za-z\s]+)/i)
            if (nameMatch) data.name = nameMatch[1].replace(/[\r\n].*$/g, '').trim();
            // Card No
            const cardMatch = text.match(/Card No\.\s*(\d+)/i);
            if (cardMatch) data.cardNo = cardMatch[1].trim();
            // Roll No
            const rollMatch = text.match(/Roll No\.\s*['"]?\s*(.+)/i);
            if (rollMatch) data.roll = rollMatch[1].trim();
            // Programme
            const progMatch = text.match(/Programme\s*[:\-]?\s*(.+)/i);
            if (progMatch) data.course = progMatch[1].trim();
            // Date of Birth
            const dobMatch = text.match(/Date of Birth\s*[-:]?\s*(\d{4}\/\d{2}\/\d{2})/i);
            if (dobMatch) data.dob = dobMatch[1].trim();
            // Valid Till / Expiry
            const expiryMatch = text.match(/Valid Ti.*[-:]?\s*(\d{4}\/\d{2}\/\d{2})/i);
            if (expiryMatch) data.expiry = expiryMatch[1].trim();
            return data;
          }

console.log(extractStudentData(text));
    }
    catch(err){
        console.log(err)
        res.status(500).send('Server error during ID verification')
    }
}
