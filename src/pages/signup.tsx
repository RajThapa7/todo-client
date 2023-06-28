import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../api/hooks/useSignup";

export default function Signup() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupMutation = useSignup();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    isAgreed &&
      signupMutation.mutate(formData, {
        onSuccess: (data) => {
          navigate("/todos");
          console.log("success", data);
        },
        onError: (err) => {
          console.log(err, "error");
        },
      });
  };
  return (
    <Card
      color="transparent"
      // shadow={false}
      className="w-fit mx-auto flex items-center justify-center mt-32 px-8 py-12"
    >
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Name"
            name="name"
            required
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <Input
            size="lg"
            label="Email"
            required
            name="email"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            required
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <Checkbox
          onChange={(e) => {
            setIsAgreed(e.target.checked);
          }}
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-blue-500"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth type="submit">
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Log In
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
