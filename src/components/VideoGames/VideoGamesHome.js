import { Col, Pagination, Row } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { request } from "../../api/axios-util";
import defaultImage from "../../images/defaultImage.jpg";
import Filter from "../Filter";
import Loader from "../Loader";
import SearchBox from "../SearchBox";
import VideoGameCard from "./VideoGameCard";

function VideoGamesHome() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [select, setSelect] = useState("");

  const fetchVideoGamesData = async () => {
    return request({
      method: "GET",
      url: "/games",
      params: { page: pageNumber, search: searchTerm, ordering: select },
    });
  };

  const { data: gameData, isLoading } = useQuery(
    ["games", pageNumber, searchTerm, select],
    fetchVideoGamesData,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data?.results;
      },
    }
  );

  const handleChange = (current) => {
    setPageNumber(current);
  };

  const handleSearch = (value) => {
    setPageNumber(1);
    setSearchTerm(value);
  };

  const handleSelect = (value) => {
    setPageNumber(1);
    setSelect(value);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="home-header">
        <SearchBox handleSearch={handleSearch} />
        <Filter handleSelect={handleSelect} />
      </div>
      <Row
        gutter={[0, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        className="card-container"
      >
        {gameData?.map((game) => (
          <Col xs={24} sm={12} md={8} lg={6} xxl={3} key={game.id}>
            <Link to={`/game/${game.id}`}>
              <VideoGameCard
                name={game.name}
                image={game.background_image || defaultImage}
                tags={game.genres}
                rating={game.rating}
                released={game.released}
              />
            </Link>
          </Col>
        ))}
        <Pagination
          onChange={handleChange}
          defaultCurrent={1}
          total={1000}
          pageSize={20}
          className="paginate"
        />
      </Row>
    </div>
  );
}

export default VideoGamesHome;
