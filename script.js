document.addEventListener("DOMContentLoaded", function () {
    const PRODUCT_BARCODE = "8809640734427"; // Replace with your barcode
    const PRODUCT_PAGE_URL = "https://t1ff4nyy.github.io/glimmr/anua-quercetinol-pore-deep-cleansing-foam.html";

    const searchInput = document.getElementById('search-bar');
    const dropdownList = document.getElementById('dropdown-list');

    // Disable dropdown suggestions by hiding it and clearing functionality
    function disableDropdown() {
        dropdownList.style.display = 'none';
    }

    searchInput.addEventListener('input', disableDropdown);

    // Sidebar and ingredient handling
    const ingredientDescriptions = {
        "Heartleaf": "Heartleaf is known for its anti-inflammatory properties and is great for soothing irritated skin.",
        "Quercetinol": "Quercetinol is a powerful antioxidant that helps protect the skin from environmental damage.",
        "Centella Asiatica": "Centella Asiatica promotes healing and improves skin elasticity, making it a popular choice for skincare.",
        "Green Tea Extract": "Green Tea Extract is rich in antioxidants and helps reduce signs of aging while calming the skin."
    };

    // Open sidebar with ingredient details
    document.querySelectorAll('.ingredient').forEach(ingredient => {
        ingredient.addEventListener('click', () => {
            const ingredientName = ingredient.innerText;
            const description = ingredientDescriptions[ingredientName] || "Description not available.";
            document.getElementById('ingredient-name').innerText = ingredientName;
            document.getElementById('ingredient-description').innerText = description;

            // Open sidebar
            document.querySelector('.sidebar').classList.add('open');
        });
    });

    // Close sidebar
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.remove('open');
    });

    // Barcode scanner
    function startScanner() {
        console.log("Initializing Quagga...");

        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector("#scanner-container"), // Video container
                constraints: {
                    facingMode: "user", // Use front camera
                    width: { ideal: 1920 }, // High resolution
                    height: { ideal: 1080 }
                },
                area: { // Restrict scanning area to the center
                    top: "20%",    // 20% from the top
                    right: "20%",  // 20% from the right
                    bottom: "20%", // 20% from the bottom
                    left: "20%"    // 20% from the left
                },
                halfSample: false // Use full resolution frames
            },
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader",
                    "upc_reader",
                    "i2of5_reader", // Extra barcode type
                    "code_39_reader" // Extra barcode type
                ]
            },
            locate: true, // Enables locating the barcode for better accuracy
            numOfWorkers: 6, // More workers for better performance
            frequency: 10 // Process frames more frequently
        }, function (err) {
            if (err) {
                console.error("Quagga initialization failed: ", err);
                alert("Barcode scanner failed to initialize.");
                return;
            }

            console.log("Quagga initialized successfully.");
            Quagga.start();
        });

        // Event listener for barcode detection
        Quagga.onDetected(function (result) {
            const barcode = result.codeResult.code;
            console.log("Barcode detected: ", barcode);

            if (barcode === PRODUCT_BARCODE) {
                console.log("Navigating to product page...");
                window.location.href = PRODUCT_PAGE_URL; // Redirect without popup
            } else {
                console.log("Barcode does not match predefined value.");
            }
        });
    }

    startScanner();
});
