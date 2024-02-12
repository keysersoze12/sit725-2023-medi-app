document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cartItems');
  const prescriptionForm = document.getElementById('prescriptionForm');
  const addToCartMedicine1Btn = document.getElementById('addToCartMedicine1');
  const addToCartMedicine2Btn = document.getElementById('addToCartMedicine2');
  const proceedToCheckoutBtn = document.getElementById('proceedToCheckout');

  // Event listener for prescription form submission
  prescriptionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(prescriptionForm); // Get form data

    const dosage = document.getElementById('dosage').value.trim(); // Extract dosage from input field

    // Append dosage to the form data
    formData.append('dosage', dosage);

    try {
      const response = await fetch('/prescriptions', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      alert('Prescription Uploaded Successfully!');
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

  // Event listener for adding Medicine 1 to cart
  addToCartMedicine1Btn.addEventListener('click', () => addToCart('Medicine 1'));

  // Event listener for adding Medicine 2 to cart
  addToCartMedicine2Btn.addEventListener('click', () => addToCart('Medicine 2'));

  // Event listener for proceeding to checkout
  proceedToCheckoutBtn.addEventListener('click', proceedToCheckout);

  // Function to add medicine to cart
  function addToCart(medicineName) {
    console.log(`Added ${medicineName} to cart`);

    const patientName = document.getElementById('patientName').value.trim();
    const dosage = document.getElementById('dosage').value.trim(); // Extract dosage from input field

    if (!patientName || !dosage) {
      console.error('Patient name and dosage are required');
      return;
    }

    const data = {
      name: patientName,
      medicineName: medicineName,
      dosage: dosage // Include dosage in the data sent to the server
    };

    // Send data to server for checkout
    fetch('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error in response from server');
        }
        return response.text();
      })
      .then(data => {
        console.log('Checkout response:', data);
      })
      .catch(error => {
        console.error('Error in addToCart:', error);
      });

    // Display dosage in the cart item
    const cartItem = document.createElement('li');
    cartItem.textContent = `${medicineName} - Dosage: ${dosage}`;
    cartItemsContainer.appendChild(cartItem);

    cartItem.classList.add('added-to-cart');
    setTimeout(() => {
      cartItem.classList.remove('added-to-cart');
    }, 1000);
  }

  // Function to proceed to checkout
  function proceedToCheckout() {
    console.log('Proceeding to checkout');
  }

  // Function to display prescription details
  function displayPrescription(prescription) {
    const prescriptionDiv = document.createElement('div');
    prescriptionDiv.innerHTML = `
      <p><strong>Patient Name:</strong> ${prescription.patientName}</p>
      <p><strong>Prescription File:</strong> ${prescription.prescriptionFile}</p>
      <hr>
    `;
    prescriptionsContainer.appendChild(prescriptionDiv);
  }
});
