import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async ({ page, filters, sort, pageSize }, { rejectWithValue }) => {
    try {
      const filterParams = Object.entries(filters)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const firstPageUrl = `https://rickandmortyapi.com/api/character/?${filterParams}`;
      const firstPageResponse = await fetch(firstPageUrl);
      const firstPageData = await firstPageResponse.json();
      const maxPage = firstPageData.info.pages;

      if (page > maxPage) {
        page = maxPage;
      }

      const url = `https://rickandmortyapi.com/api/character/?page=${page}&${filterParams}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      let results = data.results;

      if (sort) {
        const [field, direction] = sort.split("-");
        results = results.sort((a, b) => {
          if (direction === "asc") {
            return a[field].localeCompare(b[field]);
          } else {
            return b[field].localeCompare(a[field]);
          }
        });
      }

      if (pageSize > 20) {
        const additionalPagesNeeded = Math.ceil(pageSize / 20) - 1;
        const additionalRequests = [];

        for (let i = 1; i <= additionalPagesNeeded; i++) {
          const nextPage = page + i;
          if (nextPage <= maxPage) {
            additionalRequests.push(
              fetch(
                `https://rickandmortyapi.com/api/character/?page=${nextPage}&${filterParams}`
              )
                .then((res) => res.json())
                .then((data) => data.results)
            );
          }
        }

        const additionalResults = await Promise.all(additionalRequests);
        results = [...results, ...additionalResults.flat()];
      }

      results = results.slice(0, pageSize);

      return {
        results,
        totalPages: maxPage,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCharacterDetails = createAsyncThunk(
  "characters/fetchCharacterDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch character details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const characterSlice = createSlice({
  name: "characters",
  initialState: {
    data: [],
    selectedCharacter: null,
    loading: false,
    error: null,
    page: 1,
    pageSize: 10,
    filters: {
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
    },
    sort: "",
    totalPages: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSelectedCharacter: (state, action) => {
      state.selectedCharacter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCharacterDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCharacter = action.payload;
      })
      .addCase(fetchCharacterDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setPage,
  setPageSize,
  setFilter,
  setSort,
  setSelectedCharacter,
} = characterSlice.actions;

export default characterSlice.reducer;
