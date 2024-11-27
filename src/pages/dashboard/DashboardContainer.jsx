import './style.css';
import TotalIcon from '@/assets/images/dashboard/Icon1.svg?react';
import PendingIcon from '@/assets/images/dashboard/Icon2.svg?react';
import CompleteIcon from '@/assets/images/dashboard/Icon3.svg?react';
import RightArrow from '@/assets/images/dashboard/rightarrow.svg?react';
import propTypes from 'prop-types';

function DashboardContainer({ data, handleEdit }) {
  return (
    <div className="w-full drop-shadow-md rounded-xl bg-white text-black ">
      <div className="mt-10 p-5 flex justify-between  ">
        <div className="dashboard-image1 w-[18.5rem] px-4 py-2 flex flex-col ">
          <TotalIcon width={35} />
          <span className="text-sm  font-medium ">Users </span>
          <span className="text-2xl font-semibold mb-7">
            {data?.users || 0}
          </span>
        </div>
        <div className="dashboard-image2 w-[18.5rem] px-4 py-2 flex flex-col">
          <PendingIcon width={35} />
          <span className="text-sm  font-medium ">Affair</span>
          <span className="text-2xl font-semibold mb-0">
            {data?.affers || 0}
          </span>
          <button
            onClick={() => handleEdit(null, 'Affair')}
            className="text-[#FF947A] font-medium flex items-center gap-1 pb-1"
          >
            Add Affair <RightArrow />
          </button>
        </div>
        <div className="dashboard-image3 w-[18.5rem] px-4 py-2 flex flex-col">
          <CompleteIcon width={35} />
          <span className="text-sm  font-medium ">Jobs </span>
          <span className="text-2xl font-semibold mb-0">{data?.jobs || 0}</span>
          <button
            onClick={() => handleEdit(null, 'Jobs')}
            className="text-[#3CD856] font-medium flex items-center gap-1 mb-1"
          >
            Add Jobs <RightArrow />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardContainer;
DashboardContainer.propTypes = {
  data: propTypes.object,
  handleEdit: propTypes.func,
};
