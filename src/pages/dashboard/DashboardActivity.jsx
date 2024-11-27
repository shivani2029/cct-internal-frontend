import CustomTable from '@/components/customtable/CustomTable';
import Pagination from '@/components/pagination/Pagination';
import { Button } from '@/components/ui/button';
import FormatCurrency from '@/utils/formatCurrency';
import { Trash2, FilePenLine, Plus } from 'lucide-react';
import propTypes from 'prop-types';
import { useLocation } from 'react-router-dom/dist';

function DashboardActivity({
  currentPage,
  totalPages,
  setCurrentPage,
  handleDelete,
  handleEdit,
  // handleTabChange,
  // select,
  data,
  loading,
}) {
  const location = useLocation();
  const { pathname } = location;

  const headers =
    // select === 'User'
    pathname === '/'
      ? [
          {
            key: 'name',
            label: 'User Name',
            className: 'rounded-l-xl',
          },
          {
            key: 'email',
            label: 'Email',
            className: '',
            render: email => (email ? email : '-'),
          },
          { key: 'mobile', label: 'Mobile', className: '' },
          {
            key: 'balance',
            label: 'Wallet Balance',
            className: 'rounded-r-xl',
            render: balance => balance,
          },
        ]
      : // : select === 'Affair'
        pathname === '/current-affair'
        ? [
            {
              key: 'title',
              label: 'Title',
              className: 'rounded-l-xl',
              render: title => <div className="truncate w-52">{title}</div>,
            },
            {
              key: 'createdAt',
              label: 'Register Date',
              className: 'rounded-r-xl',
              render: date => `${date ? new Date(date).toDateString() : '-'}`,
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
          ]
        : [
            {
              key: 'title',
              label: 'Job Title',
              className: 'rounded-l-xl',
              render: title => <div className="truncate w-28">{title}</div>,
            },
            {
              key: 'company',
              label: 'Company Name',
              className: '',
              render: postion => (
                <div className="truncate w-32">
                  {' '}
                  {postion ? `${postion}` : '-'}
                </div>
              ),
            },
            {
              key: 'minSalary',
              label: 'Salary(LPA)',
              className: '',
              render: price => (price ? `${FormatCurrency(price)}` : '-'),
            },
            {
              key: 'vacancy',
              label: 'Vacancy',
              className: 'rounded-r-xl',
              render: date => `${date}`,
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

  return (
    <div className="w-full">
      <div className="bg-white drop-shadow-md rounded-xl p-5 mt-10 flex justify-between flex-col">
        {/* Tabs */}
        <div className="flex w-full justify-between">
          <h1 className="text-3xl text-black mb-10">
            {' '}
            {pathname === '/'
              ? 'Users'
              : pathname === '/current-affair'
                ? ' Current Affair'
                : 'Jobs'}{' '}
          </h1>

          {pathname === '/' ? (
            ''
          ) : (
            <Button
              variant="outline"
              type="button"
              className="w-[120px] flex items-center gap-1"
              onClick={() => handleEdit()}
            >
              <Plus size={20} strokeWidth={1.4} />
              Add {pathname === '/current-affair' ? 'Affair' : 'Jobs'}{' '}
            </Button>
          )}
          {/* <div className="border border-border  mb-7 text-xl bg-white drop-shadow-sm rounded-lg flex w-fit">
            <div
              className={`p-3 px-5 cursor-pointer ${select === 'User' ? 'bg-primary text-white rounded-lg' : ''}`}
              onClick={() => handleTabChange('User')}
            >
              User Activity
            </div>
            <div
              className={`p-3 px-5 cursor-pointer ${select === 'Affair' ? 'bg-primary text-white rounded-lg' : ''}`}
              onClick={() => handleTabChange('Affair')}
            >
              Affair List
            </div>
            <div
              className={`p-3 px-5 cursor-pointer ${select === 'Jobs' ? 'bg-primary text-white rounded-lg' : ''}`}
              onClick={() => handleTabChange('Jobs')}
            >
              Jobs List
            </div>
          </div> */}
        </div>
        {/* Table and Pagination */}
        <div>
          <CustomTable headers={headers} data={data} loading={loading} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardActivity;
DashboardActivity.propTypes = {
  data: propTypes.array,
  currentPage: propTypes.number,
  totalPages: propTypes.number,
  setCurrentPage: propTypes.func,
  handleDelete: propTypes.func,
  handleEdit: propTypes.func,
  select: propTypes.string,
  handleTabChange: propTypes.func,
};
