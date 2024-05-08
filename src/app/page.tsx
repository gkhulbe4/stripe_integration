import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Signout from "./_components/Signout";
import Signin from "./_components/Signin";
import AddCourse from "./_components/AddCourse";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log("user", session?.user);
  return (
    <div>
      <div className="items-center flex flex-col justify-center">
        {session?.user ? <Signout /> : <Signin />}
        <h1>
          {session?.user
            ? <AddCourse/>
            : "Signin to see something jhakkass"}
        </h1>
      </div>
    </div>
  );
}
