import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useThreads } from "../contexts/ThreadContext";

const ThreadList = () => {
  const { threads, loading, error, fetchThreads } = useThreads();
  const navigate = useNavigate();

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <div
          key={thread.id}
          className="thread-card"
          onClick={() => navigate(`/thread/${thread.id}`)}
        >
          <h3>{thread.title}</h3>
          <p>{thread.content.substring(0, 100)}...</p>
          <div className="thread-meta">
            <span>Category: {thread.category || "Uncategorized"}</span>
            <span>
              Created: {new Date(thread.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
