// Define the specific barcode you are looking for
const ANUAPDCLEANSER = "8809640734427"; // Replace this with the barcode you want to detect

// Function to start the barcode scanner
function startScanner() {
    console.log("Starting camera...");

    const videoElement = document.getElementById('scanner');

    // Access the camera (front camera for mobile devices)
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: "user", // Change to "environment" for rear camera
            width: { ideal: 1280 }, // Ideal resolution
            height: { ideal: 720 }
        }
    }).then(function(stream) {
        console.log("Camera stream received.");

        videoElement.srcObject = stream; // Bind the stream to the video element
        videoElement.play();

        // Initialize QuaggaJS
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: videoElement, // Use the video element
            },
            decoder: {
                readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"] // Supported barcode types
            }
        }, function(err) {
            if (err) {
                console.error("Error initializing Quagga:", err);
                return;
            }
            console.log("Scanner initialized.");
            Quagga.start();
        });

        // Barcode detected event
        Quagga.onDetected(function(result) {
            const barcode = result.codeResult.code;
            console.log("Barcode detected:", barcode);

            // Check if the detected barcode matches the specific barcode
            if (barcode === ANUAPDCLEANSER) {
                console.log("Navigating to the specific page...");
                window.location.href = `https://t1ff4nyy.github.io/glimmr/anua-quercetinol-pore-deep-cleansing-foam.html`;
            }
        });
    }).catch(function(err) {
        console.error("Error accessing the camera:", err);
        alert("Unable to access camera. Please check your browser's camera permissions.");
    });
}

// Start the scanner when the page loads
window.onload = function() {
    console.log("Page loaded. Starting scanner...");
    startScanner();
};
