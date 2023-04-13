import { React } from 'react';

const ShoppingList = (props) => {
    return (
      <div>
        {props.itemsInList.map((item)=>
          <label htmlFor="checkbox-1" key={item}>
            <input type="checkbox" name="checkbox-1" role="switch" />
            {item}
          </label>
        )}
      </div>
    )
}

export default ShoppingList;