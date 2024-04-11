document.addEventListener('DOMContentLoaded', function() {
    const sneakerList = document.getElementById('sneakerList');
    const brandFilter = document.getElementById('brandFilter');

    fetch('https://raw.githubusercontent.com/Stupidism/goat-sneakers/master/api.json')
        .then(response => response.json())
        .then(data => {
            const brands = new Set();
            data.sneakers.forEach(sneaker => {
                brands.add(sneaker.brand);
                const sneakerElement = document.createElement('div');
                sneakerElement.classList.add('sneaker');
                sneakerElement.innerHTML = `
                    <img src=${sneaker.grid_picture_url} alt="${sneaker.name}">
                    <h2>${sneaker.name}</h2>
                    <p><strong>Brand:</strong> ${sneaker.brand_name}</p>
                    <p><strong>Colorway:</strong> ${sneaker.color}</p>
                    <p><strong>Release Date:</strong> ${sneaker.release_date}</p>
                    <p><strong>Retail Price:</strong> $${sneaker.retail_price_cents}</p>
                `;
                sneakerList.appendChild(sneakerElement);
            });

            brands.forEach(brand => {
                const option = document.createElement('option');
                option.value = brand;
                option.textContent = brand;
                brandFilter.appendChild(option);
            });

            brandFilter.addEventListener('change', function() {
                const selectedBrand = this.value;
                const sneakers = document.querySelectorAll('.sneaker');
                sneakers.forEach(sneaker => {
                    if (selectedBrand === '' || sneaker.querySelector('p:nth-child(2)').textContent.includes(selectedBrand)) {
                        sneaker.style.display = 'block';
                    } else {
                        sneaker.style.display = 'none';
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    const searchButton = document.getElementById('searchButton');

    // Add event listener to the search button
    searchButton.addEventListener('click', function() {
        // Get the search query entered by the user
        const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();

        // Fetch the sneaker data
        fetch('https://raw.githubusercontent.com/Stupidism/goat-sneakers/master/api.json')
            .then(response => response.json())
            .then(data => {
                // Filter the sneaker data based on the search query
                const filteredSneakers = data.sneakers.filter(sneaker =>
                    sneaker.name.toLowerCase().includes(searchQuery) ||
                    sneaker.brand.toLowerCase().includes(searchQuery) ||
                    sneaker.color.toLowerCase().includes(searchQuery)
                );

                // Display the filtered sneaker results
                displaySneakers(filteredSneakers);
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    // Function to display sneaker results
    function displaySneakers(sneakers) {
        const sneakerList = document.getElementById('sneakerList');
        sneakerList.innerHTML = '';

        sneakers.forEach(sneaker => {
            const sneakerElement = document.createElement('div');
            sneakerElement.classList.add('sneaker');
            sneakerElement.innerHTML = `
                <img src=${sneaker.grid_picture_url} alt="${sneaker.name}">
                <h2>${sneaker.name}</h2>
                <p><strong>Brand:</strong> ${sneaker.brand_name}</p>
                <p><strong>Colorway:</strong> ${sneaker.color}</p>
                <p><strong>Release Date:</strong> ${sneaker.release_date}</p>
                <p><strong>Retail Price:</strong> $${sneaker.retail_price_cents}</p>
            `;
            sneakerList.appendChild(sneakerElement);
        });
    }
});

// Get a reference to the search button


