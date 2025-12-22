import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PrivateRoute } from './Routes/PrivateRoute';
import { ThreeDots } from 'react-loader-spinner';

const Layout = lazy(() => import('./Layout/Layout'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Login = lazy(() => import('./Pages/Login/Login'));
const Register = lazy(() => import('./Pages/Register/Register'));
const About = lazy(() => import('./Pages/About/About'));
const ToDo = lazy(() => import('./Pages/To-Do/To-Do'));
const Task = lazy(() => import('./Pages/TaskPage/TaskPage'));
const NotFound = lazy(() => import('./Pages/NotFound/NotFound'));

function App() {
  return (
    <Suspense fallback={<ThreeDots color="gray" />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/to-do" element={<PrivateRoute><ToDo /></PrivateRoute>} />
          <Route path="/to-do/:id" element={<PrivateRoute><Task /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
