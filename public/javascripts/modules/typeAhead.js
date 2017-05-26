const axios = require('axios');

function typeAhead(search) {
    if (!search) return;

    const searchInput = search.querySelector('input[name="search"]');
    const searchResults = search.querySelector('.search__results');

    searchInput.on('input', function() {
    	if(!this.value) {
    		searchResults.style.display = 'none';
    	}
    });
}

export default typeAhead;