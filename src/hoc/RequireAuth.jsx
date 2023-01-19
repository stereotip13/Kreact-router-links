import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
// в роли чилдрена выступает конкр-я дочерняя страница, по отношению к наст-му ком-ту
const RequireAuth = ({ children }) => {
  const location = useLocation(); //получаем сам объект локации
  const { user } = useAuth(); //хук возвращает юзера (в данном случае стр-ку) при авторизации, которого мы будем использовать

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />; //в стейте передаем откуда мы пришли
  }
  // если есть авторизация, то попадаем на любую страницу переданную в качестве чилдрена
  return children;
};

export { RequireAuth };
