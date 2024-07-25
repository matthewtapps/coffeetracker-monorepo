import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/BasicAuth"
import { useNavigate } from "react-router-dom"

export function LoginForm() {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!auth.login(username, password)) {
      setError('Invalid username or password')
    }
    navigate("/")
  }

  return (
    <div className="flex z-10 min-h-screen w-full flex-col justify-center pb-32">
      <Card className="flex flex-col z-0 m-3">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to log in.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label >Username</Label>
            <Input id="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>Sign in</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

