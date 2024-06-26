document.addEventListener("DOMContentLoaded", function() {
    axios.get('http://localhost:3000/api/posts')
        .then(response => {
            const postsContainer = document.querySelector('.inside_box');
            postsContainer.innerHTML = '';

            response.data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('box');
                postElement.innerHTML = `
                    <h3 class="box_title">${post.author}</h3>
                    <p class="para_box">${post.user_role}</p>
                    <small>${new Date(post.publish_date).toLocaleDateString()}</small>
                    <p class="topic_box">${post.topic_title}</p>
                    <p class="body_topic_box">${post.body}</p>
                    <div class="all_stats">
                        <img class="icon_img1" src="/public/img/pouce.png" alt="like" class="like">
                        <div class="mess_eye">
                        <img class="icon_img" src="/public/img/oeil.png" alt="eye" class="eye">
                        <img class="icon_img1" src="/public/img/message.png" alt="message" class="message">
                        </div>
                    </div>
                    
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
});
