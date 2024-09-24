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
import { toast } from 'react-toastify';
import { memo, useMemo, useState, useEffect } from "react";
import { api } from "../api";

interface pageProps {
  selectedUserData: any;
  openViewDialog: boolean;
  setOpenViewDialog: any;
  getUserData: any;
}
const EditUserDialog = ({
  selectedUserData,
  openViewDialog,
  setOpenViewDialog,
  getUserData,
}: pageProps) => {
  const [userForm, setUserForm] = useState<any>({
    name: "",
    userName: "",
    email: "",
  });
  const userData = useMemo(() => selectedUserData, []);
  useEffect(() => {
    {
      userData &&
        setUserForm({
          name: userData?.name,
          userName: userData?.username,
          email: userData?.email,
        });
    }
  }, [userData]);

  const onchangeHandler = (event: any) => {
    const { name, value } = event.target;
    setUserForm((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitForm = () => {
    api
      .put(`users/${userData.id}`)
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
  const { name, userName, email } = userForm;

  return (
    <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
      <DialogContent className="sm:max-w-[425px] bg-slate-100 text-black">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
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
              defaultValue={userName}
              onChange={onchangeHandler}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
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

export default memo(EditUserDialog);
