import React, { useContext } from 'react';
import SignInPage from '../modules/auth/SignInPage';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AuthContext from '../config/context/auth-context';
import AdminLayout from '../modules/admin/AdminLayout';

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {
          //Publico
        }
        {user.signed ? (
        <>
            <Route path='/' element={<SignInPage/>} >
              <Route path='admin' element={<AdminLayout/>} />
              <Route path='users' element={<> Usuario: user Role: USER_ROLE </>} />
              <Route path='products' element={<> PRODUCTOS </>} />
            </Route>
            
          </>
          ) :(
            
        <Route path='/' element={<SignInPage />} />
          )
        }
       <Route path='/*' element={<>404 NOT FOUND</>} />
      </>
    )
  );
  return <RouterProvider router={router}/>;
}; 

export default AppRouter
