document.addEventListener('DOMContentLoaded', () => {
    const categoriesLink = document.getElementById('categoriesLink');
    const dropdownContent = document.querySelector('.dropdown-content');
    const profileLink = document.getElementById('profilelink');
    const profileDropdown = document.querySelector('.profile-dropdown');
    const signInLink = document.getElementById('sign_in');
    const signUpLink = document.getElementById('sign_up');

    // Fonction pour gérer l'affichage des menus déroulants
    function toggleDropdown(element, dropdown) {
        element.addEventListener('mouseover', () => {
            dropdown.style.display = 'block';
        });

        element.addEventListener('mouseout', () => {
            dropdown.style.display = 'none';
        });

        dropdown.addEventListener('mouseover', () => {
            dropdown.style.display = 'block';
        });

        dropdown.addEventListener('mouseout', () => {
            dropdown.style.display = 'none';
        });
    }

    toggleDropdown(categoriesLink, dropdownContent);

    toggleDropdown(profileLink, profileDropdown);

    const token = localStorage.getItem('jwtToken');
    if (token) {
        signInLink.style.display = 'none';
        signUpLink.style.display = 'none';
        profileLink.style.display = 'inline-block'; 
    } else {
        profileLink.style.display = 'none';
    }

    // Exemple de redirection vers la page de profil
    profileLink.addEventListener('click', function() {
        console.log('Redirect to profile page');
    });

    // Gestion du clic sur le lien de déconnexion
    const logoutLink = document.getElementById('logoutlink');
    logoutLink.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        logout(); // Appel de la fonction de déconnexion
    });

    // Fonction pour effectuer la déconnexion
    function logout() {
        fetch('http://localhost:3000/logout') // Envoyer une requête GET vers l'endpoint '/logout'
            .then(response => {
                if (response.ok) {
                    // Effacer le token JWT côté client
                    localStorage.removeItem('jwtToken');
                    console.log('Déconnexion réussie');
                    window.location.href = '/';
                } else {
                    console.error('Erreur lors de la déconnexion');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la déconnexion:', error);
            });
    }
});
