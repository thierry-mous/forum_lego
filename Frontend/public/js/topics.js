document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('id');
    const triSelect = document.getElementById('tri');
    const topicsContainer = document.getElementById('topicsContainer');
    const categoryDiv = document.getElementsByClassName('categories')[0];

    triSelect.addEventListener('change', function() {
        const sortValue = triSelect.value;
        fetch(`http://localhost:3000/api/topics/getTopicsByTags/${topicId}?sort=${sortValue}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            topicsContainer.innerHTML = '';
            categoryDiv.innerHTML = '';

            data.forEach(topic => {
                const topicElement = document.createElement('a');
                topicElement.href = `posts?id=${topic.id}`;
                topicElement.classList.add('post-link');
                topicElement.innerHTML = `
                    <div class="post">
                        <div class="post-content">
                            <p class="post-text">${topic.title}</p>
                            <div class="user-role">${topic.admin_status}</div>
                        </div>
                        <div class="user-info">
                            <p class="username">${topic.username}</p>
                            <p class="post-date">${new Date(topic.publish_date).toLocaleDateString()}</p>
                        </div>
                    </div>
                `;
                topicsContainer.appendChild(topicElement);
            });

            if (data.length > 0) {
                const firstTopic = data[0];
                if (categoryDiv) {
                    const tagParagraph = document.createElement('p');
                    tagParagraph.classList.add('cat_text');
                    tagParagraph.textContent = `${firstTopic.tag_label}`;
                    categoryDiv.appendChild(tagParagraph);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    triSelect.dispatchEvent(new Event('change'));
});
