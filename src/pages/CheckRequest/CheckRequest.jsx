import { useState, useEffect } from 'react';
import CustomTable from '@/components/customtable/CustomTable';
import Pagination from '@/components/pagination/Pagination';
import { Button } from '@/components/ui/button';
import { getAllVendorCheck } from '@/services/VendorCheck';
import AssignVendorModel from '@/components/model/AssignVendorModel';

function ChecksRequest() {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState('');

  const handleAddChecks = () => {
    setId('');
    setIsOpenEdit(true);
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
      key: 'checkName',
      label: 'Check Name',
      className: 'rounded-l-xl',
      render: title => <div className="truncate w-40">{title}</div>,
    },
    {
      key: 'BCAId',
      label: 'Bca Name',
      render: BCAId => <div>{BCAId?.name}</div>,
    },
    { key: 'location', label: 'Location' },
    { key: 'createdAt', label: 'Requested On' },
    {
      key: 'isVendorAssigned',
      label: 'Status',
      render: isVendorAssigned => (
        <div>
          {isVendorAssigned?.status === true ? (
            <div className="flex flex-row p-[6px] w-[104px] h-[30px] bg-emerald-500 bg-opacity-10 rounded-[5px] border border-emerald-500">
              <div className="text-emerald-500 text-xs font-medium m-auto">
                Assigned
              </div>
            </div>
          ) : (
            <div className="flex flex-row p-[6px] w-[104px] h-[30px] bg-amber-300 bg-opacity-10 rounded-[5px] border border-amber-300">
              <div className="text-amber-300 text-xs font-medium m-auto">
                Pending
              </div>
            </div>
          )}
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
      const response = await getAllVendorCheck(`&page=${page}&limit=${limit}`);
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
        <AssignVendorModel
          isOpenModal={isOpenEdit}
          setIsOpenModal={setIsOpenEdit}
          Id={isOpenEdit ? id : ''}
          onSuccess={() => fetchData(currentPage)}
          selectedRows={selectedRows}
        />
      )}
      <div className="flex max-sm:flex-col flex-row w-full justify-between items-center py-7">
        <h1 className="text-xl font-semibold text-black">All Check Requests</h1>
        <Button
          type="button"
          className="w-[140px] flex items-center gap-1 max-sm:mb-5"
          onClick={handleAddChecks}
        >
          + Assign
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

export default ChecksRequest;
