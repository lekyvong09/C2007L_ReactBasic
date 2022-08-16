import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function ShoppingCart(props) {
  const cartItems = [
    {id: 1, title: 'Superman: Action Comics Volume 5', unit: 12.99, imageUrl: "./BOOK-COMIC-1000.jpg", qty: 2},
    {id: 2, title: 'Batman: The Silver Age Omnibus', unit: 99.99, imageUrl: "./BOOK-COMIC-1001.jpg", qty: 1},
    {id: 3, title: 'The Fifth Science', unit: 24.99, imageUrl: "./BOOK-FICTION-1002.jpg", qty: 3},
    {id: 4, title: 'The Summer House', unit: 15.00, imageUrl: "./BOOK-ROMANTIC-1003.jpg", qty: 1},
    {id: 5, title: 'The Art of Computer Programming', unit: 187.99, imageUrl: "./BOOK-PROGRAMMING-1004.jpg", qty: 2}
  ];

  let total = cartItems.map(item => item.unit * item.qty)
                        .reduce((sum, i) => sum + i, 0);

  var loadImage = require.context('../assets/images', true);

    return (
        <Dialog maxWidth={'lg'} open={props.openModal} onClose={props.onCloseModal}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align='center' colSpan={3}>Detail</TableCell>
                  <TableCell align='right'>Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Desc</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((row) => (
                  <TableRow key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell scope="row">
                      <Box
                        component="img"
                        src={loadImage(row.imageUrl)} 
                        sx={{height: 63}}
                      />
                    </TableCell>
                    <TableCell scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.unit.toFixed(2)}</TableCell>
                    <TableCell align="right">{(row.qty * row.unit).toFixed(2)}</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell align='right'>{total.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCloseModal}>Cancel</Button>
          <Button onClick={props.onCloseModal}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    );

}

export default ShoppingCart;