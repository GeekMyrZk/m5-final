import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" component={PostsPage} />
          <Route path="/post/:id" component={PostDetailPage} />
          <Route path='*' component={<div>404 Not Found</div>} />
        </Routes>
      
    </Router>
  );
};

export default App;

