import "./App.scss";
function App(){
    function handle(){
       return(
        <>
        <p>hello woi
            
        </p>
        </>
       )
    }
    return(
        <>
        <div id="box">
        <label for="input" id="label">Enter Pincode</label>
        <input type="number" placeholder="Pincode" id="input" min={100000} max={599999} maxLength={6} ></input>
        
        <button id="bt" onClick={handle}>Lookup</button>
        </div>
        </>

        
  const handlePincodeChange = (event) => {
    const value = event.target.value;
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setPincode(value);
    }
  };

  const fetchPincodeDetails = async () => {
    if (pincode.length !== 6) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      if (data[0].Status === 'Error') {
        setError(data[0].Message);
        setPostOffices([]);
        return;
      }
      setPostOffices(data[0].PostOffice);
      setFilteredPostOffices(data[0].PostOffice);
    } catch (error) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    if (filterValue === '') {
      setFilteredPostOffices(postOffices);
    } else {
      const filtered = postOffices.filter(postOffice =>
        postOffice.Name.toLowerCase().includes(filterValue)
      );
      setFilteredPostOffices(filtered);
    }
  };

  return (
    <div>
      <h2>Pincode Lookup</h2>
      <input
        type="text"
        placeholder="Enter 6-digit Pincode"
        value={pincode}
        onChange={handlePincodeChange}
      />
      <button onClick={fetchPincodeDetails}>Lookup</button>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Filter by post office name"
        onChange={handleFilterChange}
      />
      <div>
        {filteredPostOffices.length === 0 ? (
          <p>Couldn’t find the postal data you’re looking for…</p>
        ) : (
          <ul>
            {filteredPostOffices.map(postOffice => (
              <li key={postOffice.Name}>
                <strong>Post office:</strong> {postOffice.Name}<br />
                <strong>Pincode:</strong> {postOffice.Pincode}<br />
                <strong>District:</strong> {postOffice.District}<br />
                <strong>State:</strong> {postOffice.State}<br />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


export default App;

