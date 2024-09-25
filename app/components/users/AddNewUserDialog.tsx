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
import { memo, useState } from "react";
import { toast } from 'react-toastify';
import { api } from "../api";

interface pageProps {
  userData:any,
  openViewDialog: boolean;
  setOpenViewDialog: any;
  getUserData: any;
}
const AddNewUserDialog = ({
  userData,
  openViewDialog,
  setOpenViewDialog,
  getUserData,
}: pageProps) => {
  const [userForm, setUserForm] = useState<any>({
    name: "",
    username: "",
    email: "",
  });
  const { name, username, email } = userForm;
  const onchangeHandler = (event: any) => {
    const { name, value } = event.target;
    setUserForm((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitForm = () => {
    const apiBody = {
      id:userData.length+1,
      name,
      username,
      email,
    };
    api
      .post(`users`, apiBody)
      .then(() => {
        toast.success("success");
        getUserData();
        setOpenViewDialog(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      });
  };

  return (
    <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
      <DialogContent className="sm:max-w-[425px] bg-slate-100 text-black">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue={name}
              onChange={onchangeHandler}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              User Name
            </Label>
            <Input
              id="username"
              name="username"
              defaultValue={username}
              onChange={onchangeHandler}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              defaultValue={email}
              onChange={onchangeHandler}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submitForm}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddNewUserDialog);
