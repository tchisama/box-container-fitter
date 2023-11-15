const sharp = require('sharp');








(async function () {
    const CM = 300;
    const width = 27 * CM;
    const height = 40 * CM;

    try {
        // Create the base image with a red semi-transparent background
        const baseImage = await sharp({
            create: {
                width: width,
                height: height,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 1 }
            }
        }).png().toBuffer();
        const borderSize = .02 * CM;
        // Load the overlay image (replace 'path/to/overlay.png' with your actual file path)
        const stickers = []
        for (let i = 0; i < 3; i++) {
            const overlayImage = await sharp('imgs/image1.png')
                .resize({ width: 9 * CM, height: 9 * CM, fit: 'contain' })
                .extend({
                    top: borderSize,
                    bottom: borderSize,
                    left: borderSize,
                    right: borderSize,
                    background: { r: 255, g: 255, b: 255, alpha: 1 } 
                })
                .toBuffer();
            // Specify the position and size of the overlay
            const overlayOptions = {
                top: 0,    // Specify the top position in pixels
                left: i * (9 * CM  ) ,  // Specify the left position in pixels
            };
            stickers.push({input:overlayImage, ...overlayOptions})
        }
        // Composite the overlay onto the base image
        const compositeImage = await sharp(baseImage)
            .composite(stickers)
            .toFile(`output/finalImage-${Date.now()}.png`)
            .then(() => {
                console.log('Image created successfully.');
            })
            .catch((err) => {
                console.error('Error creating image:', err);
            });
    } catch (err) {
        console.error(err);
    }
})();