import ListItem from "./ListItem";
import { fields } from "./constants";
const Fundamentals = ({ data }: any) => {
  const { market_data } = data;
  const { market_cap } = market_data;

  return (
    <div className="py-2 my-2">
      <div className="mainHeading my-2">Fundamentals</div>
      <div>
        {fields(market_cap, market_data).map((singleField, index) => {
          return (
            <ul className="w-1/2 flex justify-between" key={index}>
              <li className="w-full p-3 border-b">
                <ListItem
                  heading={singleField.heading}
                  data={singleField.value}
                  currency={singleField.currency}
                />
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Fundamentals;
