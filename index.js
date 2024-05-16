const dropArea = document.querySelector(".drag-area");
const dragText = document.querySelector(".header");

let button = dropArea.querySelector(".button");
let input = dropArea.querySelector("input");

let files = [];

button.onclick = () => {
    input.click();
};

// When browse
input.addEventListener("change", function () {
    addFiles([...this.files]);
    dropArea.classList.add("active");
    displayFiles();
});

// When file is inside drag area
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload";
});

// When file leaves the drag area
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop";
});

// When file is dropped
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    addFiles([...event.dataTransfer.files]);
    dropArea.classList.add("active");
    displayFiles();
});

// Function to add files to the array
function addFiles(newFiles) {
    newFiles.forEach(file => {
        if (!files.some(existingFile => existingFile.name === file.name && existingFile.size === file.size)) {
            files.push(file);
        }
    });
}

// Function to display files
function displayFiles() {
    let fileListHTML = ""; // Initialize an empty string to store HTML for file list
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    
    files.forEach(file => {
        let fileType = file.type;
        if (validExtensions.includes(fileType)) {
            fileListHTML += `<div>${file.name}</div>`; // Add file name to the HTML
        } else {
            alert(`${file.name} is not a valid file type`);
            files = files.filter(f => f.name !== file.name); // Remove invalid file
        }
    });
    // Display the file list
    document.getElementById("file-list").innerHTML = fileListHTML;
}

// Function to upload files
function uploadFiles() {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files[]', file);
    });

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Files uploaded successfully', data);
    })
    .catch(error => {
        console.error('Error uploading files', error);
    });
}

// Add an upload button and event listener
const uploadButton = document.createElement('button');
uploadButton.textContent = 'Upload Files';
uploadButton.onclick = uploadFiles;
document.body.appendChild(uploadButton);
