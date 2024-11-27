import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import InfoModel from '@/components/model/InfoModel';
import { deleteBca, getAllBcas } from '@/services/bca';
import CustomTable from '@/components/customtable/CustomTable';
import Pagination from '@/components/pagination/Pagination';
import { Button } from '@/components/ui/button';
import { getSeverity } from '@/utils/constant';
import { Trash2 } from 'lucide-react';
import { FilePenLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EditBcasModel from '@/components/model/EditBCAsModel';

function BCAS() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const handleRedirect = item => {
    navigate(`/bcaId/${item._id}`, {
      state: item,
    });
  };
  const handleEdit = id => {
    setId(id || null);
    setIsOpenEdit(true);
  };

  const handleAddBCAs = () => {
    setId('');
    setIsOpenEdit(true);
  };
  const headers = [
    {
      key: 'clientName',
      label: 'Client Name',
      className: 'rounded-l-xl',
      render: title => <div className="truncate w-40">{title}</div>,
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'name',
      label: 'Company',
    },
    {
      key: 'status',
      label: 'Status',
      render: status => <div>{getSeverity(status)}</div>,
    },
    {
      key: '_id',
      label: 'Action',
      className: 'text-center',
      render: id => (
        <div className="flex gap-4 items-center">
          <button
            onClick={e => {
              e.stopPropagation();

              handleEdit(id);
            }}
            className="text-black"
          >
            <FilePenLine strokeWidth={1.5} />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();

              handleDelete(id);
            }}
            className="text-black"
          >
            <Trash2 strokeWidth={1.5} />
          </button>
        </div>
      ),
    },
  ];
  const fetchData = async (page = 1) => {
    setLoading(true);
    const limit = 7;
    try {
      const response = await getAllBcas(`&page=${page}&limit=${limit}`);
      setData(response?.data?.BCA);
      setTotalPages(response?.data?.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async Id => {
    setId(Id);
    if (!isOpenModal) {
      setIsOpenModal(true);
      return;
    }
    try {
      await deleteBca(id);
      await fetchData(currentPage);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setId('');
      setIsConfirmDelete(true);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <>
      {isOpenEdit && (
        <EditBcasModel
          isOpenModal={isOpenEdit}
          setIsOpenModal={setIsOpenEdit}
          Id={isOpenEdit ? id : ''}
          onSuccess={() => fetchData(currentPage)}
        />
      )}
      <InfoModel
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        isConfirmDelete={isConfirmDelete}
        setIsConfirmDelete={setIsConfirmDelete}
        text="Deleted Successfully!"
        handleDelete={() => handleDelete(id)}
      />
      <div className="flex max-sm:flex-col flex-row w-full justify-between items-center py-7">
        <h1 className="text-xl font-semibold text-black">BCAs</h1>
        <Button
          type="button"
          className="w-[140px] flex items-center gap-1 max-sm:mb-5"
          onClick={() => handleAddBCAs()}
        >
          + Add BCAs
        </Button>
      </div>
      <div className="pt-4">
        <CustomTable
          headers={headers}
          data={data}
          loading={loading}
          onRowClick={handleRedirect}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
export default BCAS;