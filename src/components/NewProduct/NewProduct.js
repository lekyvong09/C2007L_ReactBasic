import ProductForm from "./ProductForm";


function NewProduct(props) {

    const saveProductDataHandler = (data) => {
        props.onSaveProductHandler(data);
    }

    return (
        <div>
            <ProductForm onSaveProduct={saveProductDataHandler} />
        </div>
    );
}

export default NewProduct;