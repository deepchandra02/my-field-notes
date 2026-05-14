import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostPage from './pages/PostPage'
import Archive from './pages/Archive'
import TagsIndex from './pages/TagsIndex'
import TagPage from './pages/TagPage'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/post/:slug" element={<PostPage />} />
      <Route path="/tags" element={<TagsIndex />} />
      <Route path="/tags/:tag" element={<TagPage />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
