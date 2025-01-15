import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import Pagination from './components/Pagination';
import { fetchProjects } from './services/api';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const recordsPerPage = 5;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const totalPages = Math.ceil(projects?.length / recordsPerPage);
  const paginatedData = projects?.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div>
      <header className="app-header">
        <img src="/logo_main.png" alt="App Icon" className="app-icon" />
        <h1 className="app-title">Project Explorer</h1>
      </header>
      <main>
        {error && <p className="error">{error}</p>}
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <Table data={paginatedData} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
