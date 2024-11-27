/* eslint-disable react/prop-types */
// // CaseStatusCards.jsx
// import OnGoing from '@/assets/icons/dashboard/ongoing-icon.svg?react';
// import CompleteIcon from '@/assets/icons/dashboard/complete-icon.svg?react';
// import PendingIcon from '@/assets/icons/dashboard/pending-icon.svg?react';
// import ReportIcon from '@/assets/icons/dashboard/report-icon.svg?react';

// const CaseStatusCards = () => {
//   return (
//     <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-2 lg:gap-10 gap-[20px]">
//       <div className="relative flex  items-center max-sm:gap-y-[15px] p-3 border-2 shadow-md rounded-[10px] justify-between h-32">
//         <div className="flex flex-col">
//           <p className="text-[17px] font-medium !mb-0 max-sm:h-[75px]">
//             Total BCAs
//           </p>
//           {/* <h2 className="!text-[#3E74DB] !mb-0">{inProgressData}</h2> */}
//         </div>
//         <div className="absolute -top-7">
//           <OnGoing />
//         </div>
//       </div>
//       <div className="relative flex items-center max-sm:gap-[15px] p-3 border-2 shadow-md rounded-[10px] justify-between h-32">
//         <div className="flex flex-col">
//           <p className="text-[17px] font-medium !mb-0 max-sm:h-[75px]">
//             Active BCAs
//           </p>
//           {/* <h2 className="!text-[#3E74DB] !mb-0">{completedData}</h2> */}
//         </div>
//         <div className="absolute -top-7">
//           <CompleteIcon />
//         </div>
//       </div>
//       <div className="relative flex items-center max-sm:gap-[15px] p-3 border-2 shadow-md rounded-[10px] justify-between h-32">
//         <div className="flex flex-col">
//           <p className="text-[17px] font-medium !mb-0 max-sm:h-[75px]">
//             Total Companies
//           </p>
//           {/* <h2 className="!text-[#3E74DB] !mb-0">{pendingData}</h2> */}
//         </div>
//         <div className="absolute -top-7">
//           <PendingIcon />
//         </div>
//       </div>
//       <div className="flex  gap-[15px] relative items-center max-sm:gap-[15px] p-3 border-2 shadow-md rounded-[10px] justify-between h-32">
//         <div className="flex flex-col">
//           <p className="text-[17px] font-medium !mb-0 max-sm:h-[75px]">
//             Active Companies{' '}
//           </p>
//           {/* <h2 className="!text-[#3E74DB] !mb-0">{totalData}</h2> */}
//         </div>
//         <div className="absolute -top-7">
//           <ReportIcon />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaseStatusCards;

// eslint-disable-next-line react/prop-types
const CaseStatusCards = ({ data }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 lg:gap-10 gap-[20px]">
      {data?.map((item, index) => (
        <div
          key={index}
          className="relative flex items-center max-sm:gap-[15px] p-3 border-2 shadow-md rounded-[10px] justify-between h-32"
        >
          <div className="flex flex-col">
            <p className="text-[17px] font-medium !mb-0 max-sm:h-[75px]">
              {item.title}
            </p>
            <h2 className="!text-[#3E74DB] !mb-0">{item.value}</h2>
          </div>
          <div className="absolute -top-7">
            <item.icon />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseStatusCards;
