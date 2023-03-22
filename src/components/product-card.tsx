import { Card } from "react-bootstrap";
import { formatCurrencry } from "../utils/helper";
import { ReviewTypes } from "../utils/interfaces";
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cart/cart-slice";

export type Product = {
  _id: number | string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  qty: number;
  createdAt: Date;
  reviews: ReviewTypes[];
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAdd = () => {
    console.log(product);
    dispatch(addToCart(product as Product));
    navigate("/cart");
  };

  return (
    <Card className="my-3 p-3 rounded" style={{ height: "500px" }}>
      {/* <Link to={`/products/${product._id}`}> */}
      <Card.Img
        src={product.image}
        variant="top"
        style={{ height: "300px", width: "100%", objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{product.name}</span>
          <span className="ms-2 text-muted">
            {formatCurrencry(product.price)}
          </span>
        </Card.Title>
        <Button
          style={{ backgroundColor: "#763f98" }}
          onClick={onAdd}
          className="w-full"
        >
          Add To Cart
        </Button>
      </Card.Body>
      {/* </Link> */}
    </Card>
  );
};

export default ProductCard;
