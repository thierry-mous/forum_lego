document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('id');

    const postsContainer = document.getElementById('postsContainer');
    const commentTextarea = document.querySelector('.comment-textarea');
    const commentButton = document.querySelector('.comment-button');

    commentButton.addEventListener('click', async () => {
        const commentBody = commentTextarea.value.trim();
        if (commentBody === '') {
            alert('Please enter a comment.');
            return;
        }

        // Récupérer le token depuis le localStorage
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            alert('User is not authenticated');
            return;
        }

        // Décoder le token pour obtenir l'ID de l'utilisateur
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        console.log('User ID:', userId);

        const commentData = {
            body: commentBody,
            topics_id: topicId,
            users_id: userId,
        };

        try {
            const response = await fetch('http://localhost:3000/api/createPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(commentData),
            });

            const result = await response.json();

            // Création de l'élément du commentaire nouvellement ajouté
            const commentElement = document.createElement('div');
            commentElement.classList.add('post');
            commentElement.innerHTML = `
                <div class="center-container">
                    <div class="comment">
                        <div class="user-info">
                            <div class="infopost">
                                <p class="username">${decodedToken.username}</p> <!-- Utilisation du nom de l'utilisateur -->
                                <p class="user-role">User</p> <!-- Ajoutez le rôle si nécessaire -->
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

            commentTextarea.value = '';

         location.reload(); 

        } catch (error) {
            console.error('Error:', error);
        }
    });
});
