import { Col, Pagination, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../../api/axios-util";
import defaultImage from "../../images/defaultImage.jpg";
import Filter from "../Filter";
import Loader from "../Loader";
import SearchBox from "../SearchBox";
import VideoGameCard from "./VideoGameCard";

const { Option } = Select;

function VideoGamesHome() {
  const [gameData, setGameData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [select, setSelect] = useState("");
  const [loading, setLoading] = useState(true);

  const getVideoGamesData = async () => {
    request({
      method: "GET",
      url: "/games",
      params: { page: pageNumber, search: searchTerm, ordering: select },
    })
      .then((res) => {
        setLoading(false);
        setGameData(res?.data?.results);
        console.log(res?.data?.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (current) => {
    setPageNumber(current);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSelect = (value) => {
    setSelect(value);
  };

  useEffect(() => {
    getVideoGamesData();
  }, [pageNumber, searchTerm, select]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="home-header">
            <SearchBox handleSearch={handleSearch} />
            <Filter handleSelect={handleSelect} />
          </div>
          <Row gutter={[0, 32]} className="card-container">
            {gameData?.map((game) => (
              <Col span={6} key={game.id}>
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
        </>
      )}
    </div>
  );
}

export default VideoGamesHome;
