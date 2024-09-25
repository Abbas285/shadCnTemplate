import UserList from "./components/users/UserList"
export default function Home() {
  return (
    <div className="w-screen min-h-[100vh] bg-slate-300 text-black p-3 overflow-x-hidden">
      <div className="w-full  text-center py-5">
        <h1 className="text-xl ">Basic  Users Cruds</h1>
      </div>
      <UserList />
    </div>
  );
}
