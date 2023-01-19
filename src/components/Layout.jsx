import { NavLink, Outlet } from 'react-router-dom';
//import { CustomLink } from './CustomLink';

const Layout = () => {
  return (
    <>
      {/* несколько одинаково работающих вариантов записи навлинков в хедере */}
      <header>
        {/* Navlink автоматически на тот адрес кот явл активным добавляет css active просто так сам*/}
        <NavLink
          to="best"
          className={({ isActive }) => (isActive ? 'active-b' : 'active-link')}
        >
          best
        </NavLink>
        <NavLink
          to="posts"
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-active)' : 'grey',
          })}
        >
          Blog
        </NavLink>
        <NavLink to="about">About</NavLink>
        {/* end позволяет не делать корневой элемент по умолчанию активныйм */}
        <NavLink to="/" end>
          home
        </NavLink>
      </header>

      {/* Outlet это содержимое между хедером и футером, которое идет внутри тега Layout в компоненте App.js. Тег main исключительно для того, чтобы обернуть все в контейнер*/}
      <main className="container">
        <Outlet />
      </main>

      <footer className="container">&copy; ReactRouter Tutorials 2022</footer>
    </>
  );
};

export { Layout };
