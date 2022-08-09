import './ProductDate.css';

function ProductDate(props) {
    var month = props.date.toLocaleString('en-US', {month: 'long'});
    var day = props.date.toLocaleString('en-US', {day: '2-digit'});
    var year = props.date.getFullYear();

    return (
        <div className='product-date'>
            <div className='product-date__month'>{month}</div>
            <div className='product-date__year'>{day}</div>
            <div className='product-date__day'>{year}</div>
        </div>
    );
}

export default ProductDate;