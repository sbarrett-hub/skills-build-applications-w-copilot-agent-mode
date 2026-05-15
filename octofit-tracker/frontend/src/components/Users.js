
const Users = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        console.log('Fetched Users:', results);
      })
      .catch(err => console.error('Error fetching Users:', err));
  }, []);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-warning">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                {data[0] && Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id || idx}>
                  {Object.values(item).map((val, i) => (
                    <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && <div className="alert alert-info">No users found.</div>}
        </div>
      </div>
    </div>
  );
};

export default Users;
