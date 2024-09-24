import UserList from "./components/users/UserList"
export default function Home() {
  return (
<div className="w-screen h-screen bg-slate-300 text-black p-3">
<div className="w-full  text-center py-5">
<h1 className="text-xl ">Basic  Users Cruds</h1>
</div>
<UserList/>
</div>
  );
}
