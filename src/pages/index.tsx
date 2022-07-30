import { api } from "@/app/api/client/api.client";
import { getSession } from "@/app/auth/getSession";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

interface Props {
  user: any;
  isAuthenticated: boolean;
}

const HomePage: React.FC<Props> = ({ user, isAuthenticated }) => {
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   api.get("/auth/me").then((res) => {
  //     setUser(res.data);
  //   });
  // }, []);

  return (
    <div>
      <pre>
        <code>{JSON.stringify({ user }, null, 2)}</code>
      </pre>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        possimus ipsam laudantium ducimus aspernatur natus, quos unde quibusdam
        mollitia debitis id aperiam est voluptates corrupti, officiis doloribus?
        Repellat, autem deleniti.
      </p>
    </div>
  );
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { user, isAuthenticated } = await getSession(context);

  return {
    props: {
      user,
      isAuthenticated,
    },
  };
};
export default HomePage;
