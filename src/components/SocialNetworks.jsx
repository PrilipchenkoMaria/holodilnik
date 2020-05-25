import React from "react";
import { Link } from "react-router-dom";

function SocialNetworks() {
  return (
    <div className="SocialNetworks">
      <Link to="/"><i className="fab fa-google fa-3x SocialNetwork" /></Link>
      <a href={`${window.location.origin}/api/auth/signin/facebook`}>
        <i className="fab fa-facebook-f fa-3x SocialNetwork" />
      </a>
      <Link to="/"><i className="fab fa-twitter fa-3x SocialNetwork" /></Link>
      <Link to="/"><i className="fab fa-telegram-plane fa-3x SocialNetwork" /></Link>
      <Link to="/"><i className="fab fa-vk fa-3x SocialNetwork" /></Link>
      <Link to="/"><i className="fab fa-odnoklassniki fa-3x SocialNetwork" /></Link>
    </div>
  );
}

export default SocialNetworks;
