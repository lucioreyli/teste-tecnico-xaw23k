import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProductsStore } from '@/store';
import { Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState, type FC } from 'react';

type Props = { index: number };

export const ActionsProduct: FC<Props> = ({ index }) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const toggleDeleteAlert = () => setDeleteAlert((prev) => !prev);

  const handleDeleteItem = () => {
    const removeItem = useProductsStore.getState().removeItem;
    removeItem(index);
    toggleDeleteAlert();
  };

  return (
    <div className="flex gap-2">
      <Button onClick={toggleDeleteAlert} variant="destructive">
        <Trash className="w-4 mr-2" />
        Excluir
      </Button>
      <Dialog open={deleteAlert} onOpenChange={toggleDeleteAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja realmente fazer isso?</DialogTitle>
            <DialogDescription>
              Essa ação não pode ser desfeita. Isso irá apagar permanentemente
              seu produto. Você pode registrá-lo novamente no menu de cadastro.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={handleDeleteItem}>
              Apagar
            </Button>
            <Button onClick={toggleDeleteAlert}>Cancelar</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button variant="secondary" asChild>
        <Link href={`/register/${index}`}>
          <Pen className="w-4 mr-2" />
          Editar
        </Link>
      </Button>
    </div>
  );
};
