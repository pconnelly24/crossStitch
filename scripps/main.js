function loadPreview(){
    const canva = document.getElementById("inPrev");
    const file = document.getElementById("inFile");

    let image = openImage(file.files[0]);
    image.onload = function(){ drawOnCanvas(canva, image); }
}
function shrink(){
    let canva = document.getElementById("inPrev");
}
function compress(){

}