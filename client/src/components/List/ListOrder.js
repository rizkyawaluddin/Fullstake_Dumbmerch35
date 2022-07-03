import { useCart } from "react-use-cart";
import Table from "react-bootstrap/Table";

export default function ListOrder() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart();
  
  if (isEmpty) return <h1 className="text-center">Cart Empty</h1>;
  return (
    <div className="py-4 container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h5>cart =({totalUniqueItems})</h5>
          <h6>total items={totalItems}</h6>
          <Table className="table table-light table-hover m-0">
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img alt="" src={item.image} height="80px" />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>Quantity ({item.quantity})</td>
                    <td>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        className="btn btn-info ms-2"
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          updateItemQuantity(item.id, item.quantity + 1);
                        }}
                        className="btn btn-info ms-2"
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger ms-2 my-2"
                        onClick={() => {
                          removeItem(item.id);
                        }}
                      >
                        remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <h1>Total : {cartTotal}</h1>
      </div>
    </div>
  );
}
