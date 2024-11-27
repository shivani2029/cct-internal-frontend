import WelcomeMessage from '@/components/welcomeMessage/welcomeMssae';
import CaseStatusCards from '@/components/cards/CaseStatusCars';
import OnGoing from '@/assets/icons/dashboard/ongoing-icon.svg?react';
import CompleteIcon from '@/assets/icons/dashboard/complete-icon.svg?react';
import PendingIcon from '@/assets/icons/dashboard/pending-icon.svg?react';
import ReportIcon from '@/assets/icons/dashboard/report-icon.svg?react';

function Dashboard() {
  const name = JSON.parse(localStorage.getItem('user'));
  const caseStatusData = [
    { title: 'Total BCAs', value: 120, icon: OnGoing },
    { title: 'Active BCAs', value: 85, icon: CompleteIcon },
    { title: 'Total Companies', value: 50, icon: PendingIcon },
    { title: 'Active Companies', value: 40, icon: ReportIcon },
  ];
  // const [totalBcaData, setTotalBcaData] = useState();
  // const [completedData, setCompletedData] = useState();
  // const [pendingData, setPendingData] = useState();
  // const [inProgressData, setInProgressData] = useState();
  // const fetchData = async (page = 1) => {
  //   const limit = 7;
  //   try {
  //     const response = await getAllDashboardData(
  //       `&page=${page}&limit=${limit}`,
  //     );
  //     console.log('response', response);

  //     setTotalBcaData(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div className="container">
      <div className="flex max-[700px]:flex-col justify-between w-full max-sm:-mt-10">
        <WelcomeMessage name={name ? name?.userName : 'Admin'} />
      </div>
      <p className="text-black/50">Today is Thursday, 29 February 2024</p>

      {/* main */}
      <div className="grid lg:grid-cols-1 grid-cols-1 mt-8 gap-4">
        <CaseStatusCards
          data={caseStatusData}
          // inProgressData={inProgressData}
          // completedData={completedData}
          // pendingData={pendingData}
          // totalData={totalBcaData}
        />
        {/* <CasesWiseStatusChart data={data2} isMobile={isMobile} /> */}
      </div>
    </div>
  );
}

export default Dashboard;
