const dropArea = document.querySelector(".drag-area");
const dragText = document.querySelector(".header");

let button = dropArea.querySelector(".button");
let input = dropArea.querySelector("input");

let file =[] 

button.onclick = () => {
    input.click();
};

// when browse
input.addEventListener("change", function () {
    file = [...this.files];
    dropArea.classList.add("active");
    displayFiles();
});

// when file is inside drag area
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload";
    // console.log('File is inside the drag area');
});

// when file leave the drag area
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    // console.log('File left the drag area');
    dragText.textContent = "Drag & Drop";
  });

// when file is dropped
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    // console.log('File is dropped in drag area');
    file = [...event.dataTransfer.files]; // grab single file even of user selects multiple files
    dropArea.classList.add("active");
    // console.log(file);
    displayFiles();
  });

//   function displayFiles() {
//     files.forEach(file => {
//         let fileType = file.type;

//         // console.log(fileType);
//         let validExtensions = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
//         if (validExtensions.includes(fileType)) {
//           // console.log('This is an image file');
//           let fileReader = new FileReader();
//           fileReader.onload = () => {
//             let fileURL = fileReader.result;
//             // console.log(fileURL);
//             let imgTag = `<img src="${fileURL}" alt="">`;
//             dropArea.innerHTML = imgTag;
//           };
//           fileReader.readAsDataURL(file);
//         } else {
//           alert("This is not an Image File");
//           dropArea.classList.remove("active");
//         }
//     })
    
//   }

  function displayFiles() {
    let fileListHTML = ""; // Initialize an empty string to store HTML for file list
    files.forEach(file => {
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
        if (validExtensions.includes(fileType)) {
            fileListHTML += `<div>${file.name}</div>`; // Add file name to the HTML
            fileReader.readAsDataURL(file);
        } else {
            alert("Some files are not Image Files");
            dropArea.classList.remove("active");
        }
    });
    // Display the file list
    document.getElementById("file-list").innerHTML = fileListHTML;
}