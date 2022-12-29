import { useState } from "react";

export default function Search() {
  const [recommandations, setRecommandations] = useState([]);
  const [search, setSearch] = useState("");
  
  const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (e.target.value.length < 2) {
      return setRecommandations([]);
    }

    const result = await fetch(`/api/search?search=${e.target.value}`);

    if (result.ok) {
      const data = await result.json();
      setRecommandations(data.result);
    } else {
      console.log("error");
    }
  };
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    console.log(input.value);
    console.log("search");
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={searchHandler}>
        <input type='text' onChange={inputHandler} />
        <button type='submit'>Search</button>
      </form>
      <div>
        {recommandations?.map(recommandation => (
          <div key={recommandation.id}>{recommandation.title}</div>
        ))}
      </div>
    </div>
  );
}
