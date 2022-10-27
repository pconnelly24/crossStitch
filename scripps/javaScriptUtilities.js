function openImage(file, image){
    let reader = new FileReader();
    reader.addEventListener("loadend",()=>{
        image.src = reader.result;
    }, false);
    reader.readAsDataURL(file)
}