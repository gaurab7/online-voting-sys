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
        console.log('OCR Text:', text)
    }
    catch(err){
        console.log(err)
        res.status(500).send('Server error during ID verification')
    }
}
