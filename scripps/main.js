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
            const pos = [Math.floor(j * boxSize), Math.floor(i * boxSize)];
            const center = [pos[0] + boxSize/2, pos[1] + boxSize/2];
            const newColor = compress(ctx, pos, center, boxSize, o.value);
            setData(imageData, newColor, (i * newX.value * 4) + (j * 4));
        }
    }
    octx.putImageData(imageData, 0, 0);
    const bigOutCanva = document.getElementById("bigOutPrev");
    grow(outCanva, bigOutCanva, [canva.width, canva.height]);
}

function cross(){
    const canva = document.getElementById("outPrev");
    const ctx = canva.getContext('2d');

    const outCanva = document.getElementById("crossPrev");
    outCanva.width = newX.value;
    outCanva.height = newY.value;
    let octx = outCanva.getContext('2d');

    let imageData = octx.createImageData(canva.width, canva.height);
    let imageColors = getColors(ctx, [canva.width, canva.height]);
    console.log(imageColors);
    for (let i = 0; i < imageColors.length; i++){
        let newColor = closeColor(DMC, imageColors[i]);
        replaceColor(octx, imageData, [canva.width, canva.height], newColor, imageColors[i]);
    }
    console.log(imageData)
    octx.putImageData(imageData, 0, 0);
    const bigOutCanva = document.getElementById("bigCrossPrev");
    const bigCanva = document.getElementById("bigOutPrev");
    grow(outCanva, bigOutCanva, [bigCanva.width, bigCanva.height]);
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
    if (slide == e.target){
        scale.value = slide.value;
        scaleChange([canva.width, canva.height]);
    }
    else if (scale == e.target){
        scaleChange([canva.width, canva.height]);
    }
    else if (newX == e.target){
        scale.value = newX.value / canva.width;
        newY.value = Math.round(canva.height * scale.value);
    }
    else {
        scale.value = newY.value / canva.height;
        newX.value = Math.round(canva.width * scale.value);
    }
    slide.value = scale.value;
}

function oChange(e){
    const o = document.getElementById("o");
    const slide = document.getElementById("oSlider");
    if (slide == e.target){
        o.value = slide.value;
    }
    else {
        slide.value = o.value;
    }
}