const amount = document.querySelector('#amount');

let value = amount.innerHTML.replace(/[^0-9]/g, ''); // Remove non-numeric characters
value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Insert commas every 3 characters
value += '.00'; // Add ".00" at the end

amount.innerHTML = value;