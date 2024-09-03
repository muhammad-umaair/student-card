document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("student-form")
    .addEventListener("input", function (event) {
      updatePreview();
    });

  document
    .getElementById("download-button")
    .addEventListener("click", function (event) {
      event.preventDefault();
      updatePreview();
      generatePDF();
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
        }
      };
      reader.readAsDataURL(file);
    });
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

  var studentNameText = document.getElementById("student-name-text");
  var fatherNameText = document.getElementById("father-name-text");
  var motherNameText = document.getElementById("mother-name-text");
  var addressText = document.getElementById("address-name-text");
  var bloodText = document.getElementById("blood-name-text");

  if (studentNameText) {
    const tspan = studentNameText.getElementsByTagName("tspan")[0];
    tspan.textContent = studentName;
    // createTSpans(studentNameText, studentName, maxWidth);
  }
  if (fatherNameText) {
    const tspan = fatherNameText.getElementsByTagName("tspan")[0];
    tspan.textContent = fatherName;
    // createTSpans(fatherNameText, fatherName, maxWidth);
  }
  if (motherNameText) {
    const tspan = motherNameText.getElementsByTagName("tspan")[0];
    tspan.textContent = motherName;
    // createTSpans(motherNameText, motherName, maxWidth);
  }
  if (addressText) {
    // const tspan = addressText.getElementsByTagName("tspan")[0];
    // tspan.textContent = addressName;
    const maxLength = 20;
    const formattedAddress = splitTextWithTspan(addressName, maxLength);
    addressText.innerHTML = formattedAddress;
  }
  if (bloodText) {
    const tspan = bloodText.getElementsByTagName("tspan")[0];
    tspan.textContent = bloodName;
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

function generatePDF() {
  var element = document.getElementById("card-preview");
  var svgElement = element.querySelector("svg");
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
    jsPDF: { unit: "pt", format: [141.7323, 212.5984], orientation: "portrait" },
  };
  html2pdf().set(opt).from(element).save();
}

// For CSV

document.getElementById('csv-file').addEventListener('change', handleFileSelect);
document.getElementById('csv-file').addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file && file.type === 'text/csv') {
    // Hide the image and enable the button
    document.getElementById('card-image').style.display = 'none';
    document.getElementById('download-csv').style.display = 'block';
  } else {
    // Optionally handle invalid file types
    alert('Please upload a valid CSV file.');
  }
});
document.getElementById('download-csv').addEventListener('click', downloadCardImage);

// function handleFileSelect(event) {
//   const file = event.target.files[0];
//   if (file && file.type === 'text/csv') {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const csvData = e.target.result;
//       parseCSV(csvData);
//     };
//     reader.readAsText(file);
//   } else {
//     alert('Please upload a valid CSV file.');
//   }
// }


function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file && file.type === 'text/csv') {
    const reader = new FileReader();
    reader.onload = function (e) {
      const csvData = e.target.result;
      console.log('csvData', csvData);

      // Split the CSV data into lines
      const lines = csvData.split('\n');
      console.log('lines', lines);

      // Filter out empty lines and the header row
      const filteredLines = lines.filter(line => line.trim() !== '' && line.trim() !== ',,,,,' && !line.startsWith('name'));
      console.log('filteredLines', filteredLines);
      const numRows = filteredLines.length;
      console.log('numRows', numRows);

      if (numRows > 12) {
        const extraRows = numRows - 12;
        showModal(extraRows);
        // alert(`You have more than 12 cards. Our system can only print 12 cards. Please remove ${extraRows} extra rows to proceed.`);
      } else {
        parseCSV(csvData);
      }
    };
    reader.readAsText(file);
  } else {
    alert('Please upload a valid CSV file.');
  }
}

