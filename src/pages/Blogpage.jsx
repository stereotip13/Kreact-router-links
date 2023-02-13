//import { useState, useEffect } from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import { BlogFilter } from '../components/BlogFilter';

const Blogpage = () => {
  //const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const posts = useLoaderData(); //хук который достает посты из лоадера
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
      {posts
        .filter(
          (post) => post.title.includes(postQuery) && post.id >= startsFrom
        )
        // ниже пробегаемся map по постам в стейте, для каждого поста post делать
        // отрисовку
        .map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <li>{post.title}</li>
          </Link>
        ))}
    </div>
  );
};
const blogloader = async ({ request, params }) => {
  console.log({ request, params });
  const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // делает запрос
  return res.json(); // разбирает данные
};
export { Blogpage, blogloader };
