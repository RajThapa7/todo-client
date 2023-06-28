import { PlusIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import useFetchTodos from "../api/hooks/useFetchTodos";
import useDeleteTodo from "../api/hooks/useDeleteTodo";
import { useQueryClient } from "@tanstack/react-query";
import AddTodoForm from "../components/AddTodoForm";
import { useState } from "react";
import EditTodoForm from "../components/EditTodoForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import ViewTodo from "../components/ViewTodo";
import useLogout from "../api/hooks/useLogout";

export default function Todos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const todosList = useFetchTodos().data;

  const deleteTodo = useDeleteTodo();

  const logout = useLogout();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout.mutate("_", {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
      onError: (err) => {
        console.log(err, "error");
      },
    });
  };

  const handleDeleteAllTodos = () => {
    deleteTodo.mutate("", {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
      onError: (err) => {
        console.log(err, "error");
      },
    });
  };

  return (
    <Card className="w-96 mx-auto mt-28 py-4">
      <Typography
        variant="h3"
        color="blue"
        textGradient
        className="text-center"
      >
        Todo list
      </Typography>
      <List>
        {todosList?.map((item) => (
          <ListItem
            className="py-1 pr-1 pl-4"
            onClick={() => {
              setSearchParams({ id: item._id });
              setIsViewModalOpen(true);
            }}
          >
            <p className={`${!item.isActive && "line-through"}`}>
              {item.title}
            </p>
            {item.isActive && (
              <ListItemSuffix className="inline-flex">
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchParams({ id: item._id });
                    setIsEditModalOpen(true);
                  }}
                  ripple={false}
                >
                  <PencilSquareIcon className="h-5 w-5 text-gray-500" />
                </IconButton>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  ripple={false}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTodo(item._id);
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                </IconButton>
              </ListItemSuffix>
            )}
          </ListItem>
        ))}
      </List>
      <div className="inline-flex gap-3 justify-center">
        <Button
          className="flex items-center justify-center w-fit h-fit p-3 rounded-full "
          onClick={() => setIsAddModalOpen((prev) => !prev)}
        >
          <PlusIcon className="h-8 w-8" />
        </Button>
        <Button
          color="red"
          className="flex items-center justify-center w-fit h-fit p-3 rounded-full "
          onClick={() => handleDeleteAllTodos()}
        >
          <TrashIcon className="h-8 w-8" />
        </Button>
        <Button
          color="amber"
          className="flex items-center justify-center w-fit h-fit p-3 rounded-full "
          onClick={() => handleLogout()}
        >
          <ArrowLeftOnRectangleIcon color="white" className="h-8 w-8" />
        </Button>
      </div>
      <AddTodoForm open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      <EditTodoForm open={isEditModalOpen} setOpen={setIsEditModalOpen} />
      <ViewTodo open={isViewModalOpen} setOpen={setIsViewModalOpen} />
    </Card>
  );
}
