import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../api/axios-util";
import defaultImage from "../../images/defaultImage.jpg";
import Loader from "../Loader";

function VideoGameDetails() {
  const [gameData, setGameData] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    request({
      method: "GET",
      url: `games/${id}`,
    })
      .then((res) => {
        setLoading(false);
        setGameData(res?.data);
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="details-container">
          <div
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${
                gameData?.background_image || defaultImage
              })center `,
              width: "100%",
              height: "100vh",
            }}
          >
            <div className="details-card">
              <div className="details-img">
                <img
                  className="details-img"
                  src={gameData?.background_image || defaultImage}
                  alt="game-img"
                />
              </div>

              <div className="details-content">
                <div className="details-info">
                  <div className="details-title">{gameData?.name}</div>
                  <div className="details-desc">
                    {gameData?.description_raw}
                  </div>
                </div>
                <div className="details-recommendations">
                  {gameData?.ratings?.map((r, i) => (
                    <div key={i} className={`${r.title}`}>
                      {r.title} : {Math.ceil(r.percent)}
                    </div>
                  ))}
                </div>
                <div className="details-stats">
                  <div>
                    <h2>Platforms</h2>
                    <div className="details-platform">
                      {gameData?.platforms?.map((p, i) => (
                        <div key={i}>{p.platform.name}</div>
                      ))}
                    </div>
                  </div>
                  <div className="details-publisher">
                    <h2>Publisher</h2>
                    {gameData?.publishers?.map((p, i) => (
                      <div key={i}>{p.name}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoGameDetails;
