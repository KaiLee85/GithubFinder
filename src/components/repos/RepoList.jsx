import PropTypes from "prop-types";
function RepoList({ repos }) {
  return (
    <div>
      <div>
        <h2>Respositories</h2>
        {repos.map((repo) => (
          <h3>{repo.name}</h3>
        ))}
      </div>
    </div>
  );
}

// RepoList.PropTypes = {
//   repos: PropTypes.array.isRequired,
// };
export default RepoList;
