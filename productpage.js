// Ingredient descriptions
const ingredientDescriptions = {
    "Heartleaf": "Heartleaf is known for its anti-inflammatory properties and is great for soothing irritated skin.",
    "Quercetinol": "Quercetinol is a powerful antioxidant that helps protect the skin from environmental damage.",
    "Centella Asiatica": "Centella Asiatica promotes healing and improves skin elasticity, making it a popular choice for skincare.",
    "Green Tea Extract": "Green Tea Extract is rich in antioxidants and helps reduce signs of aging while calming the skin."
};

// Handle click events for ingredients
document.querySelectorAll('.ingredient').forEach(span => {
    span.addEventListener('click', () => {
        const ingredient = span.getAttribute('data-ingredient');
        document.getElementById('ingredient-name').innerText = ingredient;
        document.getElementById('ingredient-description').innerText = ingredientDescriptions[ingredient] || "Description not available.";
        openPanel();
    });
});

// Open the sidebar
function openPanel() {
    document.getElementById('info-panel').classList.add('open');
    document.querySelector('.content').style.marginRight = '300px';
}

// Close the sidebar
function closePanel() {
    document.getElementById('info-panel').classList.remove('open');
    document.querySelector('.content').style.marginRight = '0';
}