function parseCSV(data) {
  const lines = data.split('\n');
  const cardsContainer = document.getElementById('card-preview-container');
  cardsContainer.innerHTML = ''; // Clear existing cards

  lines.slice(1).forEach(async line => {
    const [name, bloodType, fatherPhone, motherPhone, address, imageUrl] = line.split(',');
    // Remove spaces from fatherPhone and motherPhone if they are not undefined
    if (fatherPhone) {
      fatherCell = fatherPhone.trim().replace(/\s+/g, '').replace(/"/g, '');
    }
    if (motherPhone) {
      motherCell = motherPhone.trim().replace(/\s+/g, '').replace(/"/g, '');
    }
    let formattedAddress = '';
    if (address) {
      const words = address.trim().split(' ');
      const maxWordsPerLine = 3; // Adjust this limit based on your needs
      let yPosition = 0;

      words.forEach((word, index) => {
        if (index % maxWordsPerLine === 0 && index !== 0) {
          yPosition += 7; // Increment y position for the next line
        }
        if (index % maxWordsPerLine === 0) {
          formattedAddress += `<tspan x="3.6" y="${yPosition}">${word}`;
        } else {
          formattedAddress += ` ${word}`;
        }
        if ((index + 1) % maxWordsPerLine === 0 || index === words.length - 1) {
          formattedAddress += `</tspan>`;
        }
      });

      formattedAddress = `
          ${formattedAddress}
      `;
    }

    if (name && imageUrl) {
      // Create a new image element to ensure it loads correctly
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Handle CORS if needed
      img.src = imageUrl.trim();

      img.onload = function () {
        const scale = window.devicePixelRatio || 2;
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const base64Image = canvas.toDataURL('image/png');
        const cardHTML = `
                <div class="card-csv">
                        <div id="card-preview-svg">
                            <svg id="Layer_1" data-name="Layer 1" id="student-card-svg"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 141.7323 212.5984">
                                <rect width="141.7323" height="212.5984" fill="#fff" />
                                <circle cx="69.2" cy="73.3" r="33.7" fill="#3b465a" />
                                <rect y="54.1" width="141.7" height="38.39" fill="#fff" />
                                <rect y="56" width="141.7" height="34.55" fill="#e2464f" />
                                <circle cx="69.2" cy="73.3" r="31.4" fill="#fff" />
                                <circle cx="69.2" cy="73.3" r="26.1" fill="#e2464f" />
                                
                                <!-- Image -->
                               <circle cx="69.2" cy="73.3" r="22.8" fill="#fff" />
  <!-- Display Picture -->
  <circle cx="69.2" cy="73.3" r="26.1" fill="none" stroke="#e2464f" stroke-width="6" />
                          
                            <clipPath id="dpMask">
                                <circle cx="69.2" cy="73.3" r="26.1" />
                            </clipPath>

                            <image 
                            id="student-image-csv"
                            xlink:href="${base64Image}"
                            x="43.1"
                            y="47.2"
                            width="52"
                            height="52"
                            clip-path="url(#dpMask)" preserveAspectRatio="xMidYMid slice"
                            />

                                  <!-- End Display Picture -->

                                <!-- School Detail -->
                                <path
                                    d="M97.9,14.8c0-.7.7-1,1.7-1s1.4.3,1.4.8v.6h2.5V14c0-1.9-2.4-2.4-4-2.4s-4.4,1-4.4,3.3,6,3.7,6,5.3-.7,1.1-1.5,1.1a5,5,0,0,1-3.4-1.6l-1.4,1.8a6.2,6.2,0,0,0,4.8,2.1,5.5,5.5,0,0,0,2.6-.6,1.4,1.4,0,0,1,1.4-1.4h0a3.7,3.7,0,0,0,.4-1.5C104,16.3,97.9,16.6,97.9,14.8Z"
                                    transform="translate(0)" fill="#e2464f" />
                                <path
                                    d="M32.2,7.1a8.1,8.1,0,0,1,8.2,8.1,8.3,8.3,0,1,1-16.5,0A8.1,8.1,0,0,1,32.2,7.1Zm0,13.7a5.3,5.3,0,0,0,5.1-5.6,5.2,5.2,0,1,0-10.3,0A5.3,5.3,0,0,0,32.2,20.8Z"
                                    transform="translate(0)" fill="#e2464f" />
                                <path
                                    d="M42.8,10.4c0-.4-.1-.5-.5-.5h-.9V7.4h2.8c1.1,0,1.6.4,1.6,1.5V20.3a.5.5,0,0,0,.5.5h3.4c.4,0,.5-.2.5-.5v-.9h2.7v2.4c0,1-.4,1.5-1.5,1.5h-7c-1.1,0-1.6-.5-1.6-1.5Z"
                                    transform="translate(0)" fill="#e2464f" />
                                <path
                                    d="M59.1,11.6c3.2,0,5,2.4,5,5.4v1.1H56.2a3.2,3.2,0,0,0,3.4,3,5.5,5.5,0,0,0,3.2-1.2L64,21.8a7,7,0,0,1-4.6,1.8,5.9,5.9,0,0,1-6.2-6A5.7,5.7,0,0,1,59.1,11.6Zm2.1,4.5a2.2,2.2,0,0,0-2.1-2.3,2.9,2.9,0,0,0-2.9,2.3Z"
                                    transform="translate(0)" fill="#e2464f" />
                                <path
                                    d="M82.7,11.6c3.2,0,5,2.4,5,5.4v1.1H79.8a3.2,3.2,0,0,0,3.4,3,5.5,5.5,0,0,0,3.2-1.2l1.2,1.9A7,7,0,0,1,83,23.6a5.9,5.9,0,0,1-6.2-6A5.7,5.7,0,0,1,82.7,11.6Zm2.1,4.5a2.2,2.2,0,0,0-2.1-2.3,2.9,2.9,0,0,0-2.9,2.3Z"
                                    transform="translate(0)" fill="#e2464f" />
                                <path
                                    d="M90,10.3a.5.5,0,0,0-.5-.5h-.9V7.4h2.7c1,0,1.5.4,1.5,1.5V20.4a.5.5,0,0,0,.5.5h.9v2.4H91.5c-1.1,0-1.5-.5-1.5-1.5Z"
                                    transform="translate(0)" fill="#e2464f" />
                                <path
                                    d="M73.3,9.2h-.7l-2.2,7.7s-1.8-6.5-2.2-7.7h-.7a22.5,22.5,0,0,1-2.1,8.1,18.8,18.8,0,0,1,4.1,9h.8V18.9c-.3-.1-.6-.3-.6-.6a.7.7,0,0,1,1.4,0c0,.3-.3.5-.6.6v7.4h.8a18.8,18.8,0,0,1,4.1-9A22.5,22.5,0,0,1,73.3,9.2Z"
                                    transform="translate(0)" fill="#3b465a" />
                                <text transform="translate(52.9 33.2)" font-size="6.76" fill="#231f20"
                                    font-family="ArialMT, Arial" letter-spacing="0.44em">
                                    School
                                </text>
                                <text transform="translate(14.6 207.2)" font-size="8" fill="#e2464f"
                                    font-family="ArialMT, Arial" letter-spacing="0.44em">
                                    <tspan x="1" y="0">www.olevels.com</tspan>
                                </text>
                                <!-- End School Detail -->

                                <circle cx="103.6" cy="23" r="0.8" fill="#e2464f" />
                                <path
                                    d="M104.4,16.8v5.1A1.4,1.4,0,0,1,105,23h0v.3h-.1c0,.1-.1.1-.1.2h0v.2h13.1V16.8Zm2.8,5.7a1.9,1.9,0,0,1-1.9-2,1.8,1.8,0,0,1,1.9-1.9c.5,0,1.4.2,1.4.9v.4H108v-.2c0-.3-.5-.4-.8-.4a1.2,1.2,0,0,0-1.2,1.2,1.3,1.3,0,0,0,1.2,1.3,1.9,1.9,0,0,0,1.2-.5l.3.5A1.9,1.9,0,0,1,107.2,22.5Zm3.5,0a1.9,1.9,0,0,1-1.9-2,1.9,1.9,0,1,1,3.8,0A1.9,1.9,0,0,1,110.7,22.5Zm6.3-.1h-.6c-.2,0-.3-.1-.3-.4V20.4a1.1,1.1,0,0,1,0-.6h-.1l-.2.6-.6,1.4h-.5l-.6-1.4-.2-.6h-.1a1.1,1.1,0,0,1,0,.6V22c0,.3-.1.4-.3.4h-.6v-.6h.1c.1,0,.1,0,.1-.1l.3-3h.7l.8,1.8a1.3,1.3,0,0,1,.1.5h.1a2,2,0,0,0,.1-.5l.8-1.8h.7l.3,3c0,.1,0,.1.1.1h.1Zm-6.3-3.1a1.2,1.2,0,0,0-1.2,1.2,1.2,1.2,0,1,0,2.4,0A1.2,1.2,0,0,0,110.7,19.3Z"
                                    transform="translate(0)" fill="#e2464f" />
                                <text id="student-name-text" data-name="Your Name Here" text-anchor="middle"
                                    transform="translate(75 133)" font-size="13" fill="#e2464f"
                                    font-family="BebasNeue-Regular, Bebas Neue">
                                    <tspan x="-5" y="0">${name}</tspan>
                                </text>
                                <!-- Blood Detail -->
                                <text transform="translate(20 146) scale(1.13 1)" font-size="6" fill="#231f20"
                                    font-family="Arial-BoldMT, Arial" font-weight="700">
                                    <tspan xml:space="preserve">Blood</tspan>
                                </text>

                                <text transform="translate(49 146) scale(1.13 1)" font-size="6" fill="#231f20"
                                    font-family="Arial-BoldMT, Arial" font-weight="700">
                                    :
                                </text>

                                <text id="blood-name-text" data-name="Your Blood Group Here"
                                    transform="translate(50 146) scale(1.13 1)" font-size="6" fill="#231f20"
                                    font-family="Arial-BoldMT, Arial" font-weight="700">
                                    <tspan x="3.6" y="0">${bloodType}</tspan>
                                </text>

                                <!-- End Blood Detail -->

                                <!-- Father Detail -->
                                <text transform="translate(20 156) scale(1.13 1)" font-size="6" fill="#231f20"
                                    font-family="Arial-BoldMT, Arial" font-weight="700">
                                    Father
                                </text>
                                <text transform="translate(49 156) scale(1.13 1)" font-size="6" fill="#231f20"
                                    font-family="Arial-BoldMT, Arial" font-weight="700">
                                    :
                                </text>
                                <text id="father-name-text" transform="translate(50 156) scale(1.13 1)" font-size="6"
                                    fill="#231f20" font-family="Arial-BoldMT, Arial" font-weight="700">
                                    <tspan x="3.6" y="0">${fatherCell}</tspan>
                                </text>
                                <!-- Mother Detail -->

                                <text transform="translate(20 166) scale(1.13 1)" font-size="6" fill="#231f20"
                                    font-family="Arial-BoldMT, Arial" font-weight="700">
                                    Mother
                                </text>

                                <text transform="translate(49 166) scale(1.13 1)" font-size="6" fill="#231f20"
                                    font-family="Arial-BoldMT, Arial" font-weight="700">
                                    :
                                </text>

                                <text id="mother-name-text" transform="translate(50 166) scale(1.13 1)" font-size="6"
                                    fill="#231f20" font-family="Arial-BoldMT, Arial" font-weight="700">
                                    <tspan x="3.6" y="0">${motherCell}</tspan>
                                </text>

                                <!-- End Mother Detail -->

                                <text transform="translate(20 177) scale(1.13 1)" font-size="6" fill="#231f20"
                                    font-family="Arial-BoldMT, Arial" font-weight="700">
                                    Address
                                </text>

                                <text transform="translate(50 177) scale(1.13 1)" font-size="6" fill="#231f20"
                                    font-family="Arial-BoldMT, Arial" font-weight="700">
                                    :
                                </text>
                                <rect x="69.2" height="47.16" fill="#e2464f" />

                                <text id="address-name-text" transform="translate(50 177) scale(1.13 1)" font-size="6"
                                    fill="#231f20" font-family="Arial-BoldMT, Arial" font-weight="700">
                                    <tspan x="3.6" y="0">${formattedAddress}</tspan>
                                </text>
                            </svg>
                        </div>
                    </div>

            `;
        cardsContainer.innerHTML += cardHTML;
      };
      img.src = imageUrl; // Set the image source URL
      console.log('img.src = imageUrl', img.src = imageUrl);
    }
  }
  )
}
function downloadCardImage() {
    const loadingMessage = document.getElementById('loading-message');
  const downloadText = document.getElementById('download-text');
  const container = document.getElementById('card-preview-container');
  loadingMessage.style.display = 'inline';
  downloadText.style.display = 'none';

  // Define the scale factor for higher resolution
  const scale = 3; // Adjust as needed for higher resolution

  // Create a canvas element
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Set the canvas dimensions based on the container's scrollWidth and scrollHeight
  canvas.width = container.scrollWidth * scale;
  canvas.height = container.scrollHeight * scale;

  // Scale the canvas context
  context.scale(scale, scale);

  // Use html2canvas to render the content into the canvas
  html2canvas(container, { scale: scale }).then(canvas => {
    const dataUrl = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;

    // Create a PDF with dimensions that match the canvas size
    const pdfWidth = container.scrollWidth * 0.85; // Convert pixels to mm
    console.log('container.scrollWidth', container.scrollWidth);
    console.log('pdfWidth', pdfWidth);
    const pdfHeight = container.scrollHeight * 0.85;
    console.log('container.scrollHeight', pdfHeight);
    console.log('pdfHeight', pdfHeight);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });

    // Add the image to the PDF
    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('student_card.pdf');
    loadingMessage.style.display = 'none';
   downloadText.style.display = 'inline';
  }).catch(error => {
    console.error('Error generating PDF:', error);
    loadingMessage.style.display = 'none';
    downloadText.style.display = 'inline';
  });
}
function showModal(extraRows) {
  // Get the modal
  const modal = document.getElementById("cardLimitModal");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // Get the message element and update the message
  const message = document.getElementById("modal-message");
  message.textContent = `You have more than 12 cards. Our system can only print 12 cards. Please remove ${extraRows} extra rows to proceed.`;

  // Display the modal
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}




