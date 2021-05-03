import React from "react";
import { Link } from "react-router-dom";

function SocialNetworks() {
  return (
    <div className="social-networks">
      <a href={`${window.location.origin}/api/auth/signin/google`}>
        <i className="fab fa-google fa-3x social-network" />
      </a>
      <a href={`${window.location.origin}/api/auth/signin/facebook`}>
        <i className="fab fa-facebook-f fa-3x social-network" />
      </a>
      <a href={`${window.location.origin}/api/auth/signin/vk`}>
        <i className="fab fa-vk fa-3x social-network" />
      </a>
    </div>
  );
}

export default SocialNetworks;
