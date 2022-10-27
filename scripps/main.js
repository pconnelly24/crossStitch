function loadPreview(){
    const canva = document.getElementById("inPrev");
    const file = document.getElementById("inFile");

    let image = openImage(file.files[0]);
    image.onload = function(){ drawOnCanvas(canva, image); }
}
function shrink(){
    let newX = document.getElementById("newX");
    let newY = document.getElementById("newY");
    let scale = document.getElementById("newScale");
    let o = document.getElementById("o");

    let canva = document.getElementById("inPrev");
    let ctx = canva.getContext('2d');

    let outCanva = document.getElementById("outPrev");
    outCanva.width = newX.value;
    outCanva.height = newY.value;
    let octx = outCanva.getContext('2d');
    let imageData = octx.createImageData(newX.value, newY.value);
    let boxSize = Math.ceil(1 / scale.value);

    for (let i = 0; i < outCanva.height; i++){
        for (let j = 0; j < outCanva.width; j++){
            let pos = [j * boxSize, i * boxSize];
            let center = [pos[0] + Math.floor(boxSize/2), pos[1] + Math.floor(boxSize/2)];
            let newColor = compress(ctx, pos, center, boxSize, o.value);
            for (let k = 0; k < 3; k++){
                imageData.data[(i * outCanva.width * 4) + (j * 4) + k] = newColor[k];
            }
            imageData.data[(i * outCanva.width * 4) + (j * 4) + 3] = 255;
        }
    }
    octx.putImageData(imageData, 0, 0);
}