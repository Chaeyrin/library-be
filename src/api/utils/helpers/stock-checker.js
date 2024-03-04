import { ResponseError } from "../index.js";

const checkStockAvailability = (
  bookStock,
  quantity_borrowed,
  rollback = true,
  t
) => {
  if (!bookStock || bookStock.quantity_available < quantity_borrowed) {
    if (rollback && t) {
      t.rollback();
    }
    throw new ResponseError(400, `Not enough quantity available for borrowing`);
  }
};

// const checkStockAvailability = (bookStock, quantity_borrowed) => {
//   if (!bookStock || bookStock.quantity_available < quantity_borrowed) {
//     throw new ResponseError(400, `Not enough quantity available for borrowing`);
//   }
// };

export { checkStockAvailability };
