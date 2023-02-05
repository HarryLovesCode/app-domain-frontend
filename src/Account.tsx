import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

interface AccountProps {
  key: string;
  session: any;
}

export function Account(props: AccountProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<any>(null);

  const fetchUser = async () => {
    setLoading(true);

    let { user } = props.session;

    let data0 = await supabase
      .from("users")
      .select("*")
      .eq("user_email", user.email);

    let data0Actual = data0.data;

    if (data0Actual) {
      setUser(data0Actual[0]);
    }

    const role = data0Actual![0].user_role;

    let data1 = await supabase.from("roles").select("*").eq("id", role);

    let data1Actual = data1.data;

    if (data1Actual) {
      setRole(data1Actual[0]);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div>{JSON.stringify(user)}</div>
      <div>{JSON.stringify(role)}</div>
    </>
  );
}
