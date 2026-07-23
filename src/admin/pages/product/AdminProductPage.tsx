import { Navigate, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { AdminProductForm } from './ui/AdminProductForm';
import type { Product } from '@/interfaces/product.interface';

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isError, isLoading, data: product, mutation } = useProduct(id || '');

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  const handleSubmit = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success('Producto actualizado correctamente', {
          position: 'top-center',
        });
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error('Error al actualizar el producto', {
          position: 'top-center',
        });
      },
    });
  };

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
      onSubmit={handleSubmit}
      isProductUpdating={mutation.isPending}
    />
  );
};
