import * as React from "react";
import { Link, useParams } from "react-router-dom";
// import type { Brewery } from '../../types';
import "./detail.css";

export const DETAIL_BASE_URL = " https://api.openbrewerydb.org/breweries";

export default function BreweryDetail() {
  // if typescript
  // const [detailData, setDetailData] = useState<Brewery | null>(null)

  // if were to use RR navigate and add state and pick that state up using useLocation() hook
  // const location = useLocation();
  // const detailData = location?.state?.detail;

  const [detailData, setDetailData] = React.useState(null);
  const { id } = useParams();

  // no need to fetch detail data on mount if useLocation() was used
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await (await fetch(`${DETAIL_BASE_URL}/${id}`)).json();
      document.title = response?.name;
      setDetailData(response);
    };

    void fetchData();
  }, [id]);

  return (
    <main>
      <Link to="/breweries">&lt; Back to Breweries</Link>
      {detailData ? (
        <div className="card">
          {detailData?.name ? <h2>{detailData?.name}</h2> : null}
          {detailData?.city ? <p>City: {detailData?.city}</p> : null}
          {detailData?.state ? <p>State: {detailData?.state}</p> : null}
          {detailData?.country ? <p>Country: {detailData?.country}</p> : null}
          {detailData?.phone ? <p>Phone: {detailData?.phone}</p> : null}
          {detailData?.website_url ? (
            <a href={detailData?.website_url} target="_blank" rel="noreferrer">
              {detailData?.website_url}
            </a>
          ) : null}
        </div>
      ) : (
        <p>No Brewery exists</p>
      )}
    </main>
  );
}
