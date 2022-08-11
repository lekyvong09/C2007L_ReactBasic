import { Grid } from "@mui/material";
import ItemCard from "./ItemCard";

  /** GRID
   * xs, extra-small: 0px
   * sm, small: 600px
   * md, medium: 960px
   * lg, large: 1280px
   * xl, extra-large: 1920px
   */
  
function ItemList() {
    return (
        <Grid container spacing={2}>
            <Grid item lg={3} md={4} sm={6}>
                <ItemCard />
            </Grid>
            <Grid item lg={3} md={4} sm={6}>
                <ItemCard />
            </Grid>
            <Grid item lg={3} md={4} sm={6}>
                <ItemCard />
            </Grid>
            <Grid item lg={3} md={4} sm={6}>
                <ItemCard />
            </Grid>
        </Grid>
    );
}

export default ItemList;