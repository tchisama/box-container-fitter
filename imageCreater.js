const sharp = require('sharp');
const { fitContainer } = require('./boxContianer');


const CM = 50;
const width = 27 * CM;
const height = 40 * CM;
const borderSize = .02 * CM;
const spacing = .2 * CM;
const buckets = [
    { size: 6, img: "imgs/1.svg" },
    { size: 6, img: "imgs/2.svg" },
    { size: 3, img: "imgs/3.svg" },
    { size: 6, img: "imgs/4.svg" },
    { size: 6, img: "imgs/5.svg" },
    { size: 9, img: "imgs/6.svg" },
    { size: 27, img: "imgs/7.svg" },
    { size: 2, img: "imgs/7.svg" },
];

const positions = fitContainer(width / CM, height/CM, buckets);
console.log(positions)


async function main () {

    try {
        // Create the base image with a red semi-transparent background
        const baseImage = await sharp({
            create: {
                width: width,
                height: height,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            }
        }).png().toBuffer();
        // Load the overlay image (replace 'path/to/overlay.png' with your actual file path)
        const stickers = []
        for (let i = 0; i < positions.length; i++) {
            const overlayImage = await sharp(positions[i].img)
                .resize({ width: (positions[i].width * CM)-(spacing *2) , height: (positions[i].height * CM)-(spacing *2), fit: 'contain' })
                .extend({
                    top: borderSize,
                    bottom: borderSize,
                    left: borderSize,
                    right: borderSize,
                    background: { r: 0, g: 0, b: 0, alpha: 1 } 
                })
                .toBuffer();
            // Specify the position and size of the overlay
            const overlayOptions = {
                top: positions[i].y * CM + spacing,    // Specify the top position in pixels
                left: positions[i].x * CM + spacing,  // Specify the left position in pixels
            };
            stickers.push({input:overlayImage, ...overlayOptions})
        }
        // Composite the overlay onto the base image
        const compositeImage = await sharp(baseImage)
            .composite(stickers)
            .toFile(`output/finalImage-.png`)
            .then(() => {
                console.log('Image created successfully.');
            })
            .catch((err) => {
                console.error('Error creating image:', err);
            });
    } catch (err) {
        console.error(err);
    }
}



main()

