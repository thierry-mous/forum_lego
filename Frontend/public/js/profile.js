document.addEventListener('DOMContentLoaded', function() {
    const bioInput = document.getElementById('bio-input');
    const bioText = document.getElementById('bio-text');
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');

    const maxLength = 245;

    function formatBioText(text) {
        let formattedText = '';
        for (let i = 0; i < text.length; i += 60) {
            formattedText += text.substring(i, i + 60) + '\n';
        }
        return formattedText.trim(); 
    }

    editButton.addEventListener('click', function() {
        bioInput.value = bioText.innerText.trim().replace(/\n/g, '');
        bioText.classList.add('hidden');
        bioInput.classList.remove('hidden');
        editButton.classList.add('hidden');
        saveButton.classList.remove('hidden');
    });

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

   
    bioInput.addEventListener('input', function() {
        if (bioInput.value.length > maxLength) {
            bioInput.value = bioInput.value.substring(0, maxLength);
        }
    });


    bioText.innerText = formatBioText(bioText.innerText.trim());
});
