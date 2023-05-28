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

const AuthContext = createContext();

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ details: null, isAuthenticated: false });

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      if (password === "password") {
        const userDetails = {
          email: email,
          password: password,
        };
        setUser({ details: userDetails, isAuthenticated: true });
        resolve("success");
      } else {
        reject("Incorrect Password");
      }
    });
  };

  const logout = () => {
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <AppShell
        padding="md"
        fixed={false}
        navbar={<RenderMenuItems />}
        header={
          <Header height={60}>
            <Group sx={{ height: "100%" }} px={20} position="apart">
              <ActionIcon variant="default" size={30}></ActionIcon>
            </Group>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <RenderRoutes />
      </AppShell>
    </AuthContext.Provider>
  );
};
