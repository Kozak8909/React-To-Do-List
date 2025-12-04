import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Layout = lazy(() => import('./Layout/Layout'));
const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const ToDo = lazy(() => import('./Pages/To-Do'));
const NotFound = lazy(() => import('./Pages/NotFound'));

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/to-do" element={<ToDo />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
