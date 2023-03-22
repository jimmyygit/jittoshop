import { useEffect } from "react";
import FormContainer from "../../components/UI/form-container";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../redux";
import { userLogin } from "../../redux/users/login-slice";
import Accordion from "react-bootstrap/Accordion";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.login);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(1, "Password must be at least 1 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormValues) => {
    navigate("/home");
  };

  useEffect(() => {
    if (userInfo) return navigate("/");
  }, [userInfo]);

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className={errors.email?.message && "is-invalid"}
            />
            <p className="invalid-feedback">{errors.email?.message}</p>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="*******"
              {...register("password")}
              className={errors.password?.message && "is-invalid"}
            />
            <p className="invalid-feedback">{errors.password?.message}</p>
          </Form.Group>

          <Button
            type="submit"
            className="mt-4 w-full"
            style={{ backgroundColor: "#763f98", color: "#fff" }}
            variant="outline-none"
          >
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Login;
