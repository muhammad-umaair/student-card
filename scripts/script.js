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

  //if we upload image then open this
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
  var studentNameSVG = document.getElementById("student-name-svg");

  if (studentNameText) studentNameText.textContent = studentName;
  if (fatherNameText) fatherNameText.textContent = fatherName;
  if (motherNameText) motherNameText.textContent = motherName;
  if (addressText) addressText.textContent = addressName;
  if (bloodText) bloodText.textContent = bloodName;
  if (studentNameSVG) studentNameSVG.textContent = studentName;
}

//for upload image
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

