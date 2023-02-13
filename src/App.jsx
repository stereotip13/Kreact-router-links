import {
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import { Homepage } from './pages/Homepage';
import { About } from './pages/Aboutpage';
import { blogloader, Blogpage } from './pages/Blogpage';
import { Createpost } from './pages/Createpost';
import { Editpost } from './pages/Editpost';
import { postLoader, Singlepage } from './pages/Singlepage';
import { Notfoundpage } from './pages/Notfoundpage';
import { LoginPage } from './pages/Loginpage';

import { Layout } from './components/Layout';

import { RequireAuth } from './hoc/RequireAuth'; //компонент для переадресации п-ля
import { AuthProvider } from './hoc/AuthProvider';

const router = createBrowserRouter(
  createRoutesFromElements(
    //функция заменяет Routes
    <Route path="/" element={<Layout />}>
      {/* На каждой странице присутствует корневой элемент layout */}
      {/* замена хедера на элемент роутинга в рамках этой обертки мы будем динамически что-то менять. Для того, чтобы не дублировались значение path="/" его в строке ниже заменяем на ключевое слово index*/}
      <Route index element={<Homepage />} />
      <Route path="about" element={<About />}>
        <Route path="contacts" element={<p>Our contact</p>} />
        <Route path="team" element={<p>Our team</p>} />
      </Route>
      {/* плохой практикой считается делать два один-х компонента на один адрес, поэтому обычно делают редирект используя Navigate, чтобы в истории не было доплнительного адреса пишут: replace */}
      <Route path="about-us" element={<Navigate to="/about" replace />} />
      <Route path="posts" element={<Blogpage />} loader={blogloader} />
      {/* параметр идет после : idилиДругой (можно нес-ко пар-в после нес-ких :) позволяет испол-ть инф-ю кот-ю я вбил в адр-ю строку используя хук UseParams*/}
      <Route path="posts/:id" element={<Singlepage />} loader={postLoader} />
      <Route path="posts/:id/edit" element={<Editpost />} />
      <Route
        path="posts/new"
        element={
          //для добавления поста сначала идет проверка автор-н ли поль-ль если нет происходит редир-т на стр автор-ии если авторизован попадает в чилдрен createPost
          <RequireAuth>
            {/* //приватный роут кот мы оборачиваем */}
            <Createpost />
          </RequireAuth>
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<Notfoundpage />} />
    </Route>
  )
);
function App() {
  return (
    //обернув провайдером комп-ты,
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
