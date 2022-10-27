function loadPreview(){
    const canva = document.getElementById("inPrev");
    const file = document.getElementById("inFile");

    let image = openImage(file.files[0]);
    image.onload = function(){ drawOnCanvas(canva, image); }
    let stepTwo = document.getElementById("stepTwo");
    stepTwo.style.display = 'block';
}

function shrink(){
    const newX = document.getElementById("newX");
    const newY = document.getElementById("newY");
    const scale = document.getElementById("newScale");
    const o = document.getElementById("o");

    const canva = document.getElementById("inPrev");
    // How to Fix?
    const ctx = canva.getContext('2d', { willReadFrequently: true });
    // console.log(ctx.getContextAttributes());

    const outCanva = document.getElementById("outPrev");
    outCanva.width = newX.value;
    outCanva.height = newY.value;
    let octx = outCanva.getContext('2d');
    let imageData = octx.createImageData(newX.value, newY.value);
    const boxSize = 1 / scale.value;
    for (let i = 0; i < newY.value; i++){
        for (let j = 0; j < newX.value; j++){
            const pos = [Math.round(j * boxSize), Math.round(i * boxSize)];
            const center = [pos[0] + boxSize/2, pos[1] + boxSize/2];
            const newColor = compress(ctx, pos, center, boxSize, o.value);
            for (let k = 0; k < 3; k++){
                imageData.data[(i * newX.value * 4) + (j * 4) + k] = newColor[k];
            }
            imageData.data[(i * newX.value * 4) + (j * 4) + 3] = 255;
        }
    }
    octx.putImageData(imageData, 0, 0);
}

function scaleChange(size){
    const scale = document.getElementById("newScale");
    newX.value = Math.floor(size[0] * scale.value);
    newY.value = Math.floor(size[1] * scale.value);
}

function sizeChange(e){
    const newX = document.getElementById("newX");
    const newY = document.getElementById("newY");
    const scale = document.getElementById("newScale");
    const slide = document.getElementById("newScaleSlide");
    const canva = document.getElementById("inPrev");
    if(slide == e.target){
        scale.value = slide.value;
        scaleChange([canva.width, canva.height]);
    }
    else if(scale == e.target){
        scaleChange([canva.width, canva.height]);
    }
    else if(newX == e.target){
        scale.value = newX.value / canva.width;
        newY.value = Math.round(canva.height * scale.value);
    }
    else{
        scale.value = newY.value / canva.width;
        newX.value = Math.round(canva.width * scale.value);
    }
    slide.value = scale.value;
}