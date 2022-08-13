import { Grid } from "@mui/material";
import ItemCard from "./ItemCard";

  /** GRID
   * xs, extra-small: 0px
   * sm, small: 600px
   * md, medium: 960px
   * lg, large: 1280px
   * xl, extra-large: 1920px
   */
  
function ItemList(props) {
    return (
        <Grid container spacing={2}>
            {props.products.map(product => 
                <Grid item 
                        key={product.id}
                        lg={props.isDrawerOpen ? 4 : 3} 
                        md={props.isDrawerOpen ? 6 : 4} 
                        sm={props.isDrawerOpen ? 12 : 6}>
                    <ItemCard item={product}/>
                </Grid>)
            }
            
            
        </Grid>
    );
}

export default ItemList;