document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('id');

    const userId = getUserIdFromToken();

    fetch(`http://localhost:3000/api/posts/${topicId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
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
                                <p class="post-date">${new Date(post.publish_date).toLocaleDateString()}</p>
                            </div>
                            <div class="post-content">
                                <p class="post-text">${post.body}</p>
                            </div>
                            <div class="delete-button-container">
                                ${post.topic_user_id === userId ? `
                                <img src="/public/img/menu.png" alt="menu" class="delete-menu-image">
                                <div class="delete-menu">
                                    <div class="delete-option" data-post-id="${post.id}">Supprimer</div>
                                </div>` : ''}
                            </div>
                        </div>
                        <div class="separator"></div>
                    </div>
                `;
                postsContainer.appendChild(postElement);

                if (post.topic_user_id === userId) {
                    const deleteButtonContainer = postElement.querySelector('.delete-button-container');
                    const deleteMenuImage = deleteButtonContainer.querySelector('.delete-menu-image');
                    const deleteMenu = deleteButtonContainer.querySelector('.delete-menu');
                    const deleteOption = deleteButtonContainer.querySelector('.delete-option');

                    deleteMenuImage.addEventListener('mouseover', () => {
                        deleteMenu.classList.add('active');
                    });
                    deleteButtonContainer.addEventListener('mouseleave', () => {
                        deleteMenu.classList.remove('active');
                    });

                    deleteOption.addEventListener('click', (event) => {
                        event.stopPropagation();
                        const postId = deleteOption.getAttribute('data-post-id');
                        if (window.confirm('Voulez-vous vraiment supprimer ce post ?')) {
                            deletePost(postId);
                        }
                    });
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
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
        .then(response => {
            if (response.ok) {
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
                const decoded = jwt_decode(token);
                return decoded.userId;
            } catch (error) {
                console.error('Failed to decode JWT token:', error);
                return null;
            }
        }
        return null;
    }
});
