document.addEventListener("DOMContentLoaded", function () {
    const userId = 1; 

    fetchUserProfile(userId);

    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const bioText = document.getElementById('bio-text');
    const bioInput = document.getElementById('bio-input');

    const editUsernameIcon = document.getElementById('edit-username-icon');
    const saveUsernameButton = document.getElementById('save-username-button');
    const usernameElement = document.getElementById('username');
    const usernameInput = document.getElementById('username-input');

    editButton.addEventListener('click', () => {
        bioText.classList.add('hidden');
        bioInput.classList.remove('hidden');
        bioInput.value = bioText.textContent;
        editButton.classList.add('hidden');
        saveButton.classList.remove('hidden');
    });

    saveButton.addEventListener('click', () => {
        const newBio = bioInput.value;
        updateBiography(newBio);
    });

    editUsernameIcon.addEventListener('click', function() {
        usernameElement.classList.add('hidden');
        usernameInput.classList.remove('hidden');
        saveUsernameButton.classList.remove('hidden');
        usernameInput.value = usernameElement.textContent.trim();
        usernameInput.focus();
    });

    saveUsernameButton.addEventListener('click', function() {
        const newUsername = usernameInput.value;
        updateUsername(newUsername);
    });

    function fetchUserProfile(userId) {
        const mockData = {
            username: 'ExampleUser',
            email: 'user@example.com',
            biography: 'This is a sample biography.',
        };

        updateUI(mockData);
    }

    function updateBiography(newBio) {
  
        bioText.textContent = newBio;
        bioText.classList.remove('hidden');
        bioInput.classList.add('hidden');
        editButton.classList.remove('hidden');
        saveButton.classList.add('hidden');
    }

    function updateUsername(newUsername) {
        usernameElement.textContent = newUsername;
        usernameElement.classList.remove('hidden');
        usernameInput.classList.add('hidden');
        saveUsernameButton.classList.add('hidden');
    }

    function updateUI(data) {
        document.getElementById('profile-photo').src = '/public/img/pplego.png';
        usernameElement.textContent = data.username;
        document.getElementById('email').textContent = data.email;
        bioText.textContent = data.biography || 'No biography set';
    }
});
