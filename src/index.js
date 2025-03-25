console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Challenge 1: Fetch and display dog images
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById('dog-image-container');
            data.message.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = 'Random dog image';
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching images:', error));

    // Challenge 2: Fetch and display dog breeds
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let allBreeds = []; // Store breeds for filtering later
    const breedList = document.getElementById('dog-breeds'); // Declare breedList here

    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message);
            
            // Initial render of all breeds
            renderBreeds(allBreeds, breedList);

            // Challenge 3: Add click behavior to list items
            breedList.addEventListener('click', (e) => {
                if (e.target.tagName === 'LI') {
                    e.target.style.color = 'blue'; // You can change this color
                }
            });

            // Challenge 4: Filter breeds by letter
            const breedFilter = document.getElementById('breed-dropdown');
            breedFilter.addEventListener('change', (e) => {
                const selectedLetter = e.target.value;
                const filteredBreeds = selectedLetter === 'all' 
                    ? allBreeds 
                    : allBreeds.filter(breed => breed.startsWith(selectedLetter));
                
                // Clear current list and render filtered breeds
                breedList.innerHTML = '';
                renderBreeds(filteredBreeds, breedList);
            });
        })
        .catch(error => console.error('Error fetching breeds:', error));
});

// Helper function to render breeds
function renderBreeds(breeds, listElement) {
    breeds.forEach(breed => {
        const li = document.createElement('li');
        li.textContent = breed;
        listElement.appendChild(li);
    });
}