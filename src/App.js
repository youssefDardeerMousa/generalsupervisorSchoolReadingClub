import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DataContextFunction } from './context/context.js';
import Layout from './components/layout/Layout.jsx';
import Login from './components/Login/Login.jsx';
import WelcomePage from './components/WelcomePage/WelcomePage.jsx';
import NotFoundPage from './components/Notfoundpage/Notfoundpage.jsx';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated/RedirectIfAuthenticated.jsx';
import Protected from './components/Protucted/Protucted.jsx';
import OneSchoolTeacherEvaluations from './components/OneSchoolTeacherEvaluations/OneSchoolTeacherEvaluations.jsx';
import OneSchoolStusentEvaluations from './components/OneSchoolStusentEvaluations/OneSchoolStusentEvaluations.jsx';
import Bookevaluations from './components/Bookevaluations/Bookevaluations.jsx';
import Selfevaluations from './components/Selfevaluations/Selfevaluations.jsx';
import Clubevaluations from './components/Clubevaluations/Clubevaluations.jsx';
import OneSchoolParentEvaluations from './components/OneSchoolParentEvaluations/OneSchoolParentEvaluations.jsx';
import AttendanceoneSchool from './components/AttendanceoneSchool/AttendanceoneSchool.jsx';
import ReadingBooksNumberoneSchool from './components/ReadingBooksNumberoneSchool/ReadingBooksNumberoneSchool.jsx';
import ChangeSupervisorPassword from './components/ForgetPasswordsupervisor/ChangeSupervisorPassword.jsx';
import ForgotPasswordsupervisor from './components/ForgetPasswordsupervisor/ForgetPasswordsupervisor.jsx';
import StudentData from './components/StudentData/StudentData.jsx';
import ParentData from './components/ParentData/ParentData.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Protected><WelcomePage /></Protected>
      },
      {
        path: '/OneSchoolTeacherEvaluations/:schoolCode',
        element: <Protected><OneSchoolTeacherEvaluations /></Protected>
      },
      {
        path: '/OneSchoolStusentEvaluations/:schoolCode',
        element: <Protected><OneSchoolStusentEvaluations /></Protected>
      },
      {
        path: '/Bookevaluations/:schoolCode',
        element: <Protected><Bookevaluations /></Protected>
      },
      {
        path: '/Selfevaluations/:schoolCode',
        element: <Protected><Selfevaluations /></Protected>
      },
     
        {
          path: '/ChangeSupervisorPassword',
          element: <RedirectIfAuthenticated><ChangeSupervisorPassword /></RedirectIfAuthenticated>
        },
        {
          path: '/ForgotPasswordsupervisor',
          element: <RedirectIfAuthenticated><ForgotPasswordsupervisor /></RedirectIfAuthenticated>
        },
      {
        path:"/Clubevaluations/:schoolCode",
        element: <Protected><Clubevaluations /></Protected>
      },
      {
        path: '/OneSchoolParentEvaluations/:schoolCode',
        element: <Protected><OneSchoolParentEvaluations /></Protected>
      },
      {
        path: '/studentData/:schoolCode',
        element: <Protected><StudentData /></Protected>
      },
      {
        path: '/parentData/:schoolCode',
        element: <Protected><ParentData /></Protected>
      },
      {
        path: '/AttendanceoneSchool/:schoolCode',
        element: <Protected><AttendanceoneSchool /></Protected>
      },
      {
        path: '/ReadingBooksNumberoneSchool/:schoolCode',
        element: <Protected><ReadingBooksNumberoneSchool /></Protected>
      },
     
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  },
  {
    path: '/login',
    element: (
      <RedirectIfAuthenticated>
        <Login />
      </RedirectIfAuthenticated>
    )
  }
], {
  basename: '/GeneralSupervisor'
});

function App() {
  return (
    <DataContextFunction>
      <RouterProvider router={router} />
    </DataContextFunction>
  );
}

export default App;
