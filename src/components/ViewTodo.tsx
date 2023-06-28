import React, { Dispatch } from "react";
import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";
import useFetchSingleTodo from "../api/hooks/useFetchSingleTodo";

interface IModal {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function ViewTodo({ open, setOpen }: IModal) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOpen = () => {
    setOpen((prev) => !prev);
    setSearchParams({});
  };

  const result = useFetchSingleTodo(open, setOpen);

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
              View Todo
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div>
              <Typography variant="h6">Title</Typography>
              <Typography>{result.data?.title}</Typography>
            </div>
            <div>
              <Typography variant="h6">Body</Typography>
              <Typography>{result.data?.body}</Typography>
            </div>
            <div>
              <Typography variant="h6">Is Active</Typography>
              <Typography>{String(result.data?.isActive)}</Typography>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}
