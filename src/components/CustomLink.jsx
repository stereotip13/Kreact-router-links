import { Link, useMatch } from 'react-router-dom';

// передаем дочерний пропс-чилдрен, параметр to, и делаем деструктур-ю пропсов ...props
const CustomLink = ({ children, to, ...props }) => {
  //   хук useMatch показывает активна ссылка Link или нет
  const match = useMatch({
    path: to,
    end: to.length === 1,
  });

  return (
    <Link
      to={to}
      style={{
        color: match ? 'var(--color-active)' : 'white',
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export { CustomLink };
