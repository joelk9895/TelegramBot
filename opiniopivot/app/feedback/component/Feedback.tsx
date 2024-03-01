interface FeedbackItemProps {
  heading: string;
  description: string;
  upvote: number;
}

export default function FeedbackItem({
  heading,
  description,
  upvote,
}: FeedbackItemProps): JSX.Element {
  return (
    <div
      className={`kanban border-2 rounded-lg p-3 pb-10 mt-2 mb-2 w-[300px] min-w-[300px] max-w-[300px] min-h-[50px] relative`}
    >
      <h3 className="text-xl font-bold mb-7">{heading}</h3>
      <p>{description}</p>
      <p className="kanbanUp font-bold bg-black rounded-lg w-10 text-white text-center">
        {upvote}
      </p>
    </div>
  );
}