// // For CSV

// document.getElementById('csv-file').addEventListener('change', handleFileSelect);
// document.getElementById('download-csv').addEventListener('click', downloadCardImage);
// document.getElementById('csv-file').addEventListener('change', function(event) {
//     const file = event.target.files[0];
    
//     if (file && file.type === 'text/csv') {
//         // Hide the image and enable the button
//         document.getElementById('card-image').style.display = 'none';
//         document.getElementById('download-csv').style.display = 'block';
//     } else {
//         // Optionally handle invalid file types
//         alert('Please upload a valid CSV file.');
//     }
// });

// function handleFileSelect(event) {
//   const file = event.target.files[0];
//   if (file && file.type === 'text/csv') {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const csvData = e.target.result;
//       parseCSV(csvData);
//     };
//     reader.readAsText(file);
//   } else {
//     alert('Please upload a valid CSV file.');
//   }
// }

// function parseCSV(data) {
//   const lines = data.split('\n');
//   const cardsContainer = document.getElementById('card-preview-container');
//   cardsContainer.innerHTML = ''; // Clear existing cards

//   lines.slice(1).forEach(line => {
//     const [name, bloodType, fatherName, motherName, address, imageUrl] = line.split(',');
//     if (name && imageUrl) {
//       // Create a new image element to ensure it loads correctly
//       const img = new Image();
//       img.crossOrigin = 'Anonymous'; // Handle CORS if needed
//     // add after
//      img.src = imageUrl.trim();
//     // add after end



