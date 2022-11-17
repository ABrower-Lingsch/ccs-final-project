import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function StylistCard({ profile }) {
  const navigate = useNavigate();

  return (
    <li>
      <Card
        className="profile-card"
        onClick={() => navigate(`/stylist/${profile.id}`)}
      >
        <div>
          <Card.Img src={profile.avatar} />
        </div>
        <Card.Body>
          <Card.Title>
            {profile.first_name} {profile.last_name}
          </Card.Title>
          <Card.Text>{profile.business}</Card.Text>
          <Card.Text>{profile.location}</Card.Text>
          <Card.Text>{profile.specialties}</Card.Text>
        </Card.Body>
      </Card>
    </li>
  );
}

export default StylistCard;
