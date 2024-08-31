const modal = document.getElementById('productModal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const produtosContainer = document.getElementById('productList');
const actionButtons = document.getElementById('actionButtons');
const editButton = document.getElementById('editButton');
const deleteButton = document.getElementById('deleteButton');
let selectedProduct = null;


openModalButton.addEventListener('click', () => {
    console.log('Open modal button clicked');
    modal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
    console.log('Close modal button clicked');
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        console.log('Clicked outside the modal');
        modal.style.display = 'none';
    }
});

document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Form submitted');

    const name = document.getElementById('productName').value;
    const sku = document.getElementById('productSKU').value;
    const unit = document.getElementById('productUnit').value;
    const price = parseFloat(document.getElementById('sellingPrice').value).toFixed(2);
    const stock = document.getElementById('stock').value;
    const image = document.getElementById('productImage').files[0] ? URL.createObjectURL(document.getElementById('productImage').files[0]) : '/assets/default-image.png';

    if (selectedProduct) {
        // Edit existing product
        selectedProduct.querySelector('img').src = image;
        selectedProduct.querySelector('p:nth-of-type(1)').textContent = name;
        selectedProduct.querySelector('p:nth-of-type(2)').textContent = sku;
        selectedProduct.querySelector('p:nth-of-type(3)').textContent = unit;
        selectedProduct.querySelector('p:nth-of-type(4)').textContent = `R$ ${price}`;
        selectedProduct.querySelector('p:nth-of-type(5)').textContent = stock;
        selectedProduct = null;
    } else {
        // Add new product
        const productDiv = document.createElement('div');
        productDiv.className = 'produto';
        productDiv.innerHTML = `
            <input type="checkbox" class="item-checkbox">
            <p class="header-item"><img src="${image}" width="70px" alt="${name}"></p>
            <p class="header-item">${name}</p>
            <p class="header-item">${sku}</p>
            <p class="header-item">${unit}</p>
            <p class="header-item">R$ ${price}</p>
            <p class="header-item">${stock}</p>
        `;

        produtosContainer.appendChild(productDiv);
    }

    document.getElementById('productForm').reset();
    modal.style.display = 'none';
    actionButtons.style.visibility = 'hidden'; // Hide buttons after action

    console.log('Produto Adicionado/Atualizado');
});

// Show/hide action buttons based on checkbox selection
produtosContainer.addEventListener('change', (event) => {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

    if (checkedCheckboxes.length > 0) {
        actionButtons.style.visibility = 'visible';
        selectedProduct = checkedCheckboxes[0].closest('.produto'); // Select the first checked product
    } else {
        actionButtons.style.visibility = 'hidden';
        selectedProduct = null;
    }
});

// Edit button functionality
editButton.addEventListener('click', () => {
    if (selectedProduct) {
        console.log('Edit button clicked');

        // Fill form with selected product's data
        const img = selectedProduct.querySelector('img').src;
        const name = selectedProduct.querySelector('p:nth-of-type(1)').textContent;
        const sku = selectedProduct.querySelector('p:nth-of-type(2)').textContent;
        const unit = selectedProduct.querySelector('p:nth-of-type(3)').textContent;
        const price = selectedProduct.querySelector('p:nth-of-type(4)').textContent.replace('R$ ', '');
        const stock = selectedProduct.querySelector('p:nth-of-type(5)').textContent;

        document.getElementById('productName').value = name;
        document.getElementById('productSKU').value = sku;
        document.getElementById('productUnit').value = unit;
        document.getElementById('sellingPrice').value = price;
        document.getElementById('stock').value = stock;

        // Display the modal for editing
        modal.style.display = 'block';
    }
});

// Delete button functionality
deleteButton.addEventListener('click', () => {
    if (selectedProduct) {
        console.log('Delete button clicked');
        produtosContainer.removeChild(selectedProduct);
        actionButtons.style.visibility = 'hidden'; // Hide buttons after deletion
    }
});