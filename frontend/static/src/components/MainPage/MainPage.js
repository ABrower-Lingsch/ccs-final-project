import Search from "./Search";
import StylistCard from "./StylistCard";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "../Styles/MainPage.css";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { geocodeByLatLng } from "react-google-places-autocomplete";
import Spinner from "react-bootstrap/Spinner";

function MainPage({ userState }) {
  const [stylistProfiles, setStylistProfiles] = useState(null);
  const [filteredProfiles, setFilteredProfiles] = useState(null);
  const [queryPhrase, setQueryPhrase] = useState("");
  const [distance, setDistance] = useState(50);
  const [currentLocation, setCurrentLocation] = useState(
    JSON.parse(localStorage.getItem("currentLocation"))
  );

  const defaultLocationPhrase = "Select location...";
  const noEnteredLocation = [
    defaultLocationPhrase,
    null,
    undefined,
    "",
  ].includes(currentLocation);

  const handleError = (err) => {
    console.warn(err);
  };

  const clearFilters = () => {
    if (window.localStorage.currentLocation) {
      setCurrentLocation(JSON.parse(localStorage.getItem("currentLocation")));
    } else {
      setCurrentLocation(defaultLocationPhrase);
    }
    setDistance(50);
    setQueryPhrase("");
  };

  useEffect(() => {
    console.count("effect");
    const getPosition = async () => {
      window.navigator.geolocation.getCurrentPosition((position) =>
        geocodeByLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }).then((results) => {
          const address = results.find((result) =>
            result.types.includes("postal_code")
          ).formatted_address;
          setCurrentLocation(address);
          window.localStorage.setItem(
            "currentLocation",
            JSON.stringify(address)
          );
        })
      );
      if (!currentLocation) {
        setCurrentLocation(defaultLocationPhrase);
      }
    };
    getPosition();
  }, []);

  useEffect(() => {
    const getStylistProfiles = async () => {
      const response = await fetch(
        `/api/v1/profiles/filter/?origin=${currentLocation}&distance=${distance}`
      ).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      const data = await response.json();
      setStylistProfiles(data);
      setFilteredProfiles(data);
    };

    getStylistProfiles();
  }, [currentLocation, distance, noEnteredLocation]);

  useEffect(() => {
    if (!stylistProfiles) {
      return;
    } else if (queryPhrase.length === 0) {
      setFilteredProfiles(stylistProfiles);
      return;
    }

    const searchAndFilter = () => {
      const options = {
        ignoreLocation: true,
        threshold: 0.3,
        keys: ["first_name", "last_name", "specialties"],
      };
      const fuse = new Fuse(stylistProfiles, options);
      const search = fuse.search(queryPhrase);
      const filteredStylists = search.map((profile) => profile.item);
      return filteredStylists;
    };
    setFilteredProfiles(searchAndFilter());
  }, [queryPhrase, stylistProfiles]);

  return (
    <div className="mainpage-full">
      <h1 className="main-title">HairHunter</h1>
      <section>
        <Search
          distance={distance}
          setDistance={setDistance}
          queryPhrase={queryPhrase}
          setQueryPhrase={setQueryPhrase}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          clearFilters={clearFilters}
        />
      </section>
      <article className="profiles-mainbar">
        {!currentLocation ? (
          <p className="no-data-label">
            HairHunter would like to use your current location!
          </p>
        ) : currentLocation === defaultLocationPhrase ? (
          <p className="no-data-label">
            Enable location services or select a location from the search menu
            to find stylists near you!
          </p>
        ) : filteredProfiles === null ? (
          <Spinner animation="border" variant="warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : filteredProfiles.length === 0 ? (
          <p className="no-data-label">
            No profiles match that search, please try again.
          </p>
        ) : (
          <div className="list profile-card-list">
            {filteredProfiles.map((profile) => (
              <StylistCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </article>
    </div>
  );
}

export default MainPage;
