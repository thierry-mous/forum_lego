document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('id');

    const userId = getUserIdFromToken(); // Fonction pour obtenir userId à partir du token JWT

    fetch(`http://localhost:3000/api/posts/${topicId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Ajout du token JWT à l'en-tête Authorization
        },
    })
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('postsContainer');
            postsContainer.innerHTML = '';

            if (posts.length > 0) {
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `
                        <div class="center-container">
                            <div class="comment">
                                <div class="user-info">
                                    <div class="infopost">
                                        <p class="username">${post.username}</p>
                                        <p class="user-role">${post.admin_status ? post.admin_status : 'User'}</p>
                                    </div>
                                    <p class="post-date">Posted on: ${new Date(post.publish_date).toLocaleDateString()}</p>
                                </div>
                                <div class="post-content">
                                    <p class="post-text">${post.body}</p>
                                </div>
                                <div class="separator"></div>
                                ${post.topic_user_id === userId ? `<button class="delete-btn" data-post-id="${post.id}">Supprimer</button>` : ''}
                            </div>
                        </div>
                    `;
                    postsContainer.appendChild(postElement);

                    if (post.topic_user_id === userId) {
                        const deleteBtn = postElement.querySelector('.delete-btn');
                        if (deleteBtn) {
                            deleteBtn.addEventListener('click', () => {
                                deletePost(post.id);
                            });
                        }
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function deletePost(postId) {
        fetch(`http://localhost:3000/api/deletePost/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Ajout du token JWT à l'en-tête Authorization
            },
        })
            .then(response => {
                if (response.ok) {
                    // Actualisation de la liste des messages après la suppression
                    // Vous pouvez implémenter cette logique ici si nécessaire
                    console.log('Post deleted successfully');
                    window.location.reload(); 
                } else {
                    console.error('Failed to delete post');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function getUserIdFromToken() {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const decoded = jwt_decode(token); // Utilisation de la librairie jwt_decode pour décoder le token
                return decoded.userId; // Retourne l'ID de l'utilisateur depuis le token décodé
            } catch (error) {
                console.error('Failed to decode JWT token:', error);
                return null;
            }
        }
        return null; // Retourne null si aucun token n'est trouvé ou s'il y a une erreur de décodage
    }
});
