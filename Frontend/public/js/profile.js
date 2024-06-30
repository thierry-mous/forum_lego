document.addEventListener("DOMContentLoaded", function () {
    const userId = 1;

    fetchUserProfile(userId);

    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const bioText = document.getElementById('bio-text');
    const bioInput = document.getElementById('bio-input');

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

    function fetchUserProfile() {
        const token = getToken();
        console.log('Token:', token);

        axios.get(`http://localhost:3000/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            if (!response.data) {
                throw new Error('No data received');
            }
            const data = response.data;

            if (typeof data === 'object') {
                document.getElementById('profile-photo').src = data.photo || '/public/img/pplego.png';
                document.getElementById('username').textContent = data.username;
                document.getElementById('email').textContent = data.email;
                document.getElementById('lastco').textContent = data.last_connection || 'N/A';
                document.getElementById('nbtopic').textContent = data.nb_topics || 'N/A';
                document.getElementById('role').textContent = data.role || 'User';
                document.getElementById('bio-text').textContent = data.biography || 'No biography set';
            } else {
                console.log('Response message:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
    }

    function updateBiography(newBio) {
        const token = getToken();

        axios.put(`http://localhost:3000/profileBio`, { biography: newBio }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const updatedBio = response.data.biography;
            bioText.textContent = updatedBio;
            console.log('Biography updated successfully:', updatedBio);
            bioText.classList.remove('hidden');
            bioInput.classList.add('hidden');
            editButton.classList.remove('hidden');
            saveButton.classList.add('hidden');
        })
        .catch(error => {
            console.error('Error updating biography:', error);
        });
    }

    // Fonction utilitaire pour récupérer le token JWT depuis le localStorage
    function getToken() {
        return localStorage.getItem('jwtToken');
    }
});
