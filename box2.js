function fitContainer(cWidth, cHeight, buckets) {
    // Sort buckets
    const sortedBuckets = buckets.sort((a, b) => b.width - a.width);
    const container = initializeContainer(cWidth, cHeight);

    return addElement(0, 0, container, sortedBuckets, 0);
}

function initializeContainer(cWidth, cHeight) {
    return Array.from({ length: cHeight }, () => Array(cWidth).fill("⬛"));
}

function addElement(x, y, container, buckets, i) {
    if (i === buckets.length) {
        return { container };
    }

    const width = buckets[i].width;

    for (let loopY = 0; loopY < width; loopY++) {
        for (let loopX = 0; loopX < width; loopX++) {
            if (container[loopY + y] && container[loopY + y][loopX + x]) {
                container[loopY + y][loopX + x] = buckets[i].name;
            }
        }
    }

    const nextIndex = i + 1;

    if (nextIndex < buckets.length) {
        const nextWidth = buckets[nextIndex].width;

        for (let newY = 0; newY <= container.length - nextWidth; newY++) {
            for (let newX = 0; newX <= container[0].length - nextWidth; newX++) {
                const canPlace = checkPlacement(container, newX, newY, nextWidth);
                if (canPlace) {
                    return addElement(newX, newY, container, buckets, nextIndex);
                }
            }
        }
    }

    return { container };
}

function checkPlacement(container, x, y, width) {
    for (let checkY = 0; checkY < width; checkY++) {
        for (let checkX = 0; checkX < width; checkX++) {
            if (container[y + checkY] && container[y + checkY][x + checkX] !== "⬛") {
                return false;
            }
        }
    }

    return true;
}

const containerWidth = 24;
const containerHeight = 40;

const buckets = [
    { width: 3, name: "🟦" },
    { width: 6, name: "🟧" },
    { width: 9, name: "🟩" },
    { width: 9, name: "♊" },
    { width: 6, name: "🟪" },
    { width: 3, name: "🧡" },
    { width: 6, name: "🧡" },
    { width: 3, name: "🟦" },
];



const result = fitContainer(containerWidth, containerHeight, buckets);
console.log(result.container.map(row => row.join("")));
