import React from "react";

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Percentage Funded</th>
          <th>Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {data?.length === 0 ? (
          <tr>
            <td colSpan="4">No projects found.</td>
          </tr>
        ) : (
          data?.map((item, index) => (
            <tr key={item["s.no"]}>
              <td>{item["s.no"] + 1}</td>
              <td>{item["percentage.funded"]}</td>
              <td>{item["amt.pledged"]}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
