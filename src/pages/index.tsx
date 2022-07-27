import { api } from "@/app/api/client/api.client";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        possimus ipsam laudantium ducimus aspernatur natus, quos unde quibusdam
        mollitia debitis id aperiam est voluptates corrupti, officiis doloribus?
        Repellat, autem deleniti.
      </p>
    </div>
  );
};

export default HomePage;
