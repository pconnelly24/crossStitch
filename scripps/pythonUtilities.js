function compress(ctx, pos, center, size, o){

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

    for (let i = 0; i < size; i++){
        for (let j = 0; j < size; j++){
            let curPos = [pos[0] + i, pos[1] + j];
            let curDist = dist(center, curPos); 
            let percent = distribute(curDist / maxDist, o);
            percent = percent / totalPercent;

            let pixel =  ctx.getImageData(curPos[0], curPos[1], 1, 1);
            let curColor = [pixel.data[0], pixel.data[1], pixel.data[2]];
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