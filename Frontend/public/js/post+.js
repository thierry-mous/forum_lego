document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('id');

    const postsContainer = document.getElementById('postsContainer');
    const commentTextarea = document.querySelector('.comment-textarea');
    const commentButton = document.querySelector('.comment-button');

    commentButton.addEventListener('click', () => {
        const commentBody = commentTextarea.value.trim();
        if (commentBody === '') {
            alert('Please enter a comment.');
            return;
        }

        const commentData = {
            body: commentBody,
            topics_id: topicId,
            users_id: 1, // Remplacez par l'ID de l'utilisateur connecté (à récupérer via token)
        };

        fetch('http://localhost:3000/api/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        })
        .then(response => response.json())
        .then(result => {
            // Création de l'élément du commentaire nouvellement ajouté
            const commentElement = document.createElement('div');
            commentElement.classList.add('post');
            commentElement.innerHTML = `
                <div class="center-container">
                    <div class="comment">
                        <div class="user-info">
                            <div class="infopost">
                                <p class="username">User</p> <!-- Remplacez par le nom de l'utilisateur connecté -->
                                <p class="user-role">User</p>
                            </div>
                            <p class="post-date">Posted on: ${new Date().toLocaleDateString()}</p>
                        </div>
                        <div class="post-content">
                            <p class="post-text">${commentBody}</p>
                        </div>
                        <div class="separator"></div>
                    </div>
                </div>
            `;
            postsContainer.appendChild(commentElement);

            // Réinitialisation du champ de commentaire après l'ajout
            commentTextarea.value = '';

            // Rechargement de la page pour rafraîchir les commentaires
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
