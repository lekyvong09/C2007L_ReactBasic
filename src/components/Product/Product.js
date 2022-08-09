
import { useState } from 'react';
import Card from '../UI/Card';
import './Product.css';
import ProductFilter from './ProductFilter';
import ProductItem from './ProductItem';

function Product(props) {
    const [filterYear, setFilterYear] = useState(2022);

    const getYearFilter = (year) => {
        setFilterYear(year);
    }

    return (
        <Card className='products'>
            <ProductFilter onGetYearFilter={getYearFilter}></ProductFilter>
            {props.products.filter(i => i.date.getFullYear() === filterYear).map(item => 
                <ProductItem key={item.id} title={item.title} amount={item.amount} date={item.date}></ProductItem>
            )}
        </Card>
    );
}

export default Product;