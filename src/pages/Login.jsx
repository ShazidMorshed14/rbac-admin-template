import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Flex,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../auth/AuthWrapper";
import { useMutation } from "@tanstack/react-query";
import { handleErrorResponse } from "../utils/utils";
import { NotificationUtil } from "../utils/notifications";
import { signin } from "../services/login";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthData();

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const { mutate: loginMutate, isLoading: isMutating } = useMutation({
    mutationFn: (value) => signin(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        toast.success("Login Success");
        login(response?.user, response?.token);
        navigate("/");
      }
    },
  });

  const handleSubmit = () => {
    loginMutate(form.values);
  };

  return (
    <Flex justify="center" align="center">
      <Paper radius="md" p="xl" withBorder sx={{ width: "500px" }}>
        <Text size="lg" weight={500}>
          Welcome Admin
        </Text>

        <Divider label="continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="test@gmail.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Flex justify="flex-end" mt="xl">
            <Button type="submit" radius="xl" disabled={isMutating}>
              {upperFirst(type)}
            </Button>
          </Flex>
        </form>
      </Paper>
    </Flex>
  );
};

export default Login;
