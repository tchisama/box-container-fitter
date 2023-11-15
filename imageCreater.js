const sharp = require('sharp');




(
    async function () {
        const CM = 200
        const width = (90 * CM)
        const height = (40 * CM)
        try{
            const newImg = await sharp({
                create: {
                    width:width,
                    height:height,
                    channels: 4,
                    background: { r: 255, g: 0, b: 0, alpha: 0.5 }
                }
            })
            .png()
            .toFile("output/newImage.png");
        }catch(err){
            console.log(err)
        }
    }
)()