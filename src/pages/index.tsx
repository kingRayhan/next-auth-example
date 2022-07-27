import { getSession } from "@/app/auth/getSession";
import { GetServerSidePropsContext } from "next";

const HomePage = ({ user }: { user: any }) => {
  return (
    <div>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
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
  const { user } = await getSession(context);

  return {
    props: {
      user,
    },
  };
};
export default HomePage;
