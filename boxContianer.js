function fitContainer(cWidth, cHeight, buckets) {
    // Sort buckets
    const sortedBuckets = buckets.sort((a, b) => b.size - a.size);
    const container = initializeContainer(cWidth, cHeight);
    const placedElements = [];

    addElement(0, 0, container, sortedBuckets, 0, placedElements);

    return placedElements;
}

function initializeContainer(cWidth, cHeight) {
    return Array.from({ length: cHeight }, () => Array(cWidth).fill("⬛"));
}

function addElement(x, y, container, buckets, i, placedElements) {
    if (i === buckets.length) {
        placedElements.push({ x, y, width: buckets[i - 1].size, height: buckets[i - 1].size, img: buckets[i - 1].img });
        return;
    }

    const size = buckets[i].size;

    for (let loopY = 0; loopY < size; loopY++) {
        for (let loopX = 0; loopX < size; loopX++) {
            if (container[loopY + y] && container[loopY + y][loopX + x]) {
                container[loopY + y][loopX + x] = buckets[i].img;
            }
        }
    }

    placedElements.push({ x, y, width: size, height: size, img: buckets[i].img });

    const nextIndex = i + 1;

    if (nextIndex < buckets.length) {
        const nextSize = buckets[nextIndex].size;

        for (let newY = 0; newY <= container.length - nextSize; newY++) {
            for (let newX = 0; newX <= container[0].length - nextSize; newX++) {
                const canPlace = checkPlacement(container, newX, newY, nextSize);
                if (canPlace) {
                    addElement(newX, newY, container, buckets, nextIndex, placedElements);
                    return;
                }
            }
        }
    }
}

function checkPlacement(container, x, y, size) {
    for (let checkY = 0; checkY < size; checkY++) {
        for (let checkX = 0; checkX < size; checkX++) {
            if (container[y + checkY] && container[y + checkY][x + checkX] !== "⬛") {
                return false;
            }
        }
    }

    return true;
}



exports.fitContainer = fitContainer;















































// function fitContainer(cWidth,cHeight,bucket){
//     // sort buckets 
//     const sortedBuckets = bucket.sort((a,b)=>b.width-a.width)
//     const container = []
//     for (let y = 0; y < cHeight; y++) {
//         const row = []
//         for (let x = 0; x < cHeight; x++) {
//             row.push("⬛")
//         }
//         container.push(row)
//     }

//     return AddElement(0,0,container,sortedBuckets,0)
// }

// function AddElement (x,y,container,buckets,i){
//     if(i==buckets.length){
//         return container
//     } 
//     const w = buckets[i].width
//     for (let loopY = 0; loopY < w; loopY++) {
//         for (let loopX = 0; loopX < w; loopX++) {
//             container[loopY+y][loopX+x]=buckets[i].name
//         }
//     }
//     if(i+1<=buckets.length){
//         const wOfNext = buckets[i+1]?.width
//         if(w+x+wOfNext<=container[0].length){
//             AddElement(x+w,y,container,buckets,i+1)
//         }else{
//             let checkX = 0
//             while(container[y+w][x-checkX]=="⬛"){
//                 checkX--
//             }
//             let checkY = 0
//             while(container[y+w+checkY][x+checkX-1]!=="⬛"){
//                 checkY++
//             }
//             console.log(checkY)
//             if(buckets[i].w<=checkY){
//                 AddElement(x+checkX,y+w,container,buckets,i+1)
//             }
//         }
//     }

//     return {container }
// }


// const containerWidth = 30;
// const containerHeight = 30;

// const buckets = [
//     {width:9,name:"🟩"},
//     {width:9,name:"🟥"},
//     {width:6,name:"🟪"},
//     {width:6,name:"🟨"},
//     {width:3,name:"⬜"},
//     {width:3,name:"🟫"},
//     {width:6,name:"🟧"},
// ]

// const result = fitContainer(containerWidth,containerHeight,buckets)
// console.log(result.container.map(a=>a.join("")))