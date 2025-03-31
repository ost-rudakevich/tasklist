import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../../layout/Layout'
import Error from '../../../ui/error/Error'
import Auth from '../auth/Auth'
import RequireAuth from '../../../hoc/require-auth/RequireAuth'
import TaskList from '../../../page/TaskList'
import SingleTask from '../../../page/SingleTask'
import UpdateTask from '../../../page/UpdateTask'
import CreateTask from '../../../page/CreateTask'

const AppRouter: FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={
              <RequireAuth>
                <TaskList />
              </RequireAuth>
            }
          />
          <Route
            path='/tasks/edit/:taskId'
            element={
              <RequireAuth>
                <UpdateTask />
              </RequireAuth>
            }
          />
          <Route
            path='/tasks/:taskId'
            element={
              <RequireAuth>
                <SingleTask />
              </RequireAuth>
            }
          />
          <Route
            path='/tasks/create'
            element={
              <RequireAuth>
                <CreateTask />
              </RequireAuth>
            }
          />
          <Route path='*' element={<Error error='clientError' />} />
        </Route>
        <Route path='login' element={<Auth />} />
        <Route path='register' element={<Auth />} />
      </Routes>
    </>
  )
}

export default AppRouter
