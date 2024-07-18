const RangeButton = ({
  name,
  handler,
  active,
}: {
  name: string;
  handler: () => void;
  active: boolean;
}) => {
  return (
    <button
      onClick={handler}
      className={`px-3 py-1 rounded-full ${
        active ? "bg-blue-400 text-white" : "text-gray-500"
      }`}
    >
      {name}
    </button>
  );
};

export default RangeButton;
