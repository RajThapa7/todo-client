import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../api/hooks/useLogin";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useLogin();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log(data, "success");
        window.location.href = "/todos";
      },
      onError: (error) => {
        console.log(error, "error");
      },
    });
  };
  return (
    <Card
      color="transparent"
      // shadow={false}
      className="flex items-center justify-center mt-32 w-fit mx-auto px-8 py-12"
    >
      <Typography variant="h4" color="blue-gray">
        Log In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to Login.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-4 flex flex-col gap-6">
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
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              Remember me
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth type="submit">
          Login
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign up
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
