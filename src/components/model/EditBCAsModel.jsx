import PropTypes from 'prop-types';
import { useState } from 'react';
import BasicBcaDetailModel from './BasicBcaModel';
import BcaConfigurationDetail from './BCAConfigurationsDetail';

const EditBcasModel = ({ isOpenModal, setIsOpenModal, Id, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bcaId, setBcaId] = useState('');
  const [bcaConfigationId, setBcaConfigationId] = useState('');
  const [bcaConfigurationData, setBcaConfigurationData] = useState({});
  const handlePrevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };
  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };
  const handleStepClick = step => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };
  const getCircleClass = step => {
    return currentStep >= step
      ? 'bg-[#4A3AFF] text-white'
      : 'bg-gray-300 text-gray-600';
  };

  return (
    <div
      className={`${isOpenModal ? 'block' : 'hidden'} fixed inset-0 z-50 flex justify-center items-center`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="bg-white w-11/12 max-sm:p-[20px] md:max-w-2xl mx-auto rounded-lg shadow-lg z-50 overflow-y-auto flex flex-col space-y-6">
        <div className="flex flex-col w-full justify-center px-[30px] py-[20px] border-b-2 border-border">
          <h3 className="text-xl font-semibold">On-boarding BCA</h3>
          <p className="text-sm">Let’s add your BCAs</p>
        </div>
        <div className="flex items-center justify-center space-x-6 mb-2  px-[30px]">
          <div
            onClick={() => handleStepClick(1)}
            className={`w-20 h-7 text-sm flex items-center justify-center rounded-full ${getCircleClass(1)}`}
          >
            1
          </div>
          <div
            className={`w-full rounded h-[6px] ${currentStep >= 2 ? 'bg-[#4A3AFF]' : 'bg-gray-300'}`}
          />
          <div
            onClick={() => handleStepClick(2)}
            className={`w-20 h-7 text-sm flex items-center justify-center rounded-full ${getCircleClass(2)}`}
          >
            2
          </div>
          <div
            className={`w-full rounded h-[6px] ${currentStep >= 3 ? 'bg-[#4A3AFF]' : 'bg-gray-300'}`}
          />
        </div>
        <div className="flex flex-col space-y-6 px-[30px] pb-[30px]">
          {currentStep === 1 && (
            <BasicBcaDetailModel
              setIsOpenModal={setIsOpenModal}
              Id={Id}
              onSuccess={handleNextStep}
              setBcaId={setBcaId}
              setBcaConfigurationData={setBcaConfigurationData}
            />
          )}

          {currentStep === 2 && (
            <BcaConfigurationDetail
              setIsOpenModal={setIsOpenModal}
              Id={Id}
              handlePrevStep={handlePrevStep}
              bcaId={bcaId}
              onSuccess={onSuccess}
              bcaConfigationId={bcaConfigationId}
              setBcaConfigationId={setBcaConfigationId}
              bcaConfigurationData={bcaConfigurationData}
            />
          )}

          {/* {currentStep === 3 && (
            <BcaCheckDetailsModel
              setIsOpenModal={setIsOpenModal}
              Id={Id}
              onSuccess={onSuccess}
              handlePrevStep={handlePrevStep}
              bcaId={bcaId}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

EditBcasModel.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  Id: PropTypes.string,
};

export default EditBcasModel;
