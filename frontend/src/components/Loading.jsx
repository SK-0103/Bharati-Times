import PropTypes from "prop-types"; 

const Loading = ({ message }) => {
  return (
    <div className="flex items-center justify-center flex-col !px-3 lg:!px-6 !py-35 bg-gray-100">
      <div className="flex space-x-2 !mb-4">
        <div className="w-8 h-8 bg-blue-800 rounded-full animate-bounce"></div>
        <div className="w-8 h-8 bg-blue-800 rounded-full animate-bounce200"></div>
        <div className="w-8 h-8 bg-blue-800 rounded-full animate-bounce400"></div>
      </div>
      <p className="text-xl font-semibold text-gray-800 text-center">{message}</p>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
