// components/Document/FilterBar.jsx
const FilterBar = () => {
  const sharedStyle = {
    border: "none",
    borderRight: "1px solid #ced4da",
    borderRadius: "0",
    boxShadow: "none",
  };

  return (
    <div
      className="d-flex mb-3"
      style={{
        border: "1px solid #ced4da",
        borderRadius: "4px",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <select className="form-select" style={{ ...sharedStyle, width: "15%" }}>
        <option>Action Type</option>
        <option>Create</option>
        <option>Update</option>
        <option>Delete</option>
      </select>
      <select className="form-select" style={{ ...sharedStyle, width: "15%" }}>
        <option>Template Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <div
        className="input-group"
        style={{
          ...sharedStyle,
          width: "70%",
          backgroundColor: "white",
        }}
      >
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search" style={{ color: "#6c757d" }}></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search templates..."
          style={{ border: "none", boxShadow: "none" }}
        />
      </div>
    </div>
  );
};

export default FilterBar;