//       img.onload = function () {
//         // Create a canvas to convert the image to base64
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
        
//         canvas.width = img.width;
//         canvas.height = img.height;
//         // add after
//         const scale = 5; // Adjust this scale to improve resolution
//         canvas.width = img.width * scale;
//         canvas.height = img.height * scale;
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//         // add after end
        
//         // ctx.drawImage(img, 0, 0);
        
//         const base64Image = canvas.toDataURL('image/png'); // Convert image to base64

//         // Generate card HTML with the base64 image
//         const cardHTML = `
//                 <div class="card-csv">
//                         <div id="card-preview-svg">
//                             <svg id="Layer_1" data-name="Layer 1" id="student-card-svg"
//                                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
//                                 viewBox="0 0 141.7323 212.5984">
//                                 <rect width="141.7323" height="212.5984" fill="#fff" />
//                                 <circle cx="69.2" cy="73.3" r="33.7" fill="#3b465a" />
//                                 <rect y="54.1" width="141.7" height="38.39" fill="#fff" />
//                                 <rect y="56" width="141.7" height="34.55" fill="#e2464f" />
//                                 <circle cx="69.2" cy="73.3" r="31.4" fill="#fff" />
//                                 <circle cx="69.2" cy="73.3" r="26.1" fill="#e2464f" />
                                
