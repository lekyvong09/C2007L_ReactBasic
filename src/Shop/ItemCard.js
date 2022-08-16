import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/material';
import CartContext from '../store/cart-context';

function ItemCard(props) {
    var loadImage = require.context('../assets/images', true);
    var img_src = loadImage(props.item.imageUrl);
    const cartContext = React.useContext(CartContext);

    const addItemHandler = () => {
        cartContext.addItem({
            id: props.item.id,
            title: props.item.title,
            unit: props.item.amount,
            imageUrl: props.item.imageUrl,
            qty: 1
        });
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="product">
                    {props.item.category}
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={props.item.title}
                subheader={props.item.date
                            .toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
            />
            <CardMedia
                component="img"
                height="494"
                image={img_src}  /// ../assets/images/BOOK-COMIC-1000.jpg
                alt={props.item.title}
            />
            <CardContent>
                <Box sx={{height: 30}}>
                    <Typography variant="body2" color="text.secondary">
                        {`this is description of ${props.item.title}`}
                    </Typography>
                </Box>
                
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="add to cart" onClick={addItemHandler}>
                    <ShoppingCartIcon />
                </IconButton>
            </CardActions>
      
        </Card>
    );
}

export default ItemCard;