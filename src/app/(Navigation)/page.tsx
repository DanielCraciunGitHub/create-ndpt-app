import { LogInIcon, LogOutIcon } from "lucide-react"

import { auth } from "@/lib/auth"
import { AuthButton } from "@/components/AuthButton"

export default async function Home() {
  const session = await auth()
  return (
    <section>
      {session ? (
        <div className="flex flex-col">
          Welcome {session.user.name} from Auth.js
          <AuthButton icon={<LogOutIcon />} />
        </div>
      ) : (
        <AuthButton icon={<LogInIcon />} />
      )}
    </section>
  )
}