//                                 <!-- Image -->
//                               <circle cx="69.2" cy="73.3" r="22.8" fill="#fff" />
//   <!-- Display Picture -->
//   <circle cx="69.2" cy="73.3" r="26.1" fill="none" stroke="#e2464f" stroke-width="6" />
                          
//                             <clipPath id="dpMask">
//                                 <circle cx="69.2" cy="73.3" r="26.1" />
//                             </clipPath>

//                             <image 
//                             id="student-image-csv"
//                             xlink:href="${base64Image}"
//                             x="43.1"
//                             y="47.2"
//                             width="52"
//                             height="52"
//                             clip-path="url(#dpMask)" preserveAspectRatio="xMidYMid slice"
//                             />

//                                   <!-- End Display Picture -->

//                                 <!-- School Detail -->
//                                 <path
//                                     d="M97.9,14.8c0-.7.7-1,1.7-1s1.4.3,1.4.8v.6h2.5V14c0-1.9-2.4-2.4-4-2.4s-4.4,1-4.4,3.3,6,3.7,6,5.3-.7,1.1-1.5,1.1a5,5,0,0,1-3.4-1.6l-1.4,1.8a6.2,6.2,0,0,0,4.8,2.1,5.5,5.5,0,0,0,2.6-.6,1.4,1.4,0,0,1,1.4-1.4h0a3.7,3.7,0,0,0,.4-1.5C104,16.3,97.9,16.6,97.9,14.8Z"
//                                     transform="translate(0)" fill="#e2464f" />
//                                 <path
//                                     d="M32.2,7.1a8.1,8.1,0,0,1,8.2,8.1,8.3,8.3,0,1,1-16.5,0A8.1,8.1,0,0,1,32.2,7.1Zm0,13.7a5.3,5.3,0,0,0,5.1-5.6,5.2,5.2,0,1,0-10.3,0A5.3,5.3,0,0,0,32.2,20.8Z"
//                                     transform="translate(0)" fill="#e2464f" />
//                                 <path
//                                     d="M42.8,10.4c0-.4-.1-.5-.5-.5h-.9V7.4h2.8c1.1,0,1.6.4,1.6,1.5V20.3a.5.5,0,0,0,.5.5h3.4c.4,0,.5-.2.5-.5v-.9h2.7v2.4c0,1-.4,1.5-1.5,1.5h-7c-1.1,0-1.6-.5-1.6-1.5Z"
//                                     transform="translate(0)" fill="#e2464f" />
//                                 <path
//                                     d="M59.1,11.6c3.2,0,5,2.4,5,5.4v1.1H56.2a3.2,3.2,0,0,0,3.4,3,5.5,5.5,0,0,0,3.2-1.2L64,21.8a7,7,0,0,1-4.6,1.8,5.9,5.9,0,0,1-6.2-6A5.7,5.7,0,0,1,59.1,11.6Zm2.1,4.5a2.2,2.2,0,0,0-2.1-2.3,2.9,2.9,0,0,0-2.9,2.3Z"
//                                     transform="translate(0)" fill="#e2464f" />
//                                 <path
//                                     d="M82.7,11.6c3.2,0,5,2.4,5,5.4v1.1H79.8a3.2,3.2,0,0,0,3.4,3,5.5,5.5,0,0,0,3.2-1.2l1.2,1.9A7,7,0,0,1,83,23.6a5.9,5.9,0,0,1-6.2-6A5.7,5.7,0,0,1,82.7,11.6Zm2.1,4.5a2.2,2.2,0,0,0-2.1-2.3,2.9,2.9,0,0,0-2.9,2.3Z"
//                                     transform="translate(0)" fill="#e2464f" />
//                                 <path
//                                     d="M90,10.3a.5.5,0,0,0-.5-.5h-.9V7.4h2.7c1,0,1.5.4,1.5,1.5V20.4a.5.5,0,0,0,.5.5h.9v2.4H91.5c-1.1,0-1.5-.5-1.5-1.5Z"
//                                     transform="translate(0)" fill="#e2464f" />
//                                 <path
//                                     d="M73.3,9.2h-.7l-2.2,7.7s-1.8-6.5-2.2-7.7h-.7a22.5,22.5,0,0,1-2.1,8.1,18.8,18.8,0,0,1,4.1,9h.8V18.9c-.3-.1-.6-.3-.6-.6a.7.7,0,0,1,1.4,0c0,.3-.3.5-.6.6v7.4h.8a18.8,18.8,0,0,1,4.1-9A22.5,22.5,0,0,1,73.3,9.2Z"
//                                     transform="translate(0)" fill="#3b465a" />
//                                 <text transform="translate(52.9 33.2)" font-size="6.76" fill="#231f20"
//                                     font-family="ArialMT, Arial" letter-spacing="0.44em">
//                                     School
//                                 </text>
//                                 <text transform="translate(14.6 207.2)" font-size="8" fill="#e2464f"
//                                     font-family="ArialMT, Arial" letter-spacing="0.44em">
//                                     <tspan x="1" y="0">www.olevels.com</tspan>
//                                 </text>
//                                 <!-- End School Detail -->

