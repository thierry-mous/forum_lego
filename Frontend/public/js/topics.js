document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('id');
    const triSelect = document.getElementById('tri');
    const topicsContainer = document.getElementById('topicsContainer');
    
    function loadTopics(sortValue) {
        fetch(`http://localhost:3000/api/topics/getTopicsByTags/${topicId}?sort=${sortValue}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
        })
        .then(response => response.json())
        .then(data => {
            topicsContainer.innerHTML = '';
            
            data.forEach(topic => {
                const topicElement = document.createElement('div');
                topicElement.classList.add('post');

                const postContent = document.createElement('div');
                postContent.classList.add('post-content');
                postContent.innerHTML = `
                    <p class="post-text">${topic.title}</p>
                    <div class="user-role">${topic.admin_status}</div>
                `;

                const userInfo = document.createElement('div');
                userInfo.classList.add('user-info');
                userInfo.innerHTML = `
                    <p class="username">${topic.username}</p>
                    <p class="post-date">${new Date(topic.publish_date).toLocaleDateString()}</p>
                `;

                const categories = document.querySelector('.categories');
                categories.innerHTML = `<p>${topic.tag_label}</p>`;

                const userId = getUserIdFromJWT();
                console.log('User ID:', userId);
                console.log('Topic user ID:', topic.users_id);
                if (userId && topic.users_id === userId) {
                    const deleteMenuContainer = document.createElement('div');
                    deleteMenuContainer.classList.add('delete-menu-container');

                    const deleteImage = document.createElement('img');
                    deleteImage.src = 'public/img/menu.png';
                    deleteImage.alt = 'Menu de suppression';
                    deleteImage.classList.add('delete-image');
                    deleteImage.addEventListener('mouseenter', () => {
                        toggleDeleteMenu(deleteMenuContainer, true);
                    });

                    deleteMenuContainer.addEventListener('mouseleave', () => {
                        toggleDeleteMenu(deleteMenuContainer, false);
                    });

                    const deleteMenu = document.createElement('div');
                    deleteMenu.classList.add('delete-menu');
                    const deleteOption = document.createElement('div');
                    deleteOption.classList.add('delete-option');
                    deleteOption.textContent = 'Supprimer';
                    deleteOption.addEventListener('click', (event) => {
                        event.stopPropagation();
                        if (window.confirm('Voulez-vous vraiment supprimer ce sujet ?')) {
                            deleteTopic(topic.id);
                            window.location.reload();
                        }
                    });

                    deleteMenu.appendChild(deleteOption);
                    deleteMenuContainer.appendChild(deleteImage);
                    deleteMenuContainer.appendChild(deleteMenu);

                    userInfo.appendChild(deleteMenuContainer);
                }

                topicElement.addEventListener('click', () => {
                    window.location.href = `/posts?id=${topic.id}`;
                });

                topicElement.appendChild(postContent);
                topicElement.appendChild(userInfo);
                topicsContainer.appendChild(topicElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function deleteTopic(topicId) {
        fetch(`http://localhost:3000/api/topics/${topicId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du sujet');
            }
            return response.json();
        })
        .then(data => {
            loadTopics(triSelect.value);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function toggleDeleteMenu(deleteMenuContainer, show) {
        if (show) {
            deleteMenuContainer.querySelector('.delete-menu').classList.add('active');
        } else {
            deleteMenuContainer.querySelector('.delete-menu').classList.remove('active');
        }
    }

    triSelect.addEventListener('change', function() {
        const sortValue = triSelect.value;
        loadTopics(sortValue); 
    });

    loadTopics(triSelect.value);
});

function getUserIdFromJWT() {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;
    
    try {
        const decoded = jwt_decode(token);
        return decoded.userId;
    } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
        return null;
    }
}
