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
import { toast } from "react-toastify";
import { memo, useEffect } from "react";
import { api } from "../api";
import { useForm, SubmitHandler } from "react-hook-form";

interface pageProps {
  selectedUserData: any;
  openViewDialog: boolean;
  setOpenViewDialog: any;
  getUserData: any;
}

type FormValues = {
  id: string;
  name: string;
  username: string;
  email: string;
};

const EditUserDialog = ({
  selectedUserData,
  openViewDialog,
  setOpenViewDialog,
  getUserData,
}: pageProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (selectedUserData) {
      setValue("id", selectedUserData?.id);
      setValue("name", selectedUserData?.name);
      setValue("username", selectedUserData?.username);
      setValue("email", selectedUserData?.email);
    }
  }, [selectedUserData, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const apiBody = { ...data };
    api
      .put(`users`, apiBody)
      .then((res) => {
        if(res.data.status===400){
          toast.error("on this email User Already exist");
        }else{
          toast.success("Successfully updated");
          getUserData();
          setOpenViewDialog(false);
        }
     
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
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
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
              User Name <span className="text-red-600">*</span>
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
          {/* Dialog Footer */}
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(EditUserDialog);
