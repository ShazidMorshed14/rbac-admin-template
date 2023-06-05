import { Link, Route, Routes, redirect, useNavigate } from "react-router-dom";
import { nav } from "./navigation";
import { AuthData } from "../auth/AuthWrapper";
import {
  IconGitPullRequest,
  IconAlertCircle,
  IconMessages,
  IconDatabase,
  IconLogout,
  IconLogin,
} from "@tabler/icons-react";
import { ThemeIcon, UnstyledButton, Group, Text, Tooltip } from "@mantine/core";
import Login from "../pages/Login";

export const RenderRoutes = () => {
  const { user } = AuthData();

  const navigate = useNavigate();

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
          return <MainLink {...r} />;
        } else if (r.isMenu && user.isAuthenticated) {
          return <MainLink {...r} />;
        } else {
          return false;
        }
      })}
      {user.isAuthenticated ? (
        <MainLink
          name="Logout"
          path="#"
          color="red"
          icon={<IconLogout size="1rem" />}
          handleClick={() => logout()}
        />
      ) : (
        <MainLink
          name="Log in"
          path="/login"
          color="red"
          icon={<IconLogin size="1rem" />}
        />
      )}
    </div>
  );
};

function MainLink({ name, path, color, icon, handleClick }) {
  const navigate = useNavigate();
  return (
    <Tooltip label={name}>
      <UnstyledButton
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.black,

          "&:hover": {
            backgroundColor: theme.colors.gray[0],
          },
        })}
        onClick={() => (handleClick ? handleClick() : navigate(path))}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          {/* <Text size="sm">{name}</Text> */}
        </Group>
      </UnstyledButton>
    </Tooltip>
  );
}
