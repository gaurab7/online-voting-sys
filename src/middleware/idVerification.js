import Tesseract from "tesseract.js"
import Quagga from 'quagga'

async function verifyID(req, res) {
    try{
        if(!req.body.formData) return res.status(400).send('No ID image uploaded')
        const idImage = req.body.formData.id
        console.log('Received ID image for verification')
        // Perform OCR using Tesseract.js
        const ocrResult = await Tesseract.recognize(
            idImage,
            'eng',
            { logger: m => console.log(m) }
        )
        const text = ocrResult.data.text
        console.log('OCR Text:', text)
    }
    catch(err){
        console.log(err)
        res.status(500).send('Server error during ID verification')
    }
}