//                                 <circle cx="103.6" cy="23" r="0.8" fill="#e2464f" />
//                                 <path
//                                     d="M104.4,16.8v5.1A1.4,1.4,0,0,1,105,23h0v.3h-.1c0,.1-.1.1-.1.2h0v.2h13.1V16.8Zm2.8,5.7a1.9,1.9,0,0,1-1.9-2,1.8,1.8,0,0,1,1.9-1.9c.5,0,1.4.2,1.4.9v.4H108v-.2c0-.3-.5-.4-.8-.4a1.2,1.2,0,0,0-1.2,1.2,1.3,1.3,0,0,0,1.2,1.3,1.9,1.9,0,0,0,1.2-.5l.3.5A1.9,1.9,0,0,1,107.2,22.5Zm3.5,0a1.9,1.9,0,0,1-1.9-2,1.9,1.9,0,1,1,3.8,0A1.9,1.9,0,0,1,110.7,22.5Zm6.3-.1h-.6c-.2,0-.3-.1-.3-.4V20.4a1.1,1.1,0,0,1,0-.6h-.1l-.2.6-.6,1.4h-.5l-.6-1.4-.2-.6h-.1a1.1,1.1,0,0,1,0,.6V22c0,.3-.1.4-.3.4h-.6v-.6h.1c.1,0,.1,0,.1-.1l.3-3h.7l.8,1.8a1.3,1.3,0,0,1,.1.5h.1a2,2,0,0,0,.1-.5l.8-1.8h.7l.3,3c0,.1,0,.1.1.1h.1Zm-6.3-3.1a1.2,1.2,0,0,0-1.2,1.2,1.2,1.2,0,1,0,2.4,0A1.2,1.2,0,0,0,110.7,19.3Z"
//                                     transform="translate(0)" fill="#e2464f" />
//                                 <text id="student-name-text" data-name="Your Name Here" text-anchor="middle"
//                                     transform="translate(75 133)" font-size="13" fill="#e2464f"
//                                     font-family="BebasNeue-Regular, Bebas Neue">
//                                     <tspan x="-5" y="0">${name}</tspan>
//                                 </text>
//                                 <!-- Blood Detail -->
//                                 <text transform="translate(20 146) scale(1.13 1)" font-size="6" fill="#231f20"
//                                     font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     <tspan xml:space="preserve">Blood</tspan>
//                                 </text>

