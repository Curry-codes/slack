import { getUserData } from "@/actions/getUserData";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {

    const userData = await getUserData();

    if(!userData) {
      return redirect('/auth')
    }

    const userWorksSpaceId = userData.workspaces?.[0];

    if(!userWorksSpaceId) {
      return redirect('/create-workspace')
    } 
    if (userWorksSpaceId) return redirect(`/workspaces/${userWorksSpaceId}`)


    

  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
