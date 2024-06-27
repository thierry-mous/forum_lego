// public/js/index.js
document.addEventListener('DOMContentLoaded', () => {
    const categoriesLink = document.getElementById('categoriesLink');
    const dropdownContent = document.querySelector('.dropdown-content');

    categoriesLink.addEventListener('mouseover', () => {
        dropdownContent.style.display = 'block';
    });

    categoriesLink.addEventListener('mouseout', () => {
        dropdownContent.style.display = 'none';
    });

    dropdownContent.addEventListener('mouseover', () => {
        dropdownContent.style.display = 'block';
    });

    dropdownContent.addEventListener('mouseout', () => {
        dropdownContent.style.display = 'none';
    });
});
