import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/utils";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: string; user: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => !!getCookie("accessToken"),
  );

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUser = async () => {
        const token = getCookie("accessToken");
        try {
          const response = await fetch("http://localhost:3000/api/auth/me", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();

            console.log(data);

            setUser(data.user);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        }
      };

      fetchUser();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    document.cookie = "accessToken=; path=/; max-age=0; SameSite=Strict";

    setIsLoggedIn(false);
    setUser(null);

    navigate("/log-in");
  };

  return (
    <header className="z-50 bg-background border-b px-4 h-16 top-0 fixed w-full flex items-center justify-between">
      <Link to="/" className="font-bold text-2xl">
        Former
      </Link>

      <div className="flex gap-2 items-center">
        {isLoggedIn ? (
          <>
            {user && (
              <span className="text-sm font-medium mr-2 ">{user.user}</span>
            )}

            <Button
              variant="outline"
              onClick={handleLogout}
              className="cursor-pointer rounded-md"
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Link to="/log-in">
              <Button variant="outline" className="cursor-pointer rounded-md">
                Log In
              </Button>
            </Link>

            <Link to="/sign-up">
              <Button className="rounded-md hover:opacity-90 cursor-pointer">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
