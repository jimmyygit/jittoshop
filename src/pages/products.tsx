import { useEffect, useState } from "react";
import {
  Row,
  Container,
  Col,
  Card,
  Form,
  ListGroup,
  FormSelect,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/layouts/default-layout";
import ProductCard from "../components/product-card";
import Paginate from "../components/UI/paginate";
import { useAppDispatch, useAppSelector } from "../redux";
import { getFilterProducts } from "../redux/products/search-list";
import data from "../../public/pro.json";

const Products = () => {
  const params = useParams();
  const { brands, page, pages } = useAppSelector(
    (state) => state.productFilter
  );
  let products = JSON.parse(JSON.stringify(data));
  let categories = ["Processed", "Packaged", "Bulk"];
  const dispatch = useAppDispatch();
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;

  const reset = () => {
    setBrand("");
    setCategory("");
    setSearch("");
  };

  useEffect(() => {
    // dispatch(
    //   getFilterProducts({ n: pageNumber, b: brand, c: category, q: search })
    // );
  }, [dispatch, pageNumber, brand, search, category]);

  return (
    <DefaultLayout>
      <Container>
        <Row>
          <Col lg={3}>
            <h2 className="py-4">Filter</h2>
            <Card className="shadow p-3">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4 className="mb-2">Category</h4>
                  <FormSelect
                    defaultValue={"All"}
                    onChange={(e: any) => {
                      if (e.target.value === "All") {
                        reset();
                      } else {
                        setCategory(e.target.value);
                      }
                    }}
                  >
                    <option value="All">All</option>
                    All
                    {categories.map((categorie: any) => (
                      <option value={categorie} key={categorie}>
                        {categorie}
                      </option>
                    ))}
                  </FormSelect>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          {category ? (
            <Col lg={9}>
              <Row style={{ minHeight: "80vh" }}>
                {products &&
                  products.map(
                    (product) =>
                      product.category == category && (
                        <Col lg={4} md={6} xs={12} key={product._id}>
                          <ProductCard product={product} />
                        </Col>
                      )
                  )}
              </Row>
            </Col>
          ) : (
            <Col lg={9}>
              <Row style={{ minHeight: "80vh" }}>
                {products &&
                  products.map((product) => (
                    <Col lg={4} md={6} xs={12} key={product._id}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default Products;
