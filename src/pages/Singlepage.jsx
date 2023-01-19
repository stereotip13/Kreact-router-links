import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Singlepage = () => {
  const { id } = useParams(); //ключ объекта(параметр) носит такое же имя как в роутах, только теперь их можно использовать
  const navigate = useNavigate(); //использование функции для навигации
  const [post, setPost] = useState(); //сохраняем массив в стайте

  const goBack = () => navigate(-1); //ходить по истории как назад исп-я отрицат числа так и вперед используя положительные числа
  const goHome = () => navigate('/', { replace: true }); //движение на гл стр true это когда не через историю навигации, а просто переход

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`) // запрос на сервак
      .then((res) => res.json()) // обработка json
      .then((data) => setPost(data)); // помещаем data из json в стейт
  }, [id]);

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      {/* кнопка домой ниже привеженным образом не лучшая практика, т.к. лучше восп-ся link */}
      <button onClick={goHome}>Go home</button>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <Link to={`/posts/${id}/edit`}>
            Редактровать текущий пост с текущим айдишником : {id}
          </Link>
        </>
      )}
    </div>
  );
};

export { Singlepage };