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
  const words = text.split(' ');
  let lines = [];
  let currentLine = '';
  let currentY = 0; // Initial x value

  words.forEach(word => {
    if ((currentLine + ' ' + word).length <= maxLength) {
      currentLine += ' ' + word;
    } else {
      lines.push({ text: currentLine.trim(), y: currentY });
      currentLine = word;
      currentY += 7;
    }
  });

  lines.push({ text: currentLine.trim(), y: currentY });

  return lines.map(line => `<tspan x="3.5" y="${line.y}">${line.text}</tspan>`).join('\n');
}


function generatePDF() {
  var element = document.getElementById("card-preview");
  var svgElement = element.querySelector("svg");
  svgElement.setAttribute("width", "106px");
  svgElement.setAttribute("height", "159px");
  var opt = {
    filename: "student_card.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 3,
      logging: true,
      dpi: 600,
      useCORS: true,
    },
    jsPDF: { unit: "px", format: [106, 159], orientation: "portrait" },
  };
  html2pdf().set(opt).from(element).save();
}
