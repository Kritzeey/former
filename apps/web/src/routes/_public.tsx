import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div className="min-h-dvh">
      <Outlet />
    </div>
  );
}
