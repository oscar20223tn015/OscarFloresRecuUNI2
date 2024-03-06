import { Formik, useFormik } from 'formik';
import React, { useContext } from 'react';
import * as yup from 'yup';
import { Spinner, TextInput } from 'flowbite-react';
import { customAlert } from '../../config/alert/alert';
import AxiosClient from '../../config/http-gateway/http-client';
import AuthContext from '../../config/context/auth-context';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const {user, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();  
  const formik = useFormik({
    initialValues:{
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async(values, {setSubmitting}) => {
      console.log(values);
      try {
        const response = await AxiosClient({
          url: '/auth/signin',
          method: 'POST', 
          data: values,  


        }); 
        console.log(response.data);
        if (!response?.error) {
          dispatch({type: "SIGNIN", payload: response.data});
          const rolesArray = response.data.roles;
          var roleName = null;

          if (rolesArray && rolesArray.length > 0) {
              roleName = rolesArray[0].name;
              
              console.log("Nombre del rol:", roleName);
          } else {
              console.log("El array de roles está vacío o no está definido.");
          } 
          
          if (roleName === "ADMIN_ROLE") {
            console.log("admin");
            navigate('/admin', {replace: true});
          } else if (roleName === 'USER_ROLE') {
            console.log("user");
            navigate('/users', {replace: true});
          }
          
        }else throw Error('error'); 
        
      } catch (error) {
        console.log(error);
        customAlert("Iniciar sesion", "Usuario y/o contraseña incorrectos", 'error')
      }finally{
        setSubmitting(false)
      }
    }
  });
  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inicio de sesion</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST" noValidate onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.errors.username && formik.touched.username ? (<span className='font-medium text-red-600'>{formik.errors.username}</span>): null}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.errors.password && formik.touched.password ? (<span className='font-medium text-red-600'>{formik.errors.password}</span>): null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={formik.isSubmitting || !formik.isValid}>
                    {
                      formik.isSubmitting ? (<Spinner/>) : 
                      (<>
                      Iniciar sesion
                      </>)
                    }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;

