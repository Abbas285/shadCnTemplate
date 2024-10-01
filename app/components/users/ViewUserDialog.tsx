import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo, useMemo } from "react";


interface pageProps {
  selectedUserData: any;
  openViewDialog: boolean;
  setOpenViewDialog: any;
}

const ViewUser = ({
  selectedUserData,
  openViewDialog,
  setOpenViewDialog,
}: pageProps) => {
  
  const userData = useMemo(() => selectedUserData, []);

  return (
    <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
      <DialogContent className="sm:max-w-[425px] bg-slate-100 text-black">
        <DialogHeader>
          <DialogTitle>View User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              disabled 
              defaultValue={userData?.name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              disabled 
              defaultValue={userData?.username}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              disabled 
              defaultValue={userData?.email}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ViewUser);
