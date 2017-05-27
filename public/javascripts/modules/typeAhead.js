const axios = require('axios');

function searchResultsHTML(stores) {
	return stores.map(store => {
		return `
		  <a href="/stores/${store.slug}" class="search__result">
		    <strong>${store.name}</strong>
		  </a>
		`;
	}).join('');

}      


function typeAhead(search) {
    if (!search) return;

    const searchInput = search.querySelector('input[name="search"]');
    const searchResults = search.querySelector('.search__results');

    searchInput.on('input', function() {
    	if(!this.value) {
    		searchResults.style.display = 'none';
    		return;
    	}

    	searchResults.style.display = 'block';
    	searchResults.innerHTML = '';

    	axios
    	  .get(`/api/search?q=${this.value}`)
    	  .then(res => {
    	  	if(res.data.length) {
    	  		searchResults.innerHTML = searchResultsHTML(res.data);
    	  	}
    	  })
    	  .catch(err => {
             console.log(err);
    	  });
    });

    // handle keyboard inputs
    searchInput.on('keyup', (e) => {
    	console.log(e.keycode);
    	// if they aren't pressing up. down or enter, who cares?
    	if (![38, 40, 13].includes(e.keyCode)) {
    		return;
    	}
    	const activeClass = 'search__result--active';
    	const current = search.querySelector(`.${activeClass}`);
    	const items = search.querySelectorAll('.search__result');
    	let next;
    	if (e.keyCode === 40 && current) {
    		next = current.nextElementSibling || items[0];
    	} else if (e.keyCode === 40) {
    		next === items[0];
    	}
    });
}

export default typeAhead;