//                                 <text transform="translate(49 146) scale(1.13 1)" font-size="6" fill="#231f20"
//                                     font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     :
//                                 </text>

//                                 <text id="blood-name-text" data-name="Your Blood Group Here"
//                                     transform="translate(50 146) scale(1.13 1)" font-size="6" fill="#231f20"
//                                     font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     <tspan x="3.6" y="0">${bloodType}</tspan>
//                                 </text>

//                                 <!-- End Blood Detail -->

//                                 <!-- Father Detail -->
//                                 <text transform="translate(20 156) scale(1.13 1)" font-size="6" fill="#231f20"
//                                     font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     Father
//                                 </text>
//                                 <text transform="translate(49 156) scale(1.13 1)" font-size="6" fill="#231f20"
//                                     font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     :
//                                 </text>
//                                 <text id="father-name-text" transform="translate(50 156) scale(1.13 1)" font-size="6"
//                                     fill="#231f20" font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     <tspan x="3.6" y="0">${fatherName}</tspan>
//                                 </text>
//                                 <!-- Mother Detail -->

//                                 <text transform="translate(20 166) scale(1.13 1)" font-size="6" fill="#231f20"
//                                     font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     Mother
//                                 </text>

//                                 <text transform="translate(49 166) scale(1.13 1)" font-size="6" fill="#231f20"
//                                     font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     :
//                                 </text>

