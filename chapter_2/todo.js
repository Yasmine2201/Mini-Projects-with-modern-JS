const form = document.querySelector('.add-container');
const unorderedList = document.querySelector(".list-group");
const searchInput = document.querySelector('.search input');

form.addEventListener('submit', e => {
    e.preventDefault();
    let newTodoValue = form.add.value.trim();
    
    if (newTodoValue.length >0){
        
        let html = `
        <li>
        <span>${newTodoValue}</span> 
            <i class="fas fa-trash-alt delete-icon"></i>
        </li> `
        ;
        unorderedList.innerHTML += html;

        form.reset(); 
    }

});

unorderedList.addEventListener('click', (e) => {

    if (e.target && e.target.classList.contains('delete-icon')) {
        e.target.parentElement.remove();
    }
});

searchInput.addEventListener('input', function(event) {
    const searchTerm = event.target.value.trim();
    const searchTermRgx = new RegExp(searchTerm, 'i');
    const listItems = Array.from(unorderedList.children);

    listItems.forEach(item => {
        const spanItem = item.children[0]; 
        const itemText = spanItem.textContent.trim(); 
        if (searchTerm.length > 0) {
            if (searchTermRgx.test(itemText)) { 
                const highlightedText = itemText.replace(searchTermRgx, match => `<span class="highlight">${match}</span>`);
                spanItem.innerHTML = highlightedText;
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        } else {
            spanItem.innerHTML = itemText; 
            item.style.display = '';
        }
    });
});

