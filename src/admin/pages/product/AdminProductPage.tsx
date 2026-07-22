import { Navigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { AdminProductForm } from './ui/AdminProductForm';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: string;
  tags: string[];
  imagesUrls: string[];
}

export const AdminProductPage = () => {
  const { id } = useParams();

  const {
    isError,
    isLoading,
    data: product,
    handleSubmitForm,
  } = useProduct(id || '');

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  // Redirecciones
  if (isError) {
    return <Navigate to={'/admin/products'} />;
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <AdminProductForm
      title={title}
      subTitle={subtitle}
      product={product}
      onSubmit={handleSubmitForm}
    />
  );
};
