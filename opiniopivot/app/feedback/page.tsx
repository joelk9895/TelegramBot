"use client";
import { useEffect, useState } from "react";
import FeedbackItem from "./component/Feedback";

interface Task {
  id: number;
  heading: string;
  description: string;
  upvote: number;
  // Add other fields as needed
}

export default function FeedBack(): JSX.Element {
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetch("http://localhost:8080/");
        if (!response.ok) {
          console.error("Error:", response.statusText);
          return;
        }
        const fetchedData: Task[] = await response.json();
        console.log(fetchedData);
        setData(fetchedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetching(); // Invoke the fetching function
  }, []);

  return (
    <main className="flex flex-col items-center w-full h-full">
      <h1 className="font-bold text-xl mt-10 mb-24">Opinio</h1>
      {data.map((item) => (
        <FeedbackItem
          key={item.id}
          heading={item.heading}
          description={item.description}
          upvote={item.upvote}
        />
      ))}
    </main>
  );
}
