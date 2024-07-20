interface ListItemProps {
  heading: string;
  data: string;
  currency: boolean;
}
const ListItem = ({ heading, data, currency }: ListItemProps) => {
  return (
    <div className="flex gap-5 w-full justify-between text-sm">
      <div>{heading}</div>
      <div className="font-semibold">
        {currency && <span className="font-light text-xs"> ₹ </span>}
        {data ? data.toLocaleString() : "-"}
      </div>
    </div>
  );
};

export default ListItem;
