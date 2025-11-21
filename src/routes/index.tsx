import { createBrowserRouter, Outlet } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { RenderHome } from '@/features/home'
import { RenderProducts } from '@/features/product-list'
import { RenderProductDetail } from '@/features/product-detail'

const LayoutWrapper = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
    children: [
      {
        path: '/',
        element: <RenderHome />,
      },
      {
        path: '/products',
        element: <RenderProducts />,
      },
      {
        path: '/products/:id',
        element: <RenderProductDetail />,
      },
    ],
  },
])
