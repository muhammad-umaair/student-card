<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Student Card Generator</title>
    <link
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>

    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <h3>Enter Student Information</h3>
          <form id="student-form">
            <div class="form-group">
              <label for="student-name">Student Name</label>
              <input
                type="text"
                class="form-control"
                id="student-name"
                required
              />
            </div>

            <div class="form-group">
              <label for="blood-type">Blood Type</label>
              <input
                type="text"
                class="form-control"
                id="blood-type"
                required
              />
            </div>

            <div class="form-group">
              <label for="father-name">Father's Name</label>
              <input
                type="text"
                class="form-control"
                id="father-name"
                required
              />
            </div>
            <div class="form-group">
              <label for="mother-name">Mother's Name</label>
              <input
                type="text"
                class="form-control"
                id="mother-name"
                required
              />
            </div>

            <!-- HTML Form -->
            <div class="form-group">
              <label for="address-name">Address</label>
              <input
                type="text"
                class="form-control"
                id="address-name"
                required
              />
            </div>

            <div class="form-group">
              <label for="student-image">Upload Student Image</label>
              <input
                type="file"
                class="form-control-file"
                id="student-image"
                accept="image/*"
                required
              />
            </div>

            <button id="download-button" class="btn btn-primary">
              Download Card Image
            </button>
          </form>
        </div>
        <div class="col-md-6">
          <h3>Student Card Preview</h3>
          <div class="card">
            <div id="card-preview">
              <svg
                id="Layer_1"
                data-name="Layer 1"
                id="student-card-svg"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 141.7323 212.5984"
              >
                <rect width="141.7323" height="212.5984" fill="#fff" />
                <circle cx="69.2" cy="73.3" r="33.7" fill="#3b465a" />
                <rect y="54.1" width="141.7" height="38.39" fill="#fff" />
                <rect y="56" width="141.7" height="34.55" fill="#e2464f" />
                <circle cx="69.2" cy="73.3" r="31.4" fill="#fff" />
                <circle cx="69.2" cy="73.3" r="26.1" fill="#e2464f" />

                <!-- School Detail -->
                <path
                  d="M97.9,14.8c0-.7.7-1,1.7-1s1.4.3,1.4.8v.6h2.5V14c0-1.9-2.4-2.4-4-2.4s-4.4,1-4.4,3.3,6,3.7,6,5.3-.7,1.1-1.5,1.1a5,5,0,0,1-3.4-1.6l-1.4,1.8a6.2,6.2,0,0,0,4.8,2.1,5.5,5.5,0,0,0,2.6-.6,1.4,1.4,0,0,1,1.4-1.4h0a3.7,3.7,0,0,0,.4-1.5C104,16.3,97.9,16.6,97.9,14.8Z"
                  transform="translate(0)"
                  fill="#e2464f"
                />
                <path
                  d="M32.2,7.1a8.1,8.1,0,0,1,8.2,8.1,8.3,8.3,0,1,1-16.5,0A8.1,8.1,0,0,1,32.2,7.1Zm0,13.7a5.3,5.3,0,0,0,5.1-5.6,5.2,5.2,0,1,0-10.3,0A5.3,5.3,0,0,0,32.2,20.8Z"
                  transform="translate(0)"
                  fill="#e2464f"
                />
                <path
                  d="M42.8,10.4c0-.4-.1-.5-.5-.5h-.9V7.4h2.8c1.1,0,1.6.4,1.6,1.5V20.3a.5.5,0,0,0,.5.5h3.4c.4,0,.5-.2.5-.5v-.9h2.7v2.4c0,1-.4,1.5-1.5,1.5h-7c-1.1,0-1.6-.5-1.6-1.5Z"
                  transform="translate(0)"
                  fill="#e2464f"
                />
                <path
                  d="M59.1,11.6c3.2,0,5,2.4,5,5.4v1.1H56.2a3.2,3.2,0,0,0,3.4,3,5.5,5.5,0,0,0,3.2-1.2L64,21.8a7,7,0,0,1-4.6,1.8,5.9,5.9,0,0,1-6.2-6A5.7,5.7,0,0,1,59.1,11.6Zm2.1,4.5a2.2,2.2,0,0,0-2.1-2.3,2.9,2.9,0,0,0-2.9,2.3Z"
                  transform="translate(0)"
                  fill="#e2464f"
                />
                <path
                  d="M82.7,11.6c3.2,0,5,2.4,5,5.4v1.1H79.8a3.2,3.2,0,0,0,3.4,3,5.5,5.5,0,0,0,3.2-1.2l1.2,1.9A7,7,0,0,1,83,23.6a5.9,5.9,0,0,1-6.2-6A5.7,5.7,0,0,1,82.7,11.6Zm2.1,4.5a2.2,2.2,0,0,0-2.1-2.3,2.9,2.9,0,0,0-2.9,2.3Z"
                  transform="translate(0)"
                  fill="#e2464f"
                />
                <path
                  d="M90,10.3a.5.5,0,0,0-.5-.5h-.9V7.4h2.7c1,0,1.5.4,1.5,1.5V20.4a.5.5,0,0,0,.5.5h.9v2.4H91.5c-1.1,0-1.5-.5-1.5-1.5Z"
                  transform="translate(0)"
                  fill="#e2464f"
                />
                <path
                  d="M73.3,9.2h-.7l-2.2,7.7s-1.8-6.5-2.2-7.7h-.7a22.5,22.5,0,0,1-2.1,8.1,18.8,18.8,0,0,1,4.1,9h.8V18.9c-.3-.1-.6-.3-.6-.6a.7.7,0,0,1,1.4,0c0,.3-.3.5-.6.6v7.4h.8a18.8,18.8,0,0,1,4.1-9A22.5,22.5,0,0,1,73.3,9.2Z"
                  transform="translate(0)"
                  fill="#3b465a"
                />
                <text
                  transform="translate(52.9 33.2)"
                  font-size="6.76"
                  fill="#231f20"
                  font-family="ArialMT, Arial"
                  letter-spacing="0.44em"
                >
                  School
                </text>
                <text
                  transform="translate(14.6 207.2)"
                  font-size="8"
                  fill="#e2464f"
                  font-family="ArialMT, Arial"
                  letter-spacing="0.44em"
                >
                  <tspan x="1" y="0">www.olevels.com</tspan>
                </text>
                <!-- End School Detail -->

                <circle cx="103.6" cy="23" r="0.8" fill="#e2464f" />
                <path
                  d="M104.4,16.8v5.1A1.4,1.4,0,0,1,105,23h0v.3h-.1c0,.1-.1.1-.1.2h0v.2h13.1V16.8Zm2.8,5.7a1.9,1.9,0,0,1-1.9-2,1.8,1.8,0,0,1,1.9-1.9c.5,0,1.4.2,1.4.9v.4H108v-.2c0-.3-.5-.4-.8-.4a1.2,1.2,0,0,0-1.2,1.2,1.3,1.3,0,0,0,1.2,1.3,1.9,1.9,0,0,0,1.2-.5l.3.5A1.9,1.9,0,0,1,107.2,22.5Zm3.5,0a1.9,1.9,0,0,1-1.9-2,1.9,1.9,0,1,1,3.8,0A1.9,1.9,0,0,1,110.7,22.5Zm6.3-.1h-.6c-.2,0-.3-.1-.3-.4V20.4a1.1,1.1,0,0,1,0-.6h-.1l-.2.6-.6,1.4h-.5l-.6-1.4-.2-.6h-.1a1.1,1.1,0,0,1,0,.6V22c0,.3-.1.4-.3.4h-.6v-.6h.1c.1,0,.1,0,.1-.1l.3-3h.7l.8,1.8a1.3,1.3,0,0,1,.1.5h.1a2,2,0,0,0,.1-.5l.8-1.8h.7l.3,3c0,.1,0,.1.1.1h.1Zm-6.3-3.1a1.2,1.2,0,0,0-1.2,1.2,1.2,1.2,0,1,0,2.4,0A1.2,1.2,0,0,0,110.7,19.3Z"
                  transform="translate(0)"
                  fill="#e2464f"
                />
                <text
                  id="student-name-text"
                  data-name="Your Name Here"
                  text-anchor="middle"
                  transform="translate(75 133)"
                  font-size="13"
                  fill="#e2464f"
                  font-family="BebasNeue-Regular, Bebas Neue"
                >
                  <tspan x="-5" y="0">Your Name Here</tspan>
                </text>
                <circle cx="69.2" cy="73.3" r="22.8" fill="#fff" />
                <clipPath id="imageClip">
                  <circle cx="69.2" cy="73.3" r="22.8" />
                </clipPath>
                <image
                  id="student-image-svg"
                  xlink:href=""
                  x="46.4"
                  y="50.5"
                  width="45.6"
                  height="45.6"
                  clip-path="url(#imageClip)"
                />

                <!-- Blood Detail -->
                <text
                  transform="translate(20 146) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                >
                  <tspan xml:space="preserve">Blood</tspan>
                </text>

                <text
                  transform="translate(49 146) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                >
                  :
                </text>

                <text
                  id="blood-name-text"
                  data-name="Your Blood Group Here"
                  transform="translate(50 146) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                >
                  <tspan x="3.6" y="0">Your Blood Group Here</tspan>
                </text>

                <!-- End Blood Detail -->

                <!-- Father Detail -->
                <text
                  transform="translate(20 156) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                >
                  Father
                </text>
                <text
                  transform="translate(49 156) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                >
                  :
                </text>
                <text
                  id="father-name-text"
                  transform="translate(50 156) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                >
                  <tspan x="3.6" y="0">Your Father Name Here</tspan>
                </text>
                <!-- Mother Detail -->

                <text
                  transform="translate(20 166) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                >
                  Mother
                </text>

                <text
                  transform="translate(49 166) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                >
                  :
                </text>

                <text
                  id="mother-name-text"
                  transform="translate(50 166) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                >
                  <tspan x="3.6" y="0">Your Mother Name Here</tspan>
                </text>

                <!-- End Mother Detail -->

                <text
                  transform="translate(20 177) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                >
                  Address
                </text>

                <text
                  transform="translate(50 177) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                >
                  :
                </text>
                <rect x="69.2" height="47.16" fill="#e2464f" />

                <text
                  id="address-name-text"
                  transform="translate(50 177) scale(1.13 1)"
                  font-size="6"
                  fill="#231f20"
                  font-family="Arial-BoldMT, Arial"
                  font-weight="700"
                  
                >
                  <tspan x="3.6" y="0">Your Address Here</tspan>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

   <script src="scripts/script.js?v=<?php echo time(); ?>"></script>

  </body>
</html>
