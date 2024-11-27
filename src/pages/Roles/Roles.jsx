import { useState, useEffect } from 'react';
import CustomTable from '@/components/customtable/CustomTable';
import Pagination from '@/components/pagination/Pagination';
import { Button } from '@/components/ui/button';
import { FilePenLine } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { deleteRoles, getAllRoles } from '@/services/roles';
import EditRolesModel from '@/components/model/EditRolesModel';
import InfoModel from '@/components/model/InfoModel';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';

function Roles() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState('');

  const handleEdit = id => {
    setId(id || null);
    setIsOpenEdit(true);
  };

  const handleAddRole = () => {
    setId('');
    setIsOpenEdit(true);
  };
  const handleDelete = async Id => {
    setId(Id);
    if (!isOpenModal) {
      setIsOpenModal(true);
      return;
    }
    try {
      await deleteRoles(id);
      await fetchData(currentPage);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setId('');
      setIsConfirmDelete(true);
    }
  };
  const headers = [
    {
      key: '_id',
      label: '',
      render: item => (
        <input
          type="checkbox"
          checked={selectedRows.includes(item)}
          onChange={() => handleCheckboxChange(item)}
        />
      ),
    },
    {
      key: 'name',
      label: 'Form Name',
      className: 'rounded-l-xl',
      render: title => <div className="truncate w-40">{title}</div>,
    },
    { key: 'createdAt', label: 'Requested On' },
    {
      label: 'Active/In-active',
      className: 'rounded-l-xl',
      render: item => {
        return (
          <Switch
            checked={item?.isActive}
            onCheckedChange={checked => {
              console.log('Switch checked state:', checked);
              // updateExamCategoryData(checked, item._id);
            }}
          />
        );
      },
    },

    {
      key: '_id',
      label: 'Action',
      className: 'text-center',
      render: id => (
        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              handleEdit(id);
            }}
            className="text-black"
          >
            <FilePenLine strokeWidth={1.5} />
          </button>
          <button
            onClick={() => {
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

  const handleCheckboxChange = rowId => {
    setSelectedRows(prevSelectedRows => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter(id => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  const fetchData = async (page = 1) => {
    setLoading(true);
    const limit = 7;
    try {
      const response = await getAllRoles(`&page=${page}&limit=${limit}`);
      setData(response?.docs);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <>
      {isOpenEdit && (
        <EditRolesModel
          isOpenModal={isOpenEdit}
          setIsOpenModal={setIsOpenEdit}
          Id={isOpenEdit ? id : ''}
          onSuccess={() => fetchData(currentPage)}
          selectedRows={selectedRows}
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
        <h1 className="text-xl font-semibold text-black">All Roles</h1>
        <Button
          type="button"
          className="w-[140px] flex items-center gap-1 max-sm:mb-5"
          onClick={handleAddRole}
        >
          + Add Roles
        </Button>
      </div>
      <div className="pt-4">
        <CustomTable headers={headers} data={data} loading={loading} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}

export default Roles;
