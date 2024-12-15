import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchCharacters,
  fetchCharacterDetails,
  setPage,
  setFilter,
  setSort,
  setPageSize,
} from "../Redux/slices/characterSlice";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import CharacterDetail from "./CharacterDetail";

const CharacterTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data,
    loading,
    page,
    filters,
    error,
    sort,
    totalPages,
    pageSize,
    selectedCharacter,
  } = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(fetchCharacters({ page, filters, sort, pageSize }));
  }, [page, filters, sort, pageSize, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacterDetails(id));
    }
  }, [id, dispatch]);

  const handlePageChange = (event, newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  const handlePageSizeChange = (e) => {
    const newPageSize = Number(e.target.value);
    dispatch(setPageSize(newPageSize));
    dispatch(setPage(1));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ [name]: value }));
  };

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  const handleRowClick = (id) => {
    navigate(`/character/${id}`);
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6">
      <div className="max-w-7xl mx-auto">
        <Backdrop
          sx={{ color: "#39ff14", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {error && <div className="text-red-500 text-lg mb-4">{error}</div>}

        <div className="space-y-4 md:space-y-0 md:space-x-4 mb-6 flex flex-col md:flex-row">
          <input
            type="text"
            name="name"
            placeholder="Filter by name"
            value={filters.name}
            onChange={handleFilterChange}
            className="p-2 border border-[#39ff14] rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#39ff14] focus:border-transparent"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border border-[#39ff14] rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#39ff14] focus:border-transparent"
          >
            <option value="">Select Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
            name="species"
            value={filters.species}
            onChange={handleFilterChange}
            className="p-2 border border-[#39ff14] rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#39ff14] focus:border-transparent"
          >
            <option value="">Select Species</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            <option value="Humanoid">Humanoid</option>
            <option value="Robot">Robot</option>
          </select>
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="p-2 border border-[#39ff14] rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#39ff14] focus:border-transparent"
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
            name="sort"
            value={sort}
            onChange={handleSortChange}
            className="p-2 border border-[#39ff14] rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#39ff14] focus:border-transparent"
          >
            <option value="">Sort by</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="status-asc">Status (A-Z)</option>
            <option value="status-desc">Status (Z-A)</option>
            <option value="species-asc">Species (A-Z)</option>
            <option value="species-desc">Species (Z-A)</option>
            <option value="gender-asc">Gender (A-Z)</option>
            <option value="gender-desc">Gender (Z-A)</option>
          </select>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="p-2 border border-[#39ff14] rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#39ff14] focus:border-transparent"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#39ff14] shadow-lg shadow-[#39ff14]/20">
          <table className="min-w-full table-auto border-collapse bg-black">
            <thead className="bg-[#1a1a1a]">
              <tr>
                <th className="px-4 py-3 text-left text-[#39ff14] font-bold border-b border-[#39ff14]">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-[#39ff14] font-bold border-b border-[#39ff14]">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[#39ff14] font-bold border-b border-[#39ff14]">
                  Species
                </th>
                <th className="px-4 py-3 text-left text-[#39ff14] font-bold border-b border-[#39ff14]">
                  Gender
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#39ff14]/30">
              {data.length > 0 ? (
                data.map((character) => (
                  <tr
                    key={character.id}
                    className="hover:bg-[#39ff14]/10 cursor-pointer transition-colors duration-150"
                    onClick={() => handleRowClick(character.id)}
                  >
                    <td className="px-4 py-3 text-white">{character.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          character.status === "Alive"
                            ? "bg-green-500/20 text-green-400"
                            : character.status === "Dead"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {character.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white">
                      {character.species}
                    </td>
                    <td className="px-4 py-3 text-white">{character.gender}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center text-white">
                    No characters found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#39ff14",
                borderColor: "#39ff14",
                "&:hover": {
                  backgroundColor: "#39ff14/10",
                },
                "&.Mui-selected": {
                  backgroundColor: "#39ff14",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#39ff14/90",
                  },
                },
              },
            }}
          />
        </div>

        {selectedCharacter && <CharacterDetail character={selectedCharacter} />}
      </div>
    </div>
  );
};

export default CharacterTable;
