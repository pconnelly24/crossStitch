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