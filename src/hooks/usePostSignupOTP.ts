import { useQuery } from "@tanstack/react-query";

const postSignupOTP = async (otp: string, messageToken: string) => {
  const data = await fetch("https://api.trustauthx.com/verify_email/false", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      otp,
      add: messageToken,
      types: "email",
    }),
  }).then((response) => response.json());
  return data;
};

export const usePostSignupOTP = (otp: string, messageToken: string) => {
  return useQuery({
    queryKey: ["postOTP", otp, messageToken],
    queryFn: () => postSignupOTP(otp, messageToken),
  });
};
