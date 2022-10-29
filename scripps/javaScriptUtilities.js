function openImage(file){
    let reader = new FileReader();
    let image = new Image();
    reader.addEventListener("loadend",()=>{
        image.src = reader.result;
    }, false);
    reader.readAsDataURL(file);
    return image;
}

function readText(path){
    
}

function writeText(path, data){

}

function drawOnCanvas(canva, image, size){
    canva.width = image.width;
    canva.height = image.height;
    scaleChange([image.width, image.height]);
    const ctx = canva.getContext('2d');
    ctx.drawImage(image, 0 ,0);
}

function imageSetup(canva, image){
    const ratio = image.width / image.height
    canva.height = prevHeight;
    canva.width = prevHeight * ratio;
    const ctx = canva.getContext('2d');
    ctx.drawImage(image, 0 ,0, canva.width, canva.height);
}

function getData(ctx, pos){
    const pixel =  ctx.getImageData(pos[0], pos[1], 1, 1);
    const color = [pixel.data[0], pixel.data[1], pixel.data[2], pixel.data[3]]
    return color;
}

function setData(imageData, color, pos){
    for (let i = 0; i < 3; i++){
        imageData.data[pos + i] = color[i];
    }
    imageData.data[pos + 3] = 255;
}

function grow(inCanva, outCanva, size){
    const ctx = inCanva.getContext('2d');
    outCanva.width = size[0];
    outCanva.height = size[1];
    const octx = outCanva.getContext('2d');
    let imageData = octx.createImageData(size[0], size[1]);
    const boxSize = 1 / (inCanva.width / size[0])

    for (let i = 0; i < size[1]; i++){
        for (let j = 0; j < size[0]; j++){
            const pos = [Math.floor(j / boxSize), Math.floor(i / boxSize)];
            const color = getData(ctx, pos);
            setData(imageData, color, (i * size[0] * 4) + (j * 4));
        }
    }
    octx.putImageData(imageData, 0, 0);
}

function inside(arr, element){
    for (let i = 0; i < arr.length; i++){
        let same = true;
        for (let j = 0; j < 4; j++){
            if(arr[i][j] != element[j]){
                same = false;
            }
        }
        if(same){
            return true;
        }
    }
    return false;
}

function comp(arr1, arr2){
    for (let i = 0; i < arr1.length; i++){
        if( i < arr2.length && arr1[i] != arr2[i]){
            return false;
        }
    }
    return true;
}