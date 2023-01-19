import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin } = useAuth(); //берем метод из хука useAuth

  const fromPage = location.state?.from?.pathname || '/'; //проверяем откуда пришел п-ль по умолчанию с главной страницы

  // event принимает событие
  const handleSubmit = (event) => {
    event.preventDefault(); //чтобы форма не отправлялась
    const form = event.target;
    const user = form.username.value; //по хорошему сделать проверку что там не пусто

    signin(user, () => navigate(fromPage, { replace: true })); //принимает юзера и колбэк отправляем пользов обратноы
  };

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input name="username" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export { LoginPage };
