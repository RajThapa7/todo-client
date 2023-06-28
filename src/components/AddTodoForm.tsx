import React, { Dispatch, SyntheticEvent, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import useAddTodo from "../api/hooks/useAddTodo";
import { useQueryClient } from "@tanstack/react-query";

interface IModal {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTodoForm({ open, setOpen }: IModal) {
  const queryClient = useQueryClient();

  const handleOpen = () => setOpen((prev) => !prev);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    isActive: true,
  });

  const addTodoMutation = useAddTodo();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addTodoMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
        setOpen(false);
      },
      onError: (err) => {
        console.log(err, "error");
      },
    });
  };

  return (
    <React.Fragment>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h4" color="white">
              Add New Todo item
            </Typography>
          </CardHeader>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
              <Input
                label="Title"
                size="lg"
                required
                name="title"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <Input
                label="Body"
                size="lg"
                required
                name="body"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <div className="-ml-2.5">
                <Checkbox
                  label="is active"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.checked,
                    })
                  }
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth>
                Add
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}
