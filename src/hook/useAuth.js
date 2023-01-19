import { useContext } from 'react';
import { AuthContext } from '../hoc/AuthProvider';

// чтобы не делать это в каждом компоненте создаем хук, вызов кот позволяет получить данные к объекту value в AuthContext чтобы достать пользователя и методы
export function useAuth() {
  return useContext(AuthContext);
}
