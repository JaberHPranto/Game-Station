import { CalendarFilled, StarFilled } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
const { Meta } = Card;
function VideoGameCard({ name, image, tags, rating, released }) {
  // max number of tags is 3
  const maxLength = Math.min(tags.length, 3);
  const gameTagArr = [...tags].slice(0, maxLength);
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={name} src={image} />}
      className="game-card"
    >
      <Meta title={name} />
      <div className="game-tags">
        {gameTagArr.map((tag, i) => {
          return (
            <div className={`game-tag ${tag.name}`} key={i}>
              {tag.name}
            </div>
          );
        })}
      </div>
      <div className="card-footer">
        <div className="card-rating-div">
          <div className="star_icon">
            <StarFilled />
          </div>
          <div className="card-rating">{rating}</div>
        </div>
        <div className="card-released-div">
          <div className="cal_icon">
            <CalendarFilled />
          </div>
          <div className="card-released">{released}</div>
        </div>
      </div>
    </Card>
  );
}

export default VideoGameCard;
