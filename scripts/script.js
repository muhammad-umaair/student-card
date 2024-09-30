document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("student-form")
    .addEventListener("input", function (event) {
      updatePreview();
    });

  document
    .getElementById("student-image")
    .addEventListener("change", function (event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var imageData = e.target.result;
        var studentImageSVG = document.getElementById("student-image-svg");
        if (studentImageSVG) {
          studentImageSVG.setAttribute("xlink:href", imageData);
          console.log("studentImageSVG123", studentImageSVG);
        }
      };
      reader.readAsDataURL(file);
    });

  document
    .getElementById("download-button")
    .addEventListener("click", function (event) {
      event.preventDefault();
      updatePreview();

      generatePDF();
    });
  updatePreview();
});

// function updatePreview() {
//     var studentName = document.getElementById("student-name").value;
//     var fatherName = document.getElementById("father-name").value;
//     var motherName = document.getElementById("mother-name").value;
//     var addressName = document.getElementById("address-name").value;
//     var bloodName = document.getElementById("blood-type").value;

//     var studentNameText = document.getElementById("student-name-text");
//     var fatherNameText = document.getElementById("father-name-text");
//     var motherNameText = document.getElementById("mother-name-text");
//     var addressText = document.getElementById("address-name-text");
//     var bloodText = document.getElementById("blood-name-text");

//     if (studentNameText) studentNameText.getElementsByTagName("tspan")[0].textContent = studentName;
//     if (fatherNameText) fatherNameText.getElementsByTagName("tspan")[0].textContent = fatherName;
//     if (motherNameText) motherNameText.getElementsByTagName("tspan")[0].textContent = motherName;
//     if (addressText) addressText.getElementsByTagName("tspan")[0].textContent = addressName;
//     if (bloodText) bloodText.getElementsByTagName("tspan")[0].textContent = bloodName;
//   }

function updatePreview() {
  var studentName = document.getElementById("student-name").value;
  var fatherName = document.getElementById("father-name").value;
  var motherName = document.getElementById("mother-name").value;
  var addressName = document.getElementById("address-name").value;
  var bloodName = document.getElementById("blood-type").value;
  var imageURL = document.getElementById("image-link").value; // Image URL input
  var studentImageFile = document.getElementById("student-image").files[0]; // Uploaded image file

  var studentNameText = document.getElementById("student-name-text");
  var fatherNameText = document.getElementById("father-name-text");
  var motherNameText = document.getElementById("mother-name-text");
  var addressText = document.getElementById("address-name-text");
  var bloodText = document.getElementById("blood-name-text");
  var studentImageSVG = document.getElementById("student-image-svg");

  if (studentNameText) {
    const tspan = studentNameText.getElementsByTagName("tspan")[0];
    tspan.textContent = studentName;
  }
  if (fatherNameText) {
    const tspan = fatherNameText.getElementsByTagName("tspan")[0];
    tspan.textContent = fatherName;
  }
  if (motherNameText) {
    const tspan = motherNameText.getElementsByTagName("tspan")[0];
    tspan.textContent = motherName;
  }
  if (addressText) {
    const maxLength = 20;
    const formattedAddress = splitTextWithTspan(addressName, maxLength);
    addressText.innerHTML = formattedAddress;
  }
  if (bloodText) {
    const tspan = bloodText.getElementsByTagName("tspan")[0];
    tspan.textContent = bloodName;
  }

  // Set the image to the SVG based on the source
  if (studentImageFile) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var imageData = e.target.result;
      if (studentImageSVG) {
        studentImageSVG.setAttribute("xlink:href", imageData);
      }
    };
    reader.readAsDataURL(studentImageFile);
  } else if (imageURL) {
    // If image URL is provided, set it directly to the SVG
    if (studentImageSVG) {
      studentImageSVG.setAttribute("xlink:href", imageURL);
      downloadImageFromURL(imageURL);
      console.log("image-link", studentImageSVG);
    }
  }
}

function splitTextWithTspan(text, maxLength) {
  const words = text.split(" ");
  let lines = [];
  let currentLine = "";
  let currentY = 0; // Initial x value

  words.forEach((word) => {
    if ((currentLine + " " + word).length <= maxLength) {
      currentLine += " " + word;
    } else {
      lines.push({ text: currentLine.trim(), y: currentY });
      currentLine = word;
      currentY += 7;
    }
  });

  lines.push({ text: currentLine.trim(), y: currentY });

  return lines
    .map((line) => `<tspan x="3.5" y="${line.y}">${line.text}</tspan>`)
    .join("\n");
}

// }

function generatePDF() {
  var element = document.getElementById("card-preview");
  console.log("element", element);
  var studentImageSVG = document.getElementById("student-image-svg");
  console.log("studentImageSVG", studentImageSVG);
  var svgElement = element.querySelector("svg");
  console.log("svgElement", svgElement);
  svgElement.setAttribute("width", "189px");
  svgElement.setAttribute("height", "283px");
  var opt = {
    filename: "student_card.pdf",
    image: { type: "pdf", quality: 4 },
    html2canvas: {
      scale: 5,
      logging: true,
      dpi: 300,
      useCORS: true,
    },
    jsPDF: {
      unit: "pt",
      format: [141.7323, 212.5984],
      orientation: "portrait",
    },
  };
  html2pdf().set(opt).from(element).save();
}

function downloadImageFromURL(url) {
  console.log('url',url);
  fetch(url)
    .then((response) => response.blob()) // Convert response to a Blob
    .then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); // Convert Blob to base64
      reader.onloadend = () => {
        const base64Data = reader.result;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0); // Draw the image onto the canvas
          // Download the canvas content as an image file
          const link = document.createElement("a");
          link.download = "image.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        };
        img.src = base64Data;
      };
    })
    .catch((error) => console.error("Error fetching image:", error));
}
