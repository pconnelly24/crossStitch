function compress(pixels, pos, center, size, imageSize, o){

    let totalPercent = 0;
    let maxDist = dist(center, pos);

    for (let i = 0; i < size; i++){
        for (let j = 0; j < size; j++){
            let curPos = [pos[0] + i, pos[1] + j];
            let curDist = dist(center, curPos);
            if (curDist > maxDist){
                maxDist = curDist;
            }
        }
    }

    for (let i = 0; i < size; i++){
        for (let j = 0; j < size; j++){
            let curPos = [pos[0] + i, pos[1] + j];
            let curDist = dist(center, curPos);
            totalPercent += distribute(curDist / maxDist, o);
        }
    }

    let outColor = [0, 0, 0];
    // let pixels = ctx.getImageData(pos[0], pos[1], size, size);

    for (let i = 0; i < size; i++){
        for (let j = 0; j < size; j++){
            let curPos = [pos[0] + i, pos[1] + j];
            let curDist = dist(center, curPos); 
            let percent = distribute(curDist / maxDist, o);
            percent = percent / totalPercent;

            // let pixel = ctx.getImageData(curPos[0], curPos[1], 1, 1);
            // let curColor = [pixel.data[0], pixel.data[1], pixel.data[2]];
            // let curColor = [pixels.data[(i * size * 4) + (j * 4)], pixels.data[(i * size * 4) + (j * 4) + 1], pixels.data[(i * size * 4) + (j * 4) + 2]]
            let toPos = (curPos[0] * 4) + (curPos[1] * imageSize * 4)
            let curColor = [pixels.data[toPos], pixels.data[toPos + 1], pixels.data[toPos + 2]]

            for (let k = 0; k < 3; k++){
                outColor[k] += curColor[k] * percent;
            }
        }
    }

    for (let k = 0; k < 3; k++){
        outColor[k] = Math.round(outColor[k]);
    }
    return outColor;
}
// Help
function closeColor(posColors, inColor){
    let bestColor = posColors[0][1];
    let bestDist = distance(posColors[0][1], inColor);

    for (let i = 0; i < posColors.length; i++){
        const curDist = distance(posColors[i][1], inColor);
        if(curDist < bestDist){
            bestColor = posColors[i][1];
            bestDist = curDist;
        }
    }
    return bestColor;
}

function distance(color1, color2){
    const r = (color1[0] + color2[0]) / 2;

    let delta = [0, 0, 0];
    for (let i = 0; i < 3; i++){
        delta[i] = color1[i] - color2[i];
    }
    const offset = [2 + (r / 256), 4, 2 + ((255 - r) / 256)];

    let dist = [0, 0, 0];
    for (let i = 0; i < 3; i++){
        dist[i] = offset[i] * Math.pow(delta[i], 2);
    }
    return sum(dist);
}

function sum(arr){
    let total = 0;
    for (let i = 0; i < arr.length; i++){
        total += arr[i];
    }
    return total;
}
// To fix 
function replaceColor(ctx, imageData, size, newColor, oldColor){
    for (let i = 0; i < size[1]; i++){
        for (let j = 0; j < size[0]; j++){
            let color = getData(ctx, [j, i]);

            if(comp(color, oldColor)){
                setData(imageData, newColor, (i * size[0] * 4) + (j * 4));
            }
        }
    }
}   

function getColors(pixels, size){
    let colors = [];

    for (let i = 0; i < pixels.data.length; i+=4){
        const curColor = [pixels.data[i], pixels.data[i + 1], pixels.data[i + 2], pixels.data[i + 3]];
        if(curColor[3] > 0 && !inside(colors, curColor)){
            colors.push(curColor);
        }
    }

    // for (let i = 0; i < size[0]; i++){
    //     for (let j = 0; j < size[1]; j++){

    //         // let curColor = getData(ctx, [i, j]);
    //         const curColor = pixels[]

    //         if(curColor[3] > 0 && !inside(colors, curColor)){
    //             colors.push(curColor);
    //         }
    //     }
    // }

    return colors;
}
function outColors(colorDir, idDir, outFile, colors){
    // ids = []
    // for color in colors:
    //     colorIndex = colorDir.index((color[0], color[1], color[2]))
    //     ids.append(idDir[colorIndex])
    // changed = True
    // while(changed):
    //     changed = False
    //     for i in range(len(ids)-1):
    //         if(ids[i]>ids[i+1]):
    //             holder = ids[i]
    //             ids[i] = ids[i+1]
    //             ids[i+1] = holder
    //             changed = True
    // for i in ids:
    //     outFile.write(str(i)+"\n")
}
    
function opacity(ctx, size, fade){
    for (let i = 0; i < size[0]; i++){
        for (let j = 0; j < size[1]; j++){
            let curColor = getData(ctx, [i, j]);
            for (let k = 0; k < 3; k++){
                imageData.data[(i * size[0] * 4) + (j * 4) + k] = curColor[k];
            }
            imageData.data[(i * size[0] * 4) + (j * 4) + 3] = fade;
        }
    }

    return image;
}