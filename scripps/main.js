function openImage(){
    const imageHolder = document.getElementById("inFile");
    const inPrev = document.getElementById("inPrev");

    let reader = new FileReader();

    reader.addEventListener("loadend",()=>{
        inPrev.src = reader.result;
    }, false);

    reader.readAsDataURL(imageHolder.files[0])
    document.body.appendChild(inPrev);
}