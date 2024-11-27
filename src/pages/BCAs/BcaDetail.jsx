import WelcomeMessage from '@/components/welcomeMessage/welcomeMssae';
import CaseStatusCards from '@/components/cards/CaseStatusCars';
import OnGoing from '@/assets/icons/dashboard/ongoing-icon.svg?react';
import CompleteIcon from '@/assets/icons/dashboard/complete-icon.svg?react';
import PendingIcon from '@/assets/icons/dashboard/pending-icon.svg?react';
import ReportIcon from '@/assets/icons/dashboard/report-icon.svg?react';
import { useLocation } from 'react-router-dom';
import { Edit2 } from 'lucide-react';
import { useState } from 'react';
import BasicBcaDetailModel from '@/components/model/BasicBcaModel';
import { getBcaInsights } from '@/services/bca';
import { useEffect } from 'react';

function BCADetail() {
  const location = useLocation();
  const bcaName = location?.state?.name;
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [id] = useState('');
  const [totalCompanyData, setTotalCompanyData] = useState();
  const [totalCompletedCases, setTotalCompletedCases] = useState();
  const [totalOngoingCases, setTotalOngoingCases] = useState();
  const [subscriptionDate, setSubscriptionDate] = useState();
  const [subscriptionPlan, setSubscriptionPlan] = useState();
  const [totalCases, setTotalCases] = useState();
  const [totalCheck, setTotalCheck] = useState();

  const caseStatusData = [
    { title: 'Total Companies added', value: totalCompanyData, icon: OnGoing },
    { title: 'Total Created Checks', value: totalCheck, icon: CompleteIcon },
    { title: 'Subscription Plan', value: subscriptionPlan, icon: PendingIcon },
    {
      title: 'Subscription End  Date',
      value: subscriptionDate,
      icon: ReportIcon,
    },
    { title: 'Ongoing Cases', value: totalOngoingCases, icon: ReportIcon },
    { title: 'Total Cases', value: totalCases, icon: ReportIcon },
    { title: 'Completed Cases', value: totalCompletedCases, icon: ReportIcon },
    { title: 'Configurations', value: <Edit2 size={20} />, icon: ReportIcon },
  ];
  // const handleAddBCAs = () => {
  //   setId('');
  //   setIsOpenEdit(true);
  // };

  const fetchData = async () => {
    try {
      const response = await getBcaInsights(location?.state?._id);
      setTotalCompanyData(response?.totalCompanies);
      setTotalCompletedCases(response?.completedCases);
      setTotalOngoingCases(response?.ongoingCases);
      setSubscriptionDate(response?.subscriptionEndDate);
      setSubscriptionPlan(response?.subscriptionPlan);
      setTotalCases(response?.totalCases);
      setTotalCheck(response?.totalCheck);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {isOpenEdit && (
        <BasicBcaDetailModel
          isOpenModal={isOpenEdit}
          setIsOpenModal={setIsOpenEdit}
          Id={isOpenEdit ? id : ''}
          //   onSuccess={() => fetchData(currentPage)}
        />
      )}
      <div className="container">
        <div className="flex gap-2">
          <div className="flex flex-col mt-4 justify-between  max-sm:-mt-10">
            <WelcomeMessage name={bcaName} />
            <p className="text-[#00000080]">{bcaName} BCA’s Dashboard</p>
          </div>
          {/* <Button
            type="button"
            className="w-[140px] h-[40px] flex items-center gap-1 max-sm:mb-5 mt-8"
            onClick={() => handleAddBCAs()}
          >
            Edit BCA Profile
          </Button> */}
        </div>
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
    </>
  );
}

export default BCADetail;
