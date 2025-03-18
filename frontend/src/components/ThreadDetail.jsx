import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useThreads } from "../contexts/ThreadContext";

const ThreadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteThread } = useThreads();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/threads/${id}`);
        const data = await response.json();
        setThread(data);
        setReplies(data.replies || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch thread");
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [id]);

  const handleDeleteReply = async (replyId) => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/threads/replies/${replyId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete reply");
        }

        // Remove the reply from state
        setReplies((prevReplies) =>
          prevReplies.filter((reply) => reply.id !== replyId)
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/threads/${id}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: newReply }),
        }
      );

      if (response.ok) {
        const newReply = await response.json();
        setReplies((prevReplies) => [...prevReplies, newReply]);
        setNewReply("");
        setError(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to post reply");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!thread) return <div>Thread not found</div>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this thread?")) {
      try {
        await deleteThread(id);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="thread-detail">
      <div className="thread-header">
        <h2>{thread.title}</h2>
        <button onClick={handleDelete} className="delete-button">
          Delete Thread
        </button>
      </div>
      <div className="thread-content">
        <p>{thread.content}</p>
        <div className="thread-meta">
          <span>Category: {thread.category || "Uncategorized"}</span>
          <span>
            Created: {new Date(thread.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="replies-section">
        <h3>Replies</h3>
        {replies.map((reply) => (
          <div key={reply.id} className="reply">
            <div className="reply-content">
              <p>{reply.content}</p>
              <button
                onClick={() => handleDeleteReply(reply.id)}
                className="delete-reply-button"
              >
                Delete Reply
              </button>
            </div>
            <span className="reply-date">
              {new Date(reply.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleReply} className="reply-form">
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Write your reply..."
          required
        />
        <button type="submit">Post Reply</button>
      </form>
    </div>
  );
};

export default ThreadDetail;
