const WelcomeMessage = ({ name }) => {
  return (
    <div className="flex flex-row gap-[3px]">
      <span className="text-black text-2xl font-normal">Welcome, </span>
      <span className="bg-gradient-to-r from-sky-800 to-teal-400 text-2xl font-semibold font-['Poppins'] text-transparent bg-clip-text ">
        {name}
      </span>
    </div>
  );
};

export default WelcomeMessage;
