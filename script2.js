
let originalContent;
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');
const content = document.getElementById('content');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', searchText);
clearButton.addEventListener('click', clearSearch);

function searchText() {
  const searchTerm = searchInput.value.toLowerCase();
  if (!originalContent) {
    originalContent = content.innerHTML;
  }

  if (searchTerm !== '') {
    const regex = new RegExp(searchTerm, 'gi');
    const highlightedContent = originalContent.replace(regex, match => {
      return `<span class="highlight">${match}</span>`;
    });

    content.innerHTML = highlightedContent;
    const matches = content.querySelectorAll('.highlight');
    searchResults.textContent = `${matches.length} results found`;

    // Scroll to first highlighted text
    if (matches.length > 0) {
      matches[0].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  } else {
    content.innerHTML = originalContent;
    searchResults.textContent = '';
  }
}

function clearSearch() {
  searchInput.value = '';
  content.innerHTML = originalContent;
  searchResults.textContent = '';
}


if (matches.length > 0) {
matches[0].scrollIntoView({
behavior: 'smooth',
block: 'center',
inline: 'center'
});
}
