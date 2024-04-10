import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPost, addComment, deleteComment } from '../features/postsSlice';

const PostDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector(state => state.posts);
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  const handleCommentSubmit = () => {
    dispatch(addComment({ postId: id, body: comment }));
    setComment('');
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ postId: id, commentId }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>Пост не найден</div>; 

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h2>Комментарии</h2>
      {post.comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.body}</p>
          <button onClick={() => handleDeleteComment(comment.id)}>Удалить</button>
        </div>
      ))}
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={handleCommentSubmit}>Добавить комментарий</button>
    </div>
  );
};

export default PostDetailPage;
