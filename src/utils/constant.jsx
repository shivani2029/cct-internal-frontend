export const getSeverity = status => {
  switch (status) {
    case 'Major Discrepancy':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-red-300 bg-opacity-10 rounded-[5px] border border-red-300">
            <div className="text-red-500 text-xs font-medium m-auto whitespace-nowrap">
              Major Discrepancy
            </div>
          </div>
        </>
      );
    case 'Minor Discrepancy':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-amber-300 bg-opacity-10 rounded-[5px] border border-amber-300">
            <div className="text-amber-500 text-xs font-medium m-auto">
              Minor Discrepancy
            </div>
          </div>
        </>
      );
    case 'Verified Clear':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-emerald-500 bg-opacity-10 rounded-[5px] border border-blue-500">
            <div className="text-emerald-500 text-xs font-medium m-auto">
              Verified Clear
            </div>
          </div>
        </>
      );
    case 'Insufficiency':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-blue-300 bg-opacity-10 rounded-[5px] border border-blue-300">
            <div className="text-blue-500 text-xs font-medium m-auto">
              Insufficiency
            </div>
          </div>
        </>
      );
    case 'Unable to Verify':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-amber-300 bg-opacity-10 rounded-[5px] border border-amber-300">
            <div className="text-amber-500 text-xs font-medium m-auto">
              Unable to Verify
            </div>
          </div>
        </>
      );
    case 'Stop Check':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-yellow-300 rounded-[5px] border border-gray-300">
            <div className="text-black-500 text-xs font-medium m-auto">
              Stop Check
            </div>
          </div>
        </>
      );
    case 'false':
      return (
        <>
          <div className="flex flex-row p-[6px] w-[104px] h-[30px] bg-red-300 bg-opacity-10 rounded-[5px] border border-red-300">
            <div className="text-red-500 text-xs font-medium m-auto">
              In-active
            </div>
          </div>
        </>
      );
    case 'true':
      return (
        <>
          <div className="flex flex-row p-[6px] w-[104px] h-[30px] bg-emerald-500 bg-opacity-10 rounded-[5px] border border-emerald-500">
            <div className="text-emerald-500 text-xs font-medium m-auto">
              Active
            </div>
          </div>
        </>
      );
    case 'Completed':
      return (
        <>
          <div className="flex flex-row p-[6px] w-[104px] h-[30px] bg-emerald-500 bg-opacity-10 rounded-[5px] border border-emerald-500">
            <div className="text-emerald-500 text-xs font-medium m-auto">
              Completed
            </div>
          </div>
        </>
      );
    case 'InProgress':
      return (
        <>
          <>
            <div className="flex flex-row p-[6px] w-[104px] h-[30px] bg-blue-500 bg-opacity-10 rounded-[5px] border border-emerald-500">
              <div className="text-blue-500 text-xs font-medium m-auto">
                InProgress
              </div>
            </div>
          </>
        </>
      );
    case 'Pending':
      return (
        <>
          <div className="flex flex-row p-[6px] w-[104px] h-[30px] bg-amber-300 bg-opacity-10 rounded-[5px] border border-amber-300">
            <div className="text-amber-300 text-xs font-medium m-auto">
              Pending
            </div>
          </div>
        </>
      );
    case 'BcaApproval':
      return (
        <>
          <div className="flex flex-row p-[6px] w-[104px] h-[30px] bg-emerald-500 bg-opacity-10 rounded-[5px] border border-emerald-500">
            <div className="text-emerald-500 text-xs font-medium m-auto">
              BcaApproval
            </div>
          </div>
        </>
      );
    case 'BcaRejection':
      return (
        <>
          <div className="flex flex-row p-[6px] w-[104px] h-[30px] bg-red-300 bg-opacity-10 rounded-[5px] border border-red-300">
            <div className="text-red-600 text-xs font-medium m-auto">
              BcaRejection
            </div>
          </div>
        </>
      );
    case 'Positive':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-green-300 bg-opacity-10 rounded-[5px] border border-green-300">
            <div className="text-green-500 text-xs font-medium m-auto whitespace-nowrap">
              Positive
            </div>
          </div>
        </>
      );
    case 'Negative':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-red-300 bg-opacity-10 rounded-[5px] border border-red-300">
            <div className="text-red-500 text-xs font-medium m-auto whitespace-nowrap">
              Negative
            </div>
          </div>
        </>
      );
    case 'Recommended':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-yellow-300 bg-opacity-10 rounded-[5px] border border-yellow-300">
            <div className="text-yellow-500 text-xs font-medium m-auto whitespace-nowrap">
              Recommended
            </div>
          </div>
        </>
      );
    case 'Not Recommended':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-blue-300 bg-opacity-10 rounded-[5px] border border-blue-300">
            <div className="text-blue-500 text-xs font-medium m-auto whitespace-nowrap">
              Not Recommended
            </div>
          </div>
        </>
      );
    case 'Failed':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-red-300 bg-opacity-10 rounded-[5px] border border-red-300">
            <div className="text-red-500 text-xs font-medium m-auto whitespace-nowrap">
              Failed
            </div>
          </div>
        </>
      );
    case 'Could Not Verified':
      return (
        <>
          <div className="flex flex-row p-[6px] w-auto h-[30px] bg-red-300 bg-opacity-10 rounded-[5px] border border-red-300">
            <div className="text-red-500 text-xs font-medium m-auto whitespace-nowrap">
              Could Not Verified
            </div>
          </div>
        </>
      );
    default:
      return null;
  }
};
