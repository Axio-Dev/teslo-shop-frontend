import { Link } from 'react-router';
import { PencilIcon, PlusIcon } from 'lucide-react';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

import { useProducts } from '@/shop/hooks/useProducts';
import { currencyFormatter } from '@/lib/currency-formatter';

export const AdminProductsPage = () => {
  const { data } = useProducts();

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos 📦"
          subTitle="Aquí puedes ver y administrar tus productos"
        />
        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">ID</TableHead>
            <TableHead className="text-center">Imagen</TableHead>
            <TableHead className="text-center">Nombre</TableHead>
            <TableHead className="text-center">Precio</TableHead>
            <TableHead className="text-center">Categoría</TableHead>
            <TableHead className="text-center">Inventario</TableHead>
            <TableHead className="text-center">Tallas</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.map((product) => (
            <TableRow>
              <TableCell className="font-medium text-center">
                {product.id}
              </TableCell>
              <TableCell>
                <img
                  src={product.imageUrls[0]}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <TableCell className="text-center">
                <Link
                  to={`/admin/products/${product.id}/`}
                  className="hover:text-blue-500 underline"
                >
                  {product.title}
                </Link>
              </TableCell>
              <TableCell className="text-center">
                {currencyFormatter(Number(product.price))}
              </TableCell>
              <TableCell className="text-center">
                {product.clothe_type}
              </TableCell>
              <TableCell className="text-center">{product.stock}</TableCell>
              <TableCell className="text-center">
                {product.sizes.join(', ').toUpperCase()}
              </TableCell>
              <TableCell className="text-center">
                <Link to={`/admin/products/${product.id}/`}>
                  <PencilIcon className="inline-block w-4 h-4 hover:text-blue-500" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination totalPages={data?.pages || 1} />
    </>
  );
};
