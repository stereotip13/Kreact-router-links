import {
  useParams,
  Link,
  useNavigate,
  useLoaderData,
  Await,
  useAsyncValue,
} from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';

const Post = () => {
  const post = useAsyncValue();
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};
const Comments = () => {
  const comments = useAsyncValue();
  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <>
          <h3>{comment.email}</h3>
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
        </>
      ))}
    </div>
  );
};
const Singlepage = () => {
  const { post, id, comments } = useLoaderData(); // с помощью этого хука забираем информацию из роутов
  //const { id } = useParams(); //ключ объекта(параметр) носит такое же имя как в роутах, только теперь их можно использовать
  const navigate = useNavigate(); //использование функции для навигации
  //const [post, setPost] = useState(); //сохраняем массив в стайте

  const goBack = () => navigate(-1); //ходить по истории как назад исп-я отрицат числа так и вперед используя положительные числа
  // ниже приведена бад практис
  const goHome = () => navigate('/', { replace: true }); //движение на гл стр true это когда не через историю навигации, а просто переход

  // можно не использовать юз эффект потому, что подгружаем параметры при роутинге
  // useEffect(() => {
  //   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`) // запрос на сервак
  //     .then((res) => res.json()) // обработка json
  //     .then((data) => setPost(data)); // помещаем data из json в стейт
  // }, [id]);

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      {/* кнопка домой ниже привеженным образом не лучшая практика, т.к. лучше восп-ся link */}
      <button onClick={goHome}>Go home</button>
      <Suspense fallback={<h2>loading post ...</h2>}>
        <Await resolve={post}>
          <Post />
        </Await>
      </Suspense>
      {/* Саспенс позволяет показывать сообщение пока мы ждем загрузку */}
      <Suspense fallback={<h2>comment is loading...</h2>}>
        <Await resolve={comments}>
          <Comments />
        </Await>
      </Suspense>
      {post && (
        <>
          <Link to={`/posts/${id}/edit`}>
            Редактровать текущий пост с текущим айдишником : {id}
          </Link>
        </>
      )}
    </div>
  );
};
async function getPostById(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  //const post = await res.json(); // обработка json
  return res.json();
}
// получаем комментарии
async function getCommentsByPost(id) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  return res.json();
}

const postLoader = async ({ params }) => {
  const id = params.id;
  // что-то нужно сразу, другое потом, если добавить await к постам они загрузятся сразу, потом зайдет польз на стр и только тогда загрузятся коменты
  return { post: await getPostById(id), id, comments: getCommentsByPost(id) };
};

export { Singlepage, postLoader };
