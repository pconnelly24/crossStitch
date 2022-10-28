function openImage(file){
    let reader = new FileReader();
    let image = new Image();
    reader.addEventListener("loadend",()=>{
        image.src = reader.result;
    }, false);
    reader.readAsDataURL(file);
    return image;
}

function drawOnCanvas(canva, image){
    canva.width = image.width;
    canva.height = image.height;
    scaleChange([image.width, image.height]);
    const ctx = canva.getContext('2d');
    ctx.drawImage(image, 0 ,0);
}

function getData(ctx, pos){
    const pixel =  ctx.getImageData(pos[0], pos[1], 1, 1);
    const color = [pixel.data[0], pixel.data[1], pixel.data[2]]
    return color;
}

function setData(imageData, color, pos){
    for (let i = 0; i < 3; i++){
        imageData.data[pos + i] = color[i];
    }
    imageData.data[pos + 3] = 255;
}