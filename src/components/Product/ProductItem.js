import Card from '../UI/Card';
import ProductDate from './ProductDate';
import './ProductItem.css';

function ProductItem(props) {

    return (
        <Card className='product-item'>
            <ProductDate date={props.date}></ProductDate>
            <div className='product-item__description'>
                <h2>{props.title}</h2>
                <div className='product-item__price'>{props.amount}</div>
            </div>
        </Card>
    );
}

export default ProductItem;