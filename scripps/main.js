const spreadOffset = 4;
const spreadColumn = 'B';
const squareSize = 20;
let globalColorList = "";
const stepLevel = ["stepOne", "stepTwo", "stepThree", "stepFour"];
const pages = ["pageOne", "pageTwo"];
const prevHeight = 200;
let fileName = "";

function startUp(){
    showHide(1);
    document.getElementById("pageOne").style.display = 'block';
}

function showHide(level){
    for (let i = 0; i < level; i++){
        let step = document.getElementById(stepLevel[i]);
        step.style.display = 'block';
    }
    for (let i = level; i < stepLevel.length; i++){
        let step = document.getElementById(stepLevel[i]);
        step.style.display = 'none';
    }
}

function pageChange(e){
    for (let i = 0; i < pages.length; i++){
        let page = document.getElementById(pages[i]);
        page.style.display = 'none';
    }
    let page = document.getElementById(pages[e.target.value]);
    page.style.display = 'block';
}

function saveImage(){
    let button = document.getElementById("saveButton");
    button.click();
}

function loadPreview(){
    const canva = document.getElementById("inPrev");
    const realCanva = document.getElementById("inRealPrev");
    const file = document.getElementById("inFile");

    let image = openImage(file.files[0]);
    image.onload = function(){ 
        drawOnCanvas(canva, image); 
        imageSetup(realCanva, image)
    }

    showHide(2);
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
    const realCanva = document.getElementById("inRealPrev");
    grow(outCanva, bigOutCanva, [realCanva.width, realCanva.height]);

    // Perchance
    cross();
}

function cross(){
    const canva = document.getElementById("outPrev");
    const ctx = canva.getContext('2d');

    const outCanva = document.getElementById("crossPrev");
    outCanva.width = newX.value;
    outCanva.height = newY.value;
    let octx = outCanva.getContext('2d');

    let imageData = octx.createImageData(canva.width, canva.height);
    const imageColors = getColors(ctx, [canva.width, canva.height]);

    for (let i = 0; i < imageColors.length; i++){
        let newColor = closeColor(DMC, imageColors[i]);
        replaceColor(ctx, imageData, [canva.width, canva.height], newColor, imageColors[i]);
    }

    octx.putImageData(imageData, 0, 0);
    const bigOutCanva = document.getElementById("bigCrossPrev");
    const bigCanva = document.getElementById("bigOutPrev");
    grow(outCanva, bigOutCanva, [bigCanva.width, bigCanva.height]);

    showHide(3);

    let save = document.getElementById("saveButton");
    save.setAttribute('download', "cross_" + fileName);
    save.setAttribute('href', outCanva.toDataURL("image/png"))
}

function justCopy(){
    navigator.clipboard.writeText(globalColorList);
}

function copyList(){
    const canva = document.getElementById("crossPrev");
    const ctx = canva.getContext('2d');
    const imageColors = getColors(ctx, [canva.width, canva.height]);
    globalColorList = "";
    let colors = [];

    for (let i = 0; i < DMC.length; i++){
        for (let j = 0; j < imageColors.length; j++){
            if (comp(imageColors[j], DMC[i][1])){
                globalColorList += "=($" + spreadColumn + Number(spreadOffset + i) + ")";
                colors.push(DMC[i]);
            }
        }
        globalColorList += "\n";
    }

    justCopy();

    const colorList = document.getElementById("colorList");
    while (colorList.childElementCount > 0){
        colorList.removeChild(colorList.firstChild)
    }
    for (let i = 0; i < colors.length; i++){
        let row = document.createElement("tr");

        let tableDataId = document.createElement("td");
        tableDataId.innerHTML = colors[i][0]
        row.appendChild(tableDataId);

        let tableDataCanva = document.createElement("canvas");
        tableDataCanva.width = squareSize;
        tableDataCanva.height = squareSize;
        let ctx = tableDataCanva.getContext('2d');
        ctx.fillStyle = 'rgb('+colors[i][1][0]+','+colors[i][1][1]+','+colors[i][1][2]+')';
        ctx.fillRect(0, 0, tableDataCanva.width, tableDataCanva.height);
        row.appendChild(tableDataCanva);

        colorList.appendChild(row);
    }

    showHide(4);
}

function scaleChange(size){
    const scale = document.getElementById("newScale");
    newX.value = Math.floor(size[0] * scale.value);
    newY.value = Math.floor(size[1] * scale.value);
}

function sizeChange(e){
    showHide(2);
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
    showHide(2);

    const o = document.getElementById("o");
    const slide = document.getElementById("oSlider");
    if (slide == e.target){
        o.value = slide.value;
    }
    else {
        slide.value = o.value;
    }
}