import { createContext, useContext, useState, useCallback } from "react";

const ThreadContext = createContext();

export const useThreads = () => {
  const context = useContext(ThreadContext);
  if (!context) {
    throw new Error("useThreads must be used within a ThreadProvider");
  }
  return context;
};

export const ThreadProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteThread = useCallback(async (threadId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/threads/${threadId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete thread");
      }

      // Remove the thread from state
      setThreads((prevThreads) =>
        prevThreads.filter((thread) => thread.id !== threadId)
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchThreads = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/threads");
      const data = await response.json();
      setThreads(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch threads");
    } finally {
      setLoading(false);
    }
  }, []);

  const createThread = useCallback(
    async (threadData) => {
      try {
        const response = await fetch("http://localhost:3000/api/threads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(threadData),
        });
        const data = await response.json();
        if (response.ok) {
          fetchThreads();
          return data;
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        throw new Error(err.message);
      }
    },
    [fetchThreads]
  );

  const value = {
    threads,
    loading,
    error,
    fetchThreads,
    createThread,
    deleteThread,
  };

  return (
    <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>
  );
};
