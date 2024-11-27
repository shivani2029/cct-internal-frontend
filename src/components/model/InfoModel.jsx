import PropTypes from 'prop-types';
import successIcon from '@/assets/images/model/success.svg';
import { Button } from '../ui/button';

const InfoModel = ({
  isOpenModal,
  setIsOpenModal,
  icon,
  text,
  isConfirmDelete,
  setIsConfirmDelete,
  handleDelete,
}) => {
  const handleClose = () => {
    setIsOpenModal(false);
    setIsConfirmDelete(false);
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`${isOpenModal ? 'block' : 'hidden'} fixed inset-0 z-50 flex justify-center items-center`}
      onClick={handleOverlayClick}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {isConfirmDelete ? (
        <div className="bg-white w-11/12 p-10 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto flex flex-col items-center">
          <img src={icon ?? successIcon} alt="successIcon" className="mb-10" />
          <p className="text-center text-2xl font-semibold text-primary mb-10">
            {text ?? 'Success!'}
          </p>
          <Button
            onClick={handleClose}
            variant="default"
            size="default"
            className="w-fit px-10"
          >
            Done
          </Button>
        </div>
      ) : (
        <div className="bg-white w-11/12 p-10 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto flex flex-col items-center">
          <p className="text-center text-2xl font-semibold text-primary mb-10">
            Are you sure you want to delete this item?
          </p>
          <div>
            <Button
              onClick={handleClose}
              variant="default"
              size="default"
              className="w-fit px-10 mr-5"
            >
              No
            </Button>
            <Button
              onClick={handleDelete}
              variant="default"
              size="default"
              className="w-fit px-10"
            >
              Yes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoModel;

InfoModel.propTypes = {
  isOpenModal: PropTypes.bool,
  setIsOpenModal: PropTypes.func,
  icon: PropTypes.string,
  text: PropTypes.string,
  isConfirmDelete: PropTypes.bool,
  setIsConfirmDelete: PropTypes.func,
  handleDelete: PropTypes.func,
};
