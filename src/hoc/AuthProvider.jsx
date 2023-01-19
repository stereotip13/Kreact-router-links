import { createContext, useState } from 'react';
// создаем контекст для простейшей авторизации
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // инициализируем юзера, обычно это объект сейчас это строка
  const [user, setUser] = useState(null);
  // метод, который принимает нового юзера и некоторый колбэк для выполнения
  const signin = (newUser, cb) => {
    setUser(newUser);
    cb(); //тут должна быть соответствующая навигация/редирект
  };
  const signout = (cb) => {
    setUser(null);
    cb();
  };

  const value = { user, signin, signout };
  // какую информацию мы хотим передать в обернутые провайдером компоненты зависит от пропа value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
