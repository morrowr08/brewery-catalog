import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DETAIL_BASE_URL } from "./Detail";
import "./list.css";
// if typescript
// import type { Brewery } from '../../types';

const BASE_URL = "https://api.openbrewerydb.org/breweries";
const PER_PAGE = 10;
const DEFAULT_PAGE = 1;

export default function BreweryList() {
  // if typescript
  // const [breweries, setBreweries] = React.useState<Brewery[]>([]);
  const [breweries, setBreweries] = React.useState([]);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [sortBy, setSortBy] = React.useState(null);
  const [display, setDisplay] = React.useState("list");
  // const navigate = useNavigate();

  const fetchBreweries = React.useCallback(async () => {
    const response = await (
      await fetch(
        `${BASE_URL}?per_page=${PER_PAGE}&page=${page}${
          sortBy ? `&sort=name:${sortBy}` : ""
        }`
      )
    ).json();

    setBreweries(response);
  }, [page, sortBy]);

  React.useEffect(() => {
    void fetchBreweries();
  }, [fetchBreweries, page, sortBy]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const searchValue = formData?.get("search");
    const response = await (
      await fetch(
        `${BASE_URL}/search?query=${searchValue}&per_page=${PER_PAGE}&page=1${
          sortBy ? `&sort=name:${sortBy}` : ""
        }`
      )
    ).json();
    setPage(1);
    setBreweries(response);
  };

  // const prefetch = (id: string) => {
  const prefetch = async (id) => {
    return await (await fetch(`${DETAIL_BASE_URL}/${id}`)).json();
  };

  // use navigate from useNavigate() and add detail to state, then use the state from useLocation()
  // instead of fetching detail data on detail component
  // const handleNavigate = (id: string) => {
  // const handleNavigate = async (id) => {
  //   navigate(`/breweries/${id}`, {
  //     state: {
  //       detail: await prefetch(id),
  //     },
  //   });
  // };

  const back = () => setPage((prevPage) => prevPage - 1);

  const next = () => setPage((prevPage) => prevPage + 1);

  const handleSorting = (event) => {
    setPage(1);
    setSortBy(event.target.value);
  };
  return (
    <main>
      <h1>Brewery Catalog</h1>
      <div className="filter-sort-displau-container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="search" placeholder="Find a brewery" />
          <button type="submit">Search</button>
          <button type="reset">Reset</button>
        </form>
        <select onChange={handleSorting} value={sortBy || "NoValue"}>
          <option value="NoValue" disabled hidden>
            Sort By
          </option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <div className="view-button-container">
          <button
            className="view-button list-view"
            onClick={() => setDisplay("list")}
          />
          <button
            className="view-button grid-view"
            onClick={() => setDisplay("grid")}
          />
        </div>
      </div>
      {breweries?.length > 0 ? (
        <div className={`list-container ${display}`}>
          {breweries.map((brewery) => {
            return (
              // <div key={brewery?.id} onClick={() => handleNavigate(brewery?.id)}>
              <Link
                key={brewery?.id}
                to={`/breweries/${brewery?.id}`}
                // I noticed the API returns a cache-control max-age=86400 on detail brewery
                // so I figured on hover we could pre-emptively fetch the data since there may be a few
                // milliseconds between time person hovers to when they click
                // then by time they click and are routed to the details page, the browser cache is served up
                // faster than the API call and wasn't a need for a "Loading" indicator. In the event an API
                // call is slower than this brewery one and didn't use this pre-fetching, I'd fall back to
                // some sort of loading indicator for user to know the page is working and they're not
                // just stuck in a limbo state.
                onMouseOver={() => prefetch(brewery?.id)}
                className="list-container__item"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2014/04/03/10/40/beer-311090_1280.png"
                  alt="Cartoon glass of beer"
                  className="list-conatiner__item-img"
                  loading="lazy"
                />
                <p className="list-conatiner__item-name">{brewery?.name}</p>
              </Link>
            );
          })}
        </div>
      ) : (
        <p>No Breweries found.</p>
      )}
      <div className="pagination">
        {/* when on page one disable to ability to go backwards on pages */}
        <button
          type="button"
          data-testid="back"
          onClick={back}
          disabled={page === 1}
        >
          &lt;
        </button>
        {/*
          I wasn't able to find anything in the API docs that mentioned how to get a count of the amount of pages
          exist. If there were, then I would have added specific pages a user can click on to jump to and when the user reached
          the last page then I would have disabled the next button.
        */}
        <button type="button" data-testid="next" onClick={next}>
          &gt;
        </button>
      </div>
    </main>
  );
}
