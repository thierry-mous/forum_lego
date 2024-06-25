document.addEventListener('DOMContentLoaded', function() {
    const bioInput = document.getElementById('bio-input');
    const bioText = document.getElementById('bio-text');
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');

    const maxLength = 245; // Maximum number of characters for the bio

    // Function to split text into lines of 50 characters
    function formatBioText(text) {
        let formattedText = '';
        for (let i = 0; i < text.length; i += 50) {
            formattedText += text.substring(i, i + 50) + '\n';
        }
        return formattedText.trim(); // Remove the last newline character
    }

    // Event listener for the edit button
    editButton.addEventListener('click', function() {
        bioInput.value = bioText.innerText.trim().replace(/\n/g, '');
        bioText.classList.add('hidden');
        bioInput.classList.remove('hidden');
        editButton.classList.add('hidden');
        saveButton.classList.remove('hidden');
    });

    // Event listener for the save button
    saveButton.addEventListener('click', function() {
        if (bioInput.value.length > maxLength) {
            alert(`Biography cannot exceed ${maxLength} characters.`);
            return;
        }
        bioText.innerText = formatBioText(bioInput.value.trim());
        bioInput.classList.add('hidden');
        bioText.classList.remove('hidden');
        saveButton.classList.add('hidden');
        editButton.classList.remove('hidden');
    });

    // Limit input to maxLength characters
    bioInput.addEventListener('input', function() {
        if (bioInput.value.length > maxLength) {
            bioInput.value = bioInput.value.substring(0, maxLength);
        }
    });

    // Initial formatting
    bioText.innerText = formatBioText(bioText.innerText.trim());
});
