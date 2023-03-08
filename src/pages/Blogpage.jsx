//import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import {
  Await,
  defer,
  Link,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom';
import { BlogFilter } from '../components/BlogFilter';

const Blogpage = () => {
  //const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  //posts - в фигурных скобках это уже получается объект как бы мы типизируем
  const { posts } = useLoaderData(); //хук который достает посты из лоадера
  const postQuery = searchParams.get('post') || '';
  const latest = searchParams.has('latest');

  const startsFrom = latest ? 80 : 1;

  // useEffect(() => { // эта фунция нужна если нет функции лоадера
  //   fetch('https://jsonplaceholder.typicode.com/posts') // делает запрос
  //     .then((res) => res.json()) // разбирает данные
  //     .then((data) => setPosts(data)); //полученные данные направляет в стейт
  // }, []);

  return (
    <div>
      <h1>Our news</h1>
      <BlogFilter
        postQuery={postQuery}
        latest={latest}
        setSearchParams={setSearchParams}
      />

      <Link
        to="/posts/new"
        style={{ margin: '1rem 0', display: 'inline-block' }}
      >
        Add new post
      </Link>
      {/* Саспенс компонент позволяющий ждать загрузки кода стр */}
      <Suspense fallback={<h1>LOADING....</h1>}>
        {/* ПОка не загрузятся посты будет показывать лоадинг */}
        <Await resolve={posts}>
          {/* далее делаем рендер пропс , НАЗВАНИЕ ПРОПСОВ ДЕЛАЕМ ЛЮБОЕ*/}
          {(resolvedPosts) => (
            <>
              {resolvedPosts
                .filter(
                  (post) =>
                    post.title.includes(postQuery) && post.id >= startsFrom
                )
                // ниже пробегаемся map по постам в стейте, для каждого поста post делать
                // отрисовку
                .map((post) => (
                  <Link key={post.id} to={`/posts/${post.id}`}>
                    <li>{post.title}</li>
                  </Link>
                ))}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};
async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // делает запрос
  return res.json(); // разбирает данные}
}
const blogloader = async () => {
  //За счет фунции defer у нас есть возможность ожидать часть данных которые будут загружены на страницу
  return defer({
    posts: getPosts(),
  });
};

export { Blogpage, blogloader };
