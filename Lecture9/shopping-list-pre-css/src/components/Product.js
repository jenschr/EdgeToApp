import { useState, useEffect, React } from 'react';

const Product = (props) => {
    const [added, setAdded] = useState(false);
    let handleClick = () => {
        setAdded(!added);
        props.countMethod(!added, props.name);
    }

    return (
        <div>
            <p>{props.name}</p>
            <button onClick={handleClick}>
                {added ? "Remove" : "Add" }
            </button>
        </div>
    )
}

export default Product;