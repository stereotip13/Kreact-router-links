import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';

const Createpost = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Create a post</h1>
      <p>тут может быть форма с возможностью добавления поста</p>
      {/* вызываем фунцию разлогирования и перехода на главную страницу */}
      <button onClick={() => signout(() => navigate('/', { replace: true }))}>
        Log Out
      </button>
    </div>
  );
};

export { Createpost };
