import { useState, useEffect } from "react";
import StylistEdit from "./StylistEdit";

function StylistProfilePage({ userState, setUserState }) {
  const [profilePage, setProfilePage] = useState();

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    const getProfilePage = async (id) => {
      const response = await fetch(`/api_v1/profiles/stylists/${id}`).catch(
        handleError
      );
      if (!response.ok) {
        throw new Error("Network response was not OK!");
      }
      const data = await response.json();
      setProfilePage(data);
    };
    // console.log(userState);
    console.log("here", userState.stylist_profile);
    getProfilePage(userState.stylist_profile);
  }, [userState, profilePage]);

  return (
    <>
      {profilePage && (
        <StylistEdit
          userState={userState}
          setUserState={setUserState}
          profilePage={profilePage}
          setProfilePage={setProfilePage}
        />
      )}
    </>
  );
}

export default StylistProfilePage;
