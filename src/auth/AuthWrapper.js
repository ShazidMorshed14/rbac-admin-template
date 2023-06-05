import { createContext, useContext, useState } from "react";
import { RenderMenuItems, RenderRoutes } from "../structure/RenderNavigation";

import {
  AppShell,
  Navbar,
  Header,
  Group,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { User } from "../components/_user";
import { Logo } from "../components/_logo";
import { MainLinks } from "../components/_mainLinks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : { details: null, isAuthenticated: false, accessToken: null }
  );

  const login = async (userDetails, token) => {
    return new Promise((resolve, reject) => {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          details: userDetails,
          isAuthenticated: true,
          accessToken: token,
        })
      );
      setUser({
        details: userDetails,
        isAuthenticated: true,
        accessToken: token,
      });
      resolve("success");
    });
  };

  const logout = () => {
    localStorage.setItem(
      "userDetails",
      JSON.stringify({ details: null, isAuthenticated: false })
    );
    setUser({ ...user, isAuthenticated: false });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <AppShell
        padding="sm"
        fixed={false}
        navbar={
          <Navbar width={{ base: 100 }} height={"94vh"} p="xs">
            <Navbar.Section grow mt="xs">
              <RenderMenuItems />
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group sx={{ height: "100%" }} px={20} position="apart">
              <Logo />
              <ActionIcon
                variant="default"
                //onClick={() => toggleColorScheme()}
                size={30}
              >
                <IconSun size="1rem" />
              </ActionIcon>
            </Group>
          </Header>
        }
      >
        <RenderRoutes />
      </AppShell>
    </AuthContext.Provider>
  );
};
