import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo } from "react";
import { toast } from "react-toastify";
import { api } from "../api";
import { useForm, SubmitHandler } from "react-hook-form";

interface pageProps {
  userData: any;
  openViewDialog: boolean;
  setOpenViewDialog: any;
  getUserData: any;
}

type FormValues = {
  name: string;
  username: string;
  email: string;
};

const AddNewUserDialog = ({
  userData,
  openViewDialog,
  setOpenViewDialog,
  getUserData,
}: pageProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const apiBody = {
      id: userData.length + 1,
      ...data,
    };
    console.log("data", data);
    api
      .post(`users`, apiBody)
      .then(() => {
        toast.success("User created successfully");
        getUserData();
        setOpenViewDialog(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  return (
    <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
      <DialogContent className="sm:max-w-[425px] bg-slate-100 text-black">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Add a new user by filling in the fields below.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username <span className="text-red-600">*</span>
            </Label>
            <Input
              id="username"
              {...register("username", { required: "Username is required" })}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email <span className="text-red-600">*</span>
            </Label>
            <Input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              className="col-span-3"
            />
          </div>
          <div className=" w-full text-center">
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddNewUserDialog);
