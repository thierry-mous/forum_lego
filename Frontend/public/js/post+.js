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
                    </div>
                    </div>
                `;
            postsContainer.appendChild(commentElement);

            // Effacer le champ de texte après l'ajout du commentaire
            commentTextarea.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
