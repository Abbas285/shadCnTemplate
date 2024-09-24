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
import db from "../../../db/db.json";
import { api } from "../api";
const UserList = () => {
  const [userData, setUserData] = useState <any>([]);
  const [selectedUserData, setSelectedUserData] = useState<any>(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);

  const getUserData = () => {
    api
      .get("users")
      .then((res) => {

        setUserData(res.data.db);
      })
      .catch((error) => {
        console.log(error);
        setUserData(db);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);
  const deleteUser = (selectedUser: any) => {
    api
      .delete(`users/${selectedUser.id}`)
      .then(() => {
        toast.success("success");
        getUserData();
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      });
  };
  return (
    <div className="w-full">
      <Table>
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
            userData.map((userItem: any, index:any) => {
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
      <div className="w-full py-5 text-right">
        <Button
          onClick={() => {
            setSelectedUserData(null);
            setOpenNewUserDialog(true);
          }}
        >
          Add New User
        </Button>
      </div>
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
          // selectedUserData={selectedUserData}
          openViewDialog={openNewUserDialog}
          setOpenViewDialog={setOpenNewUserDialog}
          getUserData={getUserData}
        />
      )}
    </div>
  );
};

export default UserList;
