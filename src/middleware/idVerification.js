import Tesseract from "tesseract.js"
import Quagga from "@ericblade/quagga2"
const JimpModule = await import('jimp')
import fs from 'fs'

const Jimp = JimpModule.default

export async function verifyID(req, res) {
    try{
        //this is a very basic check just to see if the id is valid
        if(!req.file) return res.status(400).send('No ID image uploaded')

        //tesseract needs the path to the img to read the image
        const idImage = req.file.path
        console.log(idImage)
        console.log('Received ID image for verification')
        
        // Perform OCR using Tesseract.js
        const ocrResult = await Tesseract.recognize(idImage, 'eng')
        const text = ocrResult.data.text

        //tessaract isnt 100% accurate so regex has to be used
        // it sometimes misreads characters or misses them out or has incorrect characters
        function extractStudentData(text) {
            const data = {} 
            //gpteed the regex
            //made some tweaks to name regex only
            // Name
            const nameMatch = text.match(/Name[\s:‘'’!`~@#$%^*)(_+="' ><?/.,-]*([A-Za-z\s]+)/i)
            if (nameMatch) data.name = nameMatch[1].replace(/[\r\n].*$/g, '').trim() 
            // Card No
            const cardMatch = text.match(/Card No\.\s*(\d+)/i) 
            if (cardMatch) data.cardNo = cardMatch[1].trim() 
            // Roll No
            const rollMatch = text.match(/Roll No\.\s*['"]?\s*(.+)/i) 
            if (rollMatch) data.roll = rollMatch[1].trim() 
            // Programme
            const progMatch = text.match(/Programme\s*[:\-]?\s*(.+)/i) 
            if (progMatch) data.course = progMatch[1].trim() 
            // Date of Birth
            const dobMatch = text.match(/Date of Birth\s*[-:]?\s*(\d{4}\/\d{2}\/\d{2})/i) 
            if (dobMatch) data.dob = dobMatch[1].trim() 
            // Valid Till / Expiry
            const expiryMatch = text.match(/Valid Ti.*[-:]?\s*(\d{4}\/\d{2}\/\d{2})/i) 
            if (expiryMatch) data.expiry = expiryMatch[1].trim() 
            return data 
          }
        console.log(extractStudentData(text))

            //check barcode
        async function checkBarcode(img){
            try{
                const imageBuffer = fs.readFileSync(img);
        const base64Image = imageBuffer.toString('base64');
                             //quagga to read the barcode
           
            Quagga.decodeSingle({
                    src: 'data:image/jpeg;base64,' + base64Image, 
                    numOfWorkers: 0,  // Needs to be 0 when used in node
                    inputStream: {
                        size: 1000  // restrict input-size to be 800px in width (long-side)
                    },
                    decoder: {
                        readers: ["code_39_reader", "code_128_reader","code_39_vin_reader"] // reads code 39 barcodes which is what the id i am referencing uses
                    }
                },
                    function(result){
                        //result is the object returned by quagga
                        // it has codeResult property which has the text value of the barcode
                        //line, box and angle are othe properties
                        if(result && result.codeResult){
                            console.log(result)
                        }
                        else{
                            console.log("not detected")
                        }
                    })
            }
            catch(err){
                console.log(err)
            }

        }
        await checkBarcode(idImage)
    }
    catch(err){
        console.log(err)
        res.status(500).send('Server error during ID verification')
    }
}
