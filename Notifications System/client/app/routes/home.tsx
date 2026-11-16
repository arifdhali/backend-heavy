import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useCallback, useEffect, useMemo, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);

  // const fetchBooks = useCallback(async () => {
  //   let res = await fetch("https://openlibrary.org/subjects/science_fiction.json?limit=10");
  //   let data = await res.json();
  //   setBooks(data.works)
  //   console.count("Fetching books")
  // }, [count]);


  // useEffect(() => {
  //   fetchBooks();
  // }, [fetchBooks])
  // console.log('re-rendering')


  // OBJECT ISSUSE

  // const options = useMemo(() => ({
  //   limit: 10,
  //   subject: "science_fiction"
  // }
  // ), [])
  // useEffect(() => {

  //   async function fetchBooks() {
  //     let res = await fetch(`https://openlibrary.org/subjects/${options.subject}.json?limit=${options.limit}`);
  //     let data = await res.json();
  //     setBooks(data.works)
  //     console.count("Fetching books")


  //   };
  //   fetchBooks();
  // }, [options]);
  // console.log('re-rendering')



  

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>

      <br />
      <br />
      <br />
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (<li key={book.key}>{book?.title}</li>))}
        </ul>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}
