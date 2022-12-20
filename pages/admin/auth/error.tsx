import { useRouter } from "next/router";

export default function Error(props: any) {
  const { query } = useRouter();

  return <div>{query.error}</div>;
}