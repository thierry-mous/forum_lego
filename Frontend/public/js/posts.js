document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('id');

    fetch(`http://localhost:3000/api/topics/getTopics/${topicId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(posts => {
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <div class="user-info">
                    <p class="username">${post.author}</p>
                    <p class="user-role">${post.admin_status ? post.admin_status : 'User'}</p>
                </div>
                <div class="post-content">
                    <p class="post-date">Posted on: ${new Date(post.publish_date).toLocaleDateString()}</p>
                    <p class="post-text">${post.body}</p>
                </div>
            `;
            postsContainer.appendChild(postElement);

            fetch(`http://localhost:3000/api/comments/getCommentsByPostId/${post.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(comments => {
                const commentsList = document.getElementById(`comments-${post.id}`);
                commentsList.innerHTML = '';
                comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `
                        <div class="user-info">
                            <p class="username">${comment.author}</p>
                            <p class="comment-date">Commented on: ${new Date(comment.comment_date).toLocaleDateString()}</p>
                        </div>
                        <div class="comment-text">${comment.body}</div>
                    `;
                    commentsList.appendChild(commentElement);
                });
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
        });

        const commentsFormSection = document.createElement('div');
        commentsFormSection.classList.add('comments-form-section');
        commentsFormSection.innerHTML = `
            <h3>Add a Comment</h3>
            <form id="commentForm">
                <textarea id="comment" rows="3" placeholder="Add a comment"></textarea>
                <button type="submit">Post Comment</button>
            </form>
        `;
        postsContainer.appendChild(commentsFormSection);

        document.getElementById('commentForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const commentInput = document.getElementById('comment').value;
            if (commentInput.trim() !== '') {
                const newComment = {
                    body: commentInput,
                    author: 'User', 
                    comment_date: new Date().toISOString() 
                };

                fetch('http://localhost:3000/api/comments/createComment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newComment),
                })
                .then(response => response.json())
                .then(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `
                        <div class="user-info">
                            <p class="username">${comment.author}</p>
                            <p class="comment-date">Commented on: ${new Date(comment.comment_date).toLocaleDateString()}</p>
                        </div>
                        <div class="comment-text">${comment.body}</div>
                    `;
                    const commentsList = document.querySelector('.comments-list');
                    commentsList.appendChild(commentElement);
                    document.getElementById('comment').value = '';
                })
                .catch(error => {
                    console.error('Error posting comment:', error);
                });
            }
        });
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
});