//                                 <text id="mother-name-text" transform="translate(50 166) scale(1.13 1)" font-size="6"
//                                     fill="#231f20" font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     <tspan x="3.6" y="0">${motherName}</tspan>
//                                 </text>

//                                 <!-- End Mother Detail -->

//                                 <text transform="translate(20 177) scale(1.13 1)" font-size="6" fill="#231f20"
//                                     font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     Address
//                                 </text>

//                                 <text transform="translate(50 177) scale(1.13 1)" font-size="6" fill="#231f20"
//                                     font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     :
//                                 </text>
//                                 <rect x="69.2" height="47.16" fill="#e2464f" />

//                                 <text id="address-name-text" transform="translate(50 177) scale(1.13 1)" font-size="6"
//                                     fill="#231f20" font-family="Arial-BoldMT, Arial" font-weight="700">
//                                     <tspan x="3.6" y="0">${address}</tspan>
//                                 </text>
//                             </svg>
//                         </div>
//                     </div>

//             `;
//         cardsContainer.innerHTML += cardHTML;
//       };
//       img.src = imageUrl; // Set the image source URL
//       console.log('img.src = imageUrl', img.src = imageUrl);
//     }
//   });
// }


// function downloadCardImage() 
// {
//   const loadingMessage = document.getElementById('loading-message');
//   const downloadText = document.getElementById('download-text');
//   const container = document.getElementById('card-preview-container');
//   const studentImage = document.getElementById('student-image-csv');

//   // Show loading message and hide download text
//   loadingMessage.style.display = 'inline';
//   downloadText.style.display = 'none';

//   // Create a promise to wait for the student image to load
//   const imagePromise = new Promise(resolve => {
//     studentImage.onload = resolve;
//   });

//   html2canvas(container, {
//     scale: 1,
//     logging: true,
//     dpi: 300,
//     useCORS: true,
//     width: container.offsetWidth * 5, 
//     height: container.offsetHeight * 5,
//   }).then(canvas => {
//     const { jsPDF } = window.jspdf;
//     const pdf = new jsPDF();
//     const imgData = canvas.toDataURL('image/png');
//     pdf.addImage(imgData, 'PNG', 0, 0);
//     pdf.save('cards.pdf');

//     // Hide loading message and show download text
//     loadingMessage.style.display = 'none';
//     downloadText.style.display = 'inline';
//   }).catch(error => {
//     console.error('Error generating PDF:', error);

//     // Hide loading message and show download text in case of error
//     loadingMessage.style.display = 'none';
//     downloadText.style.display = 'inline';
//   });
// }
