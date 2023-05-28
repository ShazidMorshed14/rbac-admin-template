import { Link, Route, Routes } from "react-router-dom";
import { nav } from "./navigation";
import { AuthData } from "../auth/AuthWrapper";

export const RenderRoutes = () => {
  const user = AuthData();

  return (
    <Routes>
      {nav.map((r, i) => {
        if (r.isPrivate && user.isAuthenticated) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else if (!r.isPrivate) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else {
          return false;
        }
      })}
    </Routes>
  );
};

export const RenderMenuItems = () => {
  const { user, logout } = AuthData();

  return (
    <div className="menu">
      {nav.map((r, i) => {
        if (!r.isPrivate && r.isMenu) {
          return (
            <div>
              <Link to={r.path}>{r.name}</Link>
            </div>
          );
        } else if (r.isMenu && user.isAuthenticated) {
          return (
            <div>
              <Link to={r.path}>{r.name}</Link>
            </div>
          );
        } else {
          return false;
        }
      })}
      {user.isAuthenticated ? (
        <div className="menuItem">
          <Link to={"#"} onClick={logout}>
            Log out
          </Link>
        </div>
      ) : (
        <div className="menuItem">
          <Link to={"login"}>Log in</Link>
        </div>
      )}
    </div>
  );
};
