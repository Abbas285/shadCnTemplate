"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import ViewUserDialog from "./ViewUserDialog";
import EditUserDialog from "./EditUserDialog";
import AddNewUserDialog from "./AddNewUserDialog";
import Loader from "../utils/loader";
import axios from "axios";
import { api } from "../api";
const UserList = () => {
  const [userData, setUserData] = useState<any>([]);
  const [selectedUserData, setSelectedUserData] = useState<any>(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);

  const getUserData = () => {
    api
      .get("users")
      .then((res) => {
        setUserData(res.data.res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);

  const deleteUser = (selectedUser: any) => {
    let data :any= JSON.stringify({
      "id": selectedUser.id
    });
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/users',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      getUserData();
      toast.success("success");
    })
    .catch((error) => {
      console.log(error);
    });

  };
  return (
    <div className="w-full ">
{userData&&userData.length>0?
     <>
   
     <Table className="w-full overflow-hidden">
          <TableCaption>A list of Users </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">ID</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Operation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData &&
              userData.length > 0 &&
              userData.map((userItem: any, index: any) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{userItem?.id}</TableCell>
                    <TableCell>{userItem.name}</TableCell>
                    <TableCell>{userItem.username}</TableCell>
                    <TableCell>{userItem.email}</TableCell>
                    <TableCell className="flex gap-3 justify-end">
                      <Button
                        onClick={() => {
                          setSelectedUserData(userItem);
                          setOpenViewDialog(true);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSelectedUserData(userItem);
                          setOpenEditDialog(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          deleteUser(userItem);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <div className="w-full py-5 text-right px-5">
          <Button
            onClick={() => {
              setSelectedUserData(null);
              setOpenNewUserDialog(true);
            }}
          >
            Add New User
          </Button>
        </div>
     
     </>:<div className="w-screen h-[60vh] flex justify-center items-center">
     <Loader/>
      </div>
}
      {openViewDialog && (
        <ViewUserDialog
          selectedUserData={selectedUserData}
          openViewDialog={openViewDialog}
          setOpenViewDialog={setOpenViewDialog}
        />
      )}
      {openEditDialog && (
        <EditUserDialog
          selectedUserData={selectedUserData}
          openViewDialog={openEditDialog}
          setOpenViewDialog={setOpenEditDialog}
          getUserData={getUserData}
        />
      )}
      {openNewUserDialog && (
        <AddNewUserDialog
        userData={userData}
          openViewDialog={openNewUserDialog}
          setOpenViewDialog={setOpenNewUserDialog}
          getUserData={getUserData}
        />
      )}
    </div>
  );
};

export default UserList;